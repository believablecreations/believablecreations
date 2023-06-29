import { Injectable } from "@angular/core";
import * as i0 from "@angular/core";
export class OnResizeService {
    constructor(zone) {
        this.zone = zone;
        this.resizeEventName = "resize";
        this.sizeCacheKey = "currentSize";
    }
    onResize(htmlElements) {
        this.elements = htmlElements;
        this.start();
        return this.elements;
    }
    start(skipStop = false) {
        try {
            if (!skipStop) {
                this.stop();
            }
            this.elements
                .filter((element) => this.isElementInViewport(element))
                .forEach((element) => {
                const previousSize = this.getDataFromElement(element, this.sizeCacheKey);
                const currentSize = this.getSizeFromElement(element);
                if (previousSize && this.checkSizeDiff(currentSize, previousSize)) {
                    element.dispatchEvent(new CustomEvent(this.resizeEventName, {
                        detail: currentSize
                    }));
                }
                this.setDataInElement(element, this.sizeCacheKey, currentSize);
            });
            if (this.isWindowAvailable()) {
                this.zone.runOutsideAngular(() => this.animationFrameHandle = requestAnimationFrame(() => this.start(true)));
            }
            else {
                this.zone.runOutsideAngular(() => this.animationFrameHandle = setTimeout(() => this.start(true), 1000 / 60));
            }
        }
        catch (e) {
        }
    }
    isWindowAvailable() {
        try {
            if (window === undefined) {
                return false;
            }
            else {
                return true;
            }
        }
        catch (error) {
            return false;
        }
    }
    stop() {
        try {
            window.cancelAnimationFrame(this.animationFrameHandle);
        }
        catch (e) {
            clearInterval(this.animationFrameHandle);
        }
    }
    isElementInViewport(element) {
        try {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const windowWidth = window.innerWidth || document.documentElement.clientWidth;
            // http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
            const vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
            const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;
            return vertInView && horInView;
        }
        catch (e) {
            return true;
        }
    }
    setDataInElement(element, key, value) {
        element.dataset[key] = JSON.stringify(value);
    }
    getDataFromElement(element, key) {
        return element.dataset[key] ? JSON.parse(element.dataset[key]) : undefined;
    }
    checkSizeDiff(size1, size2) {
        return size1?.width !== size2?.width || size1?.height !== size2?.height;
    }
    getSizeFromElement(element) {
        try {
            const computedStyles = window.getComputedStyle(element);
            return {
                width: parseInt(computedStyles.width, 10),
                height: parseInt(computedStyles.height, 10)
            };
        }
        catch (e) {
            return {
                width: 0,
                height: 0
            };
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.3", ngImport: i0, type: OnResizeService, deps: [{ token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.1.3", ngImport: i0, type: OnResizeService, providedIn: "root" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.3", ngImport: i0, type: OnResizeService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: "root"
                }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib24tcmVzaXplLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvbi1yZXNpemUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFTLE1BQU0sZUFBZSxDQUFDOztBQVVqRCxNQUFNLE9BQU8sZUFBZTtJQU0xQixZQUFvQixJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtRQUx2QixvQkFBZSxHQUFHLFFBQVEsQ0FBQztRQUMzQixpQkFBWSxHQUFHLGFBQWEsQ0FBQztJQUt0QyxDQUFDO0lBRU0sUUFBUSxDQUFDLFlBQWdDO1FBQzlDLElBQUksQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDO1FBQzdCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRU0sS0FBSyxDQUFDLFFBQVEsR0FBRyxLQUFLO1FBQzNCLElBQUk7WUFDRixJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNiLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNiO1lBQ0EsSUFBSSxDQUFDLFFBQStCO2lCQUNsQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDdEQsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ25CLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUN6RSxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3JELElBQUksWUFBWSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxFQUFFO29CQUNqRSxPQUFPLENBQUMsYUFBYSxDQUNuQixJQUFJLFdBQVcsQ0FB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S0FBSyxLQUFLLEVBQUUsS0FBSyxJQUFJLEtBQUssRUFBRSxNQUFNLEtBQUssS0FBSyxFQUFFLE1BQU0sQ0FBQztJQUMxRSxDQUFDO0lBRU0sa0JBQWtCLENBQUMsT0FBb0I7UUFDNUMsSUFBSTtZQUNGLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN4RCxPQUFPO2dCQUNMLEtBQUssRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7Z0JBQ3pDLE1BQU0sRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7YUFDNUMsQ0FBQztTQUNIO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixPQUFPO2dCQUNMLEtBQUssRUFBRSxDQUFDO2dCQUNSLE1BQU0sRUFBRSxDQUFDO2FBQ1YsQ0FBQztTQUNIO0lBQ0gsQ0FBQzs4R0ExR1UsZUFBZTtrSEFBZixlQUFlLGNBRmQsTUFBTTs7MkZBRVAsZUFBZTtrQkFIM0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGUsIE5nWm9uZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbmludGVyZmFjZSBTaXplIHtcclxuICB3aWR0aDogbnVtYmVyO1xyXG4gIGhlaWdodDogbnVtYmVyO1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogXCJyb290XCJcclxufSlcclxuZXhwb3J0IGNsYXNzIE9uUmVzaXplU2VydmljZSB7XHJcbiAgcmVhZG9ubHkgcmVzaXplRXZlbnROYW1lID0gXCJyZXNpemVcIjtcclxuICByZWFkb25seSBzaXplQ2FjaGVLZXkgPSBcImN1cnJlbnRTaXplXCI7XHJcbiAgcHVibGljIGVsZW1lbnRzOiBBcnJheTxIVE1MRWxlbWVudD4gfCB1bmRlZmluZWQ7XHJcbiAgcHJpdmF0ZSBhbmltYXRpb25GcmFtZUhhbmRsZTogdW5kZWZpbmVkIHwgYW55O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHpvbmU6IE5nWm9uZSkge1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uUmVzaXplKGh0bWxFbGVtZW50czogQXJyYXk8SFRNTEVsZW1lbnQ+KTogQXJyYXk8SFRNTEVsZW1lbnQ+IHtcclxuICAgIHRoaXMuZWxlbWVudHMgPSBodG1sRWxlbWVudHM7XHJcbiAgICB0aGlzLnN0YXJ0KCk7XHJcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50cztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGFydChza2lwU3RvcCA9IGZhbHNlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBpZiAoIXNraXBTdG9wKSB7XHJcbiAgICAgICAgdGhpcy5zdG9wKCk7XHJcbiAgICAgIH1cclxuICAgICAgKHRoaXMuZWxlbWVudHMgYXMgQXJyYXk8SFRNTEVsZW1lbnQ+KVxyXG4gICAgICAgIC5maWx0ZXIoKGVsZW1lbnQpID0+IHRoaXMuaXNFbGVtZW50SW5WaWV3cG9ydChlbGVtZW50KSlcclxuICAgICAgICAuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgcHJldmlvdXNTaXplID0gdGhpcy5nZXREYXRhRnJvbUVsZW1lbnQoZWxlbWVudCwgdGhpcy5zaXplQ2FjaGVLZXkpO1xyXG4gICAgICAgICAgY29uc3QgY3VycmVudFNpemUgPSB0aGlzLmdldFNpemVGcm9tRWxlbWVudChlbGVtZW50KTtcclxuICAgICAgICAgIGlmIChwcmV2aW91c1NpemUgJiYgdGhpcy5jaGVja1NpemVEaWZmKGN1cnJlbnRTaXplLCBwcmV2aW91c1NpemUpKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChcclxuICAgICAgICAgICAgICBuZXcgQ3VzdG9tRXZlbnQodGhpcy5yZXNpemVFdmVudE5hbWUsIHtcclxuICAgICAgICAgICAgICAgIGRldGFpbDogY3VycmVudFNpemVcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHRoaXMuc2V0RGF0YUluRWxlbWVudChlbGVtZW50LCB0aGlzLnNpemVDYWNoZUtleSwgY3VycmVudFNpemUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgIGlmICh0aGlzLmlzV2luZG93QXZhaWxhYmxlKCkpIHtcclxuXHJcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHRoaXMuYW5pbWF0aW9uRnJhbWVIYW5kbGUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5zdGFydCh0cnVlKSkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB0aGlzLmFuaW1hdGlvbkZyYW1lSGFuZGxlID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLnN0YXJ0KHRydWUpLCAxMDAwIC8gNjApKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGlzV2luZG93QXZhaWxhYmxlKCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKHdpbmRvdyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RvcCgpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGlvbkZyYW1lSGFuZGxlKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmFuaW1hdGlvbkZyYW1lSGFuZGxlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBpc0VsZW1lbnRJblZpZXdwb3J0KGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcbiAgICAgIGNvbnN0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xyXG4gICAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzMyNTkzMy9kZXRlcm1pbmUtd2hldGhlci10d28tZGF0ZS1yYW5nZXMtb3ZlcmxhcFxyXG4gICAgICBjb25zdCB2ZXJ0SW5WaWV3ID0gcmVjdC50b3AgPD0gd2luZG93SGVpZ2h0ICYmIHJlY3QudG9wICsgcmVjdC5oZWlnaHQgPj0gMDtcclxuICAgICAgY29uc3QgaG9ySW5WaWV3ID0gcmVjdC5sZWZ0IDw9IHdpbmRvd1dpZHRoICYmIHJlY3QubGVmdCArIHJlY3Qud2lkdGggPj0gMDtcclxuICAgICAgcmV0dXJuIHZlcnRJblZpZXcgJiYgaG9ySW5WaWV3O1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXREYXRhSW5FbGVtZW50KGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBrZXk6IHN0cmluZywgdmFsdWU6IGFueSkge1xyXG4gICAgZWxlbWVudC5kYXRhc2V0W2tleV0gPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0RGF0YUZyb21FbGVtZW50KGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBrZXk6IHN0cmluZyk6IGFueSB8IHVuZGVmaW5lZCB7XHJcbiAgICByZXR1cm4gZWxlbWVudC5kYXRhc2V0W2tleV0gPyBKU09OLnBhcnNlKGVsZW1lbnQuZGF0YXNldFtrZXldIGFzIHN0cmluZykgOiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2hlY2tTaXplRGlmZihzaXplMTogU2l6ZSwgc2l6ZTI6IFNpemUpIHtcclxuICAgIHJldHVybiBzaXplMT8ud2lkdGggIT09IHNpemUyPy53aWR0aCB8fCBzaXplMT8uaGVpZ2h0ICE9PSBzaXplMj8uaGVpZ2h0O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFNpemVGcm9tRWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCk6IFNpemUge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgY29tcHV0ZWRTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB3aWR0aDogcGFyc2VJbnQoY29tcHV0ZWRTdHlsZXMud2lkdGgsIDEwKSxcclxuICAgICAgICBoZWlnaHQ6IHBhcnNlSW50KGNvbXB1dGVkU3R5bGVzLmhlaWdodCwgMTApXHJcbiAgICAgIH07XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgd2lkdGg6IDAsXHJcbiAgICAgICAgaGVpZ2h0OiAwXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==