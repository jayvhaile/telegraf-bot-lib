import {TelegrafContext} from "telegraf/typings/context";

export abstract class MyBaseScene {
    abstract onEnterScene(ctx: TelegrafContext);

    abstract handle(ctx: TelegrafContext): Promise<boolean>;

    abstract onLeaveScene(ctx: TelegrafContext);

}
