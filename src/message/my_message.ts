import {TelegrafContext} from "telegraf/typings/context";
import {Message} from "telegraf/typings/telegram-types";
import {Wrapped} from "../types";
import MyExtra, {MyExtraParams} from "./extra/my_extra";
import MyBody from "./body/my_body";


export class MyMessage {
    constructor(
        readonly body: MyBody,
        readonly extra: MyExtra,
    ) {
    }

    send(ctx: TelegrafContext, chatId: string): Promise<Message> {
        return this.body.send(ctx, chatId, this.extra.build(ctx));
    };

    reply(ctx: TelegrafContext): Promise<Message> {
        return this.body.reply(ctx, this.extra.build(ctx));
    }

    editBody(ctx: TelegrafContext, messageId: number): Promise<Message | boolean> {
        return this.body.edit(ctx, messageId);
    }

    editBodyIn(ctx: TelegrafContext, messageId: number, chatId: string): Promise<Message | boolean> {
        return this.body.editIn(ctx, messageId, chatId);
    }

    editExtra(ctx: TelegrafContext): Promise<Message | boolean> {
        return this.extra.edit(ctx);
    }

    editExtraIn(ctx: TelegrafContext, messageId: number, chatId: string): Promise<Message | boolean> {
        return this.extra.editIn(ctx, messageId, chatId);
    }

    static text(text: Wrapped<string>, extra?: MyExtra|MyExtraParams): MyMessage {
        return new MyMessage(MyBody.text(text), extra instanceof MyExtra?extra:MyExtra.from(extra));
    }

    static photo(file: Wrapped<string>, extra?: MyExtra|MyExtraParams): MyMessage {
        return new MyMessage(MyBody.photo(file), extra instanceof MyExtra?extra:MyExtra.from(extra));
    }

    static video(file: Wrapped<string>, extra?: MyExtra|MyExtraParams): MyMessage {
        return new MyMessage(MyBody.video(file), extra instanceof MyExtra?extra:MyExtra.from(extra));
    }

    static audio(file: Wrapped<string>,  extra?: MyExtra|MyExtraParams): MyMessage {
        return new MyMessage(MyBody.audio(file), extra instanceof MyExtra?extra:MyExtra.from(extra));
    }

    static voice(file: Wrapped<string>, extra?: MyExtra|MyExtraParams): MyMessage {
        return new MyMessage(MyBody.voice(file), extra instanceof MyExtra?extra:MyExtra.from(extra));
    }

    static document(file: Wrapped<string>,  extra?: MyExtra|MyExtraParams): MyMessage {
        return new MyMessage(MyBody.document(file), extra instanceof MyExtra?extra:MyExtra.from(extra));
    }
}

