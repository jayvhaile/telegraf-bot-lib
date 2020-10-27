import {Wrapped, WrappedP} from "../../types";
import {TelegrafContext} from "telegraf/typings/context";
import {Extra} from "telegraf";
import {Message} from "telegraf/typings/telegram-types";
import {unwrap} from "../../utils";
import MyBody from "./my_body";

export class MyTextBody implements MyBody {
    constructor(
        readonly text: WrappedP<string>,
    ) {
    }

    async edit(ctx: TelegrafContext): Promise<Message | boolean> {
        return ctx.editMessageText(await unwrap(this.text, ctx));
    }

    async editIn(ctx: TelegrafContext, messageId: number, chatId: string): Promise<Message | boolean> {
        return ctx.telegram.editMessageText(
            chatId,
            messageId,
            null,
            await unwrap(this.text, ctx)
        )
    }

    async reply(ctx: TelegrafContext, extra: Extra): Promise<Message> {
        // @ts-ignore
        return ctx.reply(await unwrap(this.text, ctx), extra);
    }

    async send(ctx: TelegrafContext, chatId: string, extra: Extra): Promise<Message> {
        // @ts-ignore
        return ctx.telegram.sendMessage(chatId, await unwrap(this.text, ctx), this.extra?.build(ctx));
    }
}
