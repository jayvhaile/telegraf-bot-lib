import {TelegrafContext} from "telegraf/typings/context";
import Router, {Route} from "./router";

export const SESSION_KEY = 'step_scene_session';

export class MyStage {
    static _instance: MyStage;

    static get instance() {
        if (!this._instance) throw "Scene Manager not initialized"
        return this._instance;
    }

    static get router() {
        return this.instance.router;
    }

    constructor(
        readonly router: Router,
    ) {
    }


    static middleware(router: Router) {
        this._instance = new MyStage(router);
        return async (ctx: TelegrafContext, next) => {
            const route = this.router.head(ctx) || this.router.defaultRoute;
            if (route) {
                const scene = route.scene;
                await this.router.enterLocation(ctx, this.router.head(ctx));
                const result = await scene.handle(ctx);
                if (result) return true;
            }
            return next();
        }
    }

}


