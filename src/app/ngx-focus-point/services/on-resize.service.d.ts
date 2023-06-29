import { NgZone } from "@angular/core";
import * as i0 from "@angular/core";
interface Size {
    width: number;
    height: number;
}
export declare class OnResizeService {
    private zone;
    readonly resizeEventName = "resize";
    readonly sizeCacheKey = "currentSize";
    elements: Array<HTMLElement> | undefined;
    private animationFrameHandle;
    constructor(zone: NgZone);
    onResize(htmlElements: Array<HTMLElement>): Array<HTMLElement>;
    start(skipStop?: boolean): void;
    isWindowAvailable(): boolean;
    stop(): void;
    isElementInViewport(element: HTMLElement): boolean;
    setDataInElement(element: HTMLElement, key: string, value: any): void;
    getDataFromElement(element: HTMLElement, key: string): any | undefined;
    checkSizeDiff(size1: Size, size2: Size): boolean;
    getSizeFromElement(element: HTMLElement): Size;
    static ɵfac: i0.ɵɵFactoryDeclaration<OnResizeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OnResizeService>;
}
export {};
