import { MyBaseScene } from "./my_scene";
import { TelegrafContext } from "telegraf/typings/context";
export interface Location {
    path?: string;
    data?: object;
}
export interface Route {
    path: string;
    name?: string;
    scene: MyBaseScene;
    guard?: Guard;
}
export declare type Guard = (ctx: TelegrafContext, from: Location, to: Location) => Location;
export declare class History {
    constructor();
    stack(ctx: TelegrafContext): Location[];
    push(ctx: TelegrafContext, location: Location, replace?: boolean): void;
    pop(ctx: TelegrafContext): void;
    head(ctx: TelegrafContext): Location;
    popHead(ctx: TelegrafContext): Location;
    updateHeadData(ctx: TelegrafContext, data: object, preserve?: boolean): void;
}
export default class Router {
    readonly routes: Route[];
    history: History;
    constructor(routes: Route[]);
    get defaultRoute(): Route;
    findRoute(ctx: TelegrafContext, path: string): Route;
    head(ctx: TelegrafContext): Route;
    push(ctx: TelegrafContext, to: Location | string, replace?: boolean): Promise<any>;
    pop(ctx: TelegrafContext): Promise<any>;
    enterRoute(ctx: TelegrafContext, fromRoute: Route, toRoute: Route, leave?: boolean): Promise<any>;
    getNext(ctx: TelegrafContext, to: Location): Location;
    enterLocation(ctx: TelegrafContext, t: Location, replace?: boolean, pop?: boolean): Promise<any>;
}
