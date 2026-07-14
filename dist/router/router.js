export class Router {
    routes;
    constructor() {
        this.routes = {};
        window.addEventListener('popstate', () => {
            this.handleRoute(window.location.pathname);
        });
    }
    addRoute(path, handler) {
        this.routes[path] = handler;
    }
    navigate(path) {
        history.pushState({ path }, '', path);
        this.handleRoute(path);
    }
    handleRoute(path) {
        const handler = this.routes[path];
        if (handler) {
            handler();
        }
        else {
            const notFound = this.routes['/404'];
            if (notFound) {
                notFound();
            }
            else {
                console.warn(`⚠️ Маршрут "${path}" не найден`);
            }
        }
    }
    back() {
        history.back();
    }
    forward() {
        history.forward();
    }
    replace(path) {
        history.replaceState({ path }, '', path);
        this.handleRoute(path);
    }
    start() {
        this.handleRoute(window.location.pathname);
    }
}
//# sourceMappingURL=router.js.map