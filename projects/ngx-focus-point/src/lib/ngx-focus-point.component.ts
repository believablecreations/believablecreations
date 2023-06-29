import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  PLATFORM_ID,
  SimpleChanges,
} from '@angular/core';
import {
  combineLatest,
  debounceTime,
  fromEvent,
  map,
  merge,
  Observable,
  startWith,
  tap,
} from 'rxjs';


import { isPlatformBrowser } from '@angular/common';
import {OnResizeService} from "./on-resize.service";

@Component({
  selector: 'ngx-focus-point',
  templateUrl: './ngx-focus-point.component.html',
  styleUrls: ['./ngx-focus-point.component.scss'],
  providers: [OnResizeService],
})
export class NgxFocusPointComponent implements OnInit, OnChanges {
  @Input() width?: string;
  @Input() height?: string;
  @Input() focusX: number | undefined = 0.0;
  @Input() focusY: number | undefined = 0.0;
  @Input() animation: string | undefined;
  @Input() scale = 1;
  @Output() error = new EventEmitter<Event>();
  public onParentResize$: Observable<any> | undefined;
  public OnMediaLoad$: Observable<any> | undefined;
  public OnErrors$: Observable<any> | undefined;
  private ComponentElement: HTMLElement | undefined;
  private MediaElements:
    | Array<HTMLImageElement | HTMLVideoElement | HTMLElement>
    | undefined;
  private css = `
        width: auto !important;
        height: auto !important;
        z-index: inherit !important;
        position: absolute;
        left: 0 !important;
        top: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        display: block !important;
        min-width: 100% !important;
        min-height: 100% !important;
        max-height: none !important;
        max-width: none !important;
        backface-visibility: hidden !important;
        transform: translate3d(0%, 0%, 0) !important;
    `;
  private initCss = `transform: none;`;

  constructor(
    private elRef: ElementRef,
    private onResizeSvc: OnResizeService,
    @Inject(PLATFORM_ID) private platformID: object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformID)) {
      this.css = this.animation
        ? this.css +
        `transition: left ${this.animation}, top ${this.animation} ease-in-out;`
        : this.css;

      this.ComponentElement = this.elRef.nativeElement;

      this.MediaElements = [
        ...(this.ComponentElement?.querySelectorAll('img, video') as any),
      ];

      this.MediaElements.forEach((element) => {
        element.style.cssText = this.initCss;
        element.style.cssText = this.css;
        element.classList?.add('focus-point');
        const parentElement = element.parentElement as HTMLElement;
        if (
          element.tagName === 'IMG' &&
          parentElement.tagName !== this.ComponentElement?.tagName
        ) {
          parentElement.style.cssText = `display: contents;`;
        }
        this.AdjustFocusOnElement(
          this.ComponentElement as HTMLElement,
          element as HTMLElement
        );
      });

      const errors: Array<Observable<Event>> = this.MediaElements.map(
        (element) => fromEvent(element, 'error')
      );

      this.OnErrors$ = merge(...errors).pipe(
        tap((event) => console.warn(event)),
        tap((event) => this.error.emit(event))
      );

      // Get all media elements.
      const observables: Array<Observable<HTMLElement>> =
        this.MediaElements.map((element) => {
          if (element.tagName === 'IMG') {
            const ImageElement = element as HTMLVideoElement;
            return fromEvent(ImageElement, 'load').pipe(
              startWith(null),
              map((event) => element)
            );
          }

          if (element.tagName === 'VIDEO') {
            const VideoElement = element as HTMLVideoElement;
            VideoElement.muted = true;
            return fromEvent(VideoElement, 'loadeddata').pipe(
              startWith(null),
              map((event) => element)
            );
          }
          (element.parentElement as HTMLElement).style.cssText = `
          display: initial;
        `;
          return null;
        }).filter((observable) => !!observable) as Array<
          Observable<HTMLElement>
        >;

      this.OnMediaLoad$ = combineLatest(observables).pipe(
        debounceTime(100),
        tap((elements) => {
          elements.forEach((element) => {
            this.AdjustFocusOnElement(
              this.ComponentElement as HTMLElement,
              element as HTMLElement
            );
          });
        })
      );

      const elements = this.onResizeSvc.onResize([
        this.ComponentElement as HTMLElement,
      ]);

      this.onParentResize$ = fromEvent(elements[0], 'resize')
        .pipe(
          tap((event) => {
            this.AdjustElements(this.MediaElements as Array<HTMLElement>);
          })
        );
    }
  }

  // Calculate the new left/top values of an image
  public calcShift(
    conToImageRatio: number,
    containerSize: number,
    imageSize: number,
    focusSize: number,
    toMinus?: boolean,
    scale = 0
  ): number {
    const containerCenter = Math.floor(containerSize / 2); // Container center in px

    const focusFactor = (focusSize + 1) / 2; // Focus point of resize image in px

    const scaledImage = Math.floor(imageSize / conToImageRatio); // Can't use width() as images may be display:none
    let focus = Math.floor(focusFactor * scaledImage);

    if (toMinus) {
      focus = scaledImage - focus;
    }
    let focusOffset = focus - containerCenter; // Calculate difference between focus point and center
    const remainder = scaledImage - focus; // Reduce offset if necessary so image remains filled
    const containerRemainder = containerSize - containerCenter;
    if (remainder < containerRemainder) {
      focusOffset -= containerRemainder - remainder;
    }

    if (focusOffset < 0) {
      focusOffset = 0;
    }

    return (focusOffset * -100) / containerSize;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((this.MediaElements as Array<HTMLElement>)?.length > 0) {
      this.AdjustElements(this.MediaElements as Array<HTMLElement>);
    }
  }

  private AdjustElements(elements: Array<HTMLElement>) {
    elements.forEach((element) => {
      this.AdjustFocusOnElement(
        this.ComponentElement as HTMLElement,
        element as HTMLElement
      );
    });
  }

  private AdjustFocusOnElement(
    ComponentElement: HTMLElement,
    MediaElement: HTMLElement
  ) {
    if (ComponentElement) {
      MediaElement.style.maxHeight = '';
      MediaElement.style.maxWidth = '';
      let containerWidth = ComponentElement.offsetWidth;
      let containerHeight = ComponentElement.offsetHeight;
      let mediaHeight =
        (MediaElement as any).naturalHeight ||
        (MediaElement as any).offsetHeight;
      let mediaWidth =
        (MediaElement as any).naturalWidth || (MediaElement as any).offsetWidth;
      let hShift: string | number = 0;
      let vShift: string | number = 0;

      const wR = (mediaWidth as number) / containerWidth;
      const hR = (mediaHeight as number) / containerHeight;

      if (
        (mediaWidth as number) > containerWidth &&
        (mediaHeight as number) > containerHeight
      ) {
        if (wR > hR) {
          (MediaElement as HTMLElement).style.maxHeight = '100%';
        } else {
          (MediaElement as HTMLElement).style.maxWidth = '100%';
        }
      }

      if (wR > hR) {
        hShift = this.calcShift(
          hR,
          containerWidth,
          mediaWidth,
          parseFloat(!this.focusX ? '0.0' : this.focusX.toString()),
          false,
          this.scale
        );
      } else if (wR < hR) {
        vShift = this.calcShift(
          wR,
          containerHeight,
          mediaHeight,
          parseFloat(!this.focusY ? '0.0' : this.focusY.toString()),
          true,
          this.scale
        );
      }

      const Y = parseFloat(!this.focusY ? '0.0' : this.focusY.toString());
      const X = parseFloat(!this.focusX ? '0.0' : this.focusX.toString());


      (MediaElement as HTMLElement).style.left = `${hShift}%`;
      (MediaElement as HTMLElement).style.top = `${vShift}%`;
    }
  }
}
