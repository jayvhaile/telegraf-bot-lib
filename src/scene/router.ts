import {MyBaseScene} from "./my_scene";
import {TelegrafContext} from "telegraf/typings/context";
import {SessionUtils} from "../utils";
import {SESSION_KEY} from "./my_stage";


export interface Location {
    path?: string
    data?: object
}

export interface Route {
    path: string,
    name?: string,
    scene: MyBaseScene,
    guard?: Guard,
}

export type Guard = (ctx: TelegrafContext, from: Location, to: Location) => Location;

export class History {
    constructor() {
    }

    stack(ctx: TelegrafContext): Location[] {
        return SessionUtils.get(ctx, `${SESSION_KEY}.history`) || [];
    }

    push(ctx: TelegrafContext, location: Location, replace = false) {
        const stack = this.stack(ctx);
        if (replace) stack.pop();
        stack.push(location);
        SessionUtils.set(ctx, `${SESSION_KEY}.history`, stack)
    }

    pop(ctx: TelegrafContext) {
        let stack = this.stack(ctx);
        stack.pop();
        SessionUtils.set(ctx, `${SESSION_KEY}.history`, stack)
    }

    head(ctx: TelegrafContext): Location {
        const stack = this.stack(ctx);
        return stack.length ? stack[stack.length - 1] : null;
    }

    popHead(ctx: TelegrafContext): Location {
        const stack = this.stack(ctx);
        return stack.length > 1 ? stack[stack.length - 2] : null;
    }

    updateHeadData(ctx: TelegrafContext, data: object, preserve = false) {
        const stack = this.stack(ctx);
        if (stack.length) {
            const location = stack.pop();
            stack.push({
                ...location,
                data: {
                    ...(preserve && location.data ? location.data : []),
                    ...data,
                }
            })
            SessionUtils.set(ctx, `${SESSION_KEY}.history`, stack)
        } else
            throw "Empty History";
    }

}

export default class Router {
    history = new History();

    constructor(
        readonly routes: Route[],
    ) {
    }


    get defaultRoute() {
        return this.routes.find(route => route.path == '/');
    }

    findRoute(ctx: TelegrafContext, path: string): Route {
        return this.routes.find(route => route.path == path);
    }

    head(ctx: TelegrafContext): Route {
        const headHistory = this.history.head(ctx);
        return headHistory ? this.findRoute(ctx, headHistory.path) : null;
    }


    push(ctx: TelegrafContext, to: Location | string, replace = false) {
        return this.enterLocation(ctx, typeof to == "string" ? {path: to} : to, replace);
    }

    pop(ctx: TelegrafContext) {
        const to = this.history.popHead(ctx);
        return this.enterLocation(ctx, to, false, true);
    }


    async enterRoute(ctx: TelegrafContext, fromRoute: Route, toRoute: Route, leave = false) {
        const to = toRoute || this.defaultRoute;
        if (fromRoute) {
            if (fromRoute.path == to?.path) {
                return;
            } else {
                if (leave)
                    await fromRoute.scene.onLeaveScene(ctx);
                to?.scene.onEnterScene(ctx);
                return;
            }
        } else {
            return to?.scene.onEnterScene(ctx);
        }
    }


    getNext(ctx: TelegrafContext, to: Location): Location {
        let route = this.findRoute(ctx, to.path) || this.defaultRoute;
        if (!route) return to;
        let next = route.guard?.(ctx, this.history.head(ctx), to) ?? to;
        return to != next ? this.getNext(ctx, next) : next;
    }

    async enterLocation(ctx: TelegrafContext, t: Location, replace = false, pop = false) {
        const head = this.history.head(ctx);
        const headRoute = this.head(ctx);
        const to = t || {path: '/'};
        let next = this.getNext(ctx, to);
        let route = this.findRoute(ctx, next.path);

        // console.log("===============Enter Location===================");
        // console.log(head);
        // console.log(to);
        // console.log(t);
        // console.log("================================================");

        if (head) {
            if (head.path == next.path && route) {
                this.history.updateHeadData(ctx, next.data, !replace)
                return this.enterRoute(ctx, headRoute, route, replace)
            } else {
                if (pop) this.history.pop(ctx);
                else this.history.push(ctx, next, replace);
                return this.enterRoute(ctx, headRoute, route, replace || pop)
            }
        } else {
            this.history.push(ctx, next, replace);
            return this.enterRoute(ctx, null, route, replace)
        }
    }

}


