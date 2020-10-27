import { MyBaseScene } from "./my_scene";
import { TelegrafContext } from "telegraf/typings/context";
import { KeyboardMenuParam, MediaTextBodyParam, MySceneParam } from "../types";
import { MyExtraParams } from "../message/extra/my_extra";
export default class MyScene extends MyBaseScene {
    readonly onEnter: (ctx: TelegrafContext) => any;
    readonly onHandle: (ctx: TelegrafContext) => Promise<boolean>;
    readonly onExit: (ctx: TelegrafContext) => any;
    protected constructor(onEnter: (ctx: TelegrafContext) => any, onHandle: (ctx: TelegrafContext) => Promise<boolean>, onExit: (ctx: TelegrafContext) => any);
    onEnterScene(ctx: TelegrafContext): Promise<any>;
    onLeaveScene(ctx: TelegrafContext): any;
    static simple(param: MySceneParam & MediaTextBodyParam & MyExtraParams): MyScene;
    static keyboardMenu(param: MySceneParam & MediaTextBodyParam & MyExtraParams & KeyboardMenuParam): MyScene;
    handle(ctx: TelegrafContext): Promise<boolean>;
}
