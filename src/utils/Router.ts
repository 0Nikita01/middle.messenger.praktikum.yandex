import { Route } from "./Route";
import { BlockConstructable } from "./Route";

class Router {

    routes: Route[] = [];
    history: any;
    _currentRoute: Route | null = null;
    _rootQuery: string | undefined;
    static __instance: Router;
  
    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.history = window.history;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: BlockConstructable) {
        const route = new Route(pathname, block, this._rootQuery as string);
        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = (event: PopStateEvent) => {
            const target = event.currentTarget as Window;

            this._onRoute(target.location.pathname);
        }

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        //console.log('routes', this.routes);
        const route = this.getRoute(pathname);
        //console.log(route);
        if (!route) {
            return;
        }
        
        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }
        
        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
      this.history.pushState({}, "", pathname);
      this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
      this.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}

export default new Router('#root');
