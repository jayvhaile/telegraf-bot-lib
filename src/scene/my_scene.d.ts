import { TelegrafContext } from "telegraf/typings/context";
export declare abstract class MyBaseScene {
    abstract onEnterScene(ctx: TelegrafContext): any;
    abstract handle(ctx: TelegrafContext): Promise<boolean>;
    abstract onLeaveScene(ctx: TelegrafContext): any;
}
