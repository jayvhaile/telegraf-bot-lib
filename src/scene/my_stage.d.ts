import { TelegrafContext } from "telegraf/typings/context";
import Router from "./router";
export declare const SESSION_KEY = "step_scene_session";
export declare class MyStage {
    readonly router: Router;
    static _instance: MyStage;
    static get instance(): MyStage;
    static get router(): Router;
    constructor(router: Router);
    static middleware(router: Router): (ctx: TelegrafContext, next: any) => Promise<any>;
}
