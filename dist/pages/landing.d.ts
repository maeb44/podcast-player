import type { LandingData } from "../utils/components.js";
export declare class Landing {
    data: LandingData;
    page: number;
    isLoading: boolean;
    private scrollHandler;
    header: any;
    constructor();
    private initScrollListener;
    private handleScroll;
    render(): Promise<void>;
    unmount(): void;
}
//# sourceMappingURL=landing.d.ts.map