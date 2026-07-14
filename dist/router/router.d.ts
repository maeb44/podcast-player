export declare class Router {
    routes: {
        [key: string]: Function;
    };
    constructor();
    addRoute(path: string, handler: Function): void;
    navigate(path: string): void;
    handleRoute(path: string): void;
    back(): void;
    forward(): void;
    replace(path: string): void;
    start(): void;
}
//# sourceMappingURL=router.d.ts.map