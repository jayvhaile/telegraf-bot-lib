import {MyBaseScene} from "./my_scene";
import {TelegrafContext} from "telegraf/typings/context";
import {ActionKeyboardButton, KeyboardMenuParam, MediaTextBodyParam, MySceneParam} from "../types";
import {flatArray, unwrap} from "../utils";
import {MyMessage} from "../message/my_message";
import {MyButtonBoard} from "../message/extra/button/my_button_board";
import MyExtra, {joinMarkups, MyExtraParams} from "../message/extra/my_extra";
import MyBody from "../message/body/my_body";

export default class MyScene extends MyBaseScene {
    protected constructor(
        readonly onEnter: (ctx: TelegrafContext) => any,
        readonly onHandle: (ctx: TelegrafContext) => Promise<boolean>,
        readonly onExit: (ctx: TelegrafContext) => any,
    ) {
        super();
    }

    async onEnterScene(ctx: TelegrafContext) {
        return this.onEnter?.(ctx);
    }


    onLeaveScene(ctx: TelegrafContext) {
        return this.onExit(ctx);
    }

    static simple(
        param: MySceneParam & MediaTextBodyParam & MyExtraParams,
    ): MyScene {
        return new MyScene(
            async ctx => {
                await param.onEnter?.(ctx);
                return new MyMessage(
                    MyBody.from(param),
                    MyExtra.from(param)
                ).reply(ctx);
            },
            async (ctx: TelegrafContext) => await param.onHandle?.(ctx) ?? false,
            ctx => param?.onExit?.(ctx),
        );
    }

    static keyboardMenu(
        param: MySceneParam & MediaTextBodyParam & MyExtraParams & KeyboardMenuParam,
    ): MyScene {
        return MyScene.simple({
            ...param,
            markup: joinMarkups([
                param.markup,
                MyButtonBoard.layout(param.actionButtons.map(k => k.button), param.layout)
            ]),
            onHandle: async (ctx: TelegrafContext) => {
                const text = ctx.message.text;
                if (text) {
                    const action = param.actionButtons.filter(k => !unwrap(k.button.hide, ctx))
                        .find(k => unwrap(k.button.label, ctx) == text);
                    if (action) {
                        await action.action(ctx);
                        return await param.onHandle?.(ctx) ?? true;
                    }
                }
                return await param.onHandle?.(ctx) ?? false;
            }
        })
    }

    handle(ctx: TelegrafContext): Promise<boolean> {
        return this.onHandle(ctx);
    }
}



