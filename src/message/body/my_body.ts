import {TelegrafContext} from "telegraf/typings/context";
import {Message} from "telegraf/typings/telegram-types";
import {Extra} from "telegraf";
import {MediaTextBodyParam, Wrapped, WrappedP} from "../../types";
import {MyTextBody} from "./my_text_body";
import {unwrap} from "../../utils";

export default abstract class MyBody {

    abstract send(ctx: TelegrafContext, chatId: string, extra: Extra): Promise<Message>;

    abstract reply(ctx: TelegrafContext, extra: Extra): Promise<Message>;

    abstract edit(ctx: TelegrafContext, messageId: number): Promise<Message | boolean>;

    abstract editIn(ctx: TelegrafContext, messageId: number, chatId: string): Promise<Message | boolean>;


    static from(param: MediaTextBodyParam): MyBody {
        return MyMediaBody.from(param) || MyBody.text(param.text);
    }

    static text(text: Wrapped<string>): MyBody {
        return new MyTextBody(text);
    }

    static photo(file: Wrapped<string>): MyBody {
        return new MyPhotoBody(file);
    }

    static video(file: Wrapped<string>): MyBody {
        return new MyVideoBody(file);
    }

    static audio(file: Wrapped<string>): MyBody {
        return new MyAudioBody(file);
    }

    static voice(file: Wrapped<string>): MyBody {
        return new MyVoiceBody(file);
    }

    static document(file: Wrapped<string>): MyBody {
        return new MyDocumentBody(file);
    }
}


export abstract class MyMediaBody extends MyBody {
    protected constructor() {
        super();
    }

    abstract get file(): WrappedP<string>;

    async edit(ctx: TelegrafContext, messageId: number): Promise<Message | boolean> {
        // @ts-ignore
        return ctx.editMessageMedia(await unwrap(this.file, ctx), extra);
    }

    editIn(ctx: TelegrafContext, messageId: number, chatId: string): Promise<Message | boolean> {
        return null;
    }

    static from(param: MediaTextBodyParam): MyBody {
        if (param.fileId && param.type)
            switch (param.type) {
                case "audio":
                    return MyBody.audio(param.fileId);
                case "document":
                    return MyBody.document(param.fileId);
                case "photo":
                    return MyBody.photo(param.fileId);
                case "video":
                    return MyBody.video(param.fileId);
                case "voice":
                    return MyBody.voice(param.fileId);
            }
        return null;
    }

}

export class MyPhotoBody extends MyMediaBody {
    constructor(
        readonly file: WrappedP<string>,
    ) {
        super();
    }

    async reply(ctx: TelegrafContext, extra): Promise<Message> {
        // @ts-ignore
        return ctx.replyWithPhoto(await unwrap(this.file, ctx), extra);
    }

    async send(ctx: TelegrafContext, chatId: string, extra): Promise<Message> {
        // @ts-ignore
        return ctx.telegram.sendPhoto(chatId, await unwrap(this.file, ctx), extra);
    }
}

export class MyVideoBody extends MyMediaBody {
    constructor(
        readonly file: WrappedP<string>
    ) {
        super();
    }

    async reply(ctx: TelegrafContext, extra): Promise<Message> {
        // @ts-ignore
        return ctx.replyWithVideo(await unwrap(this.file, ctx), extra);
    }

    async send(ctx: TelegrafContext, chatId: string, extra): Promise<Message> {
        // @ts-ignore
        return ctx.telegram.sendVideo(chatId, await unwrap(this.file, ctx), extra);
    }
}

export class MyVoiceBody extends MyMediaBody {
    constructor(
        readonly file: WrappedP<string>,
    ) {
        super();
    }

    async reply(ctx: TelegrafContext, extra): Promise<Message> {
        // @ts-ignore
        return ctx.replyWithVoice(await unwrap(this.file, ctx), extra);
    }

    async send(ctx: TelegrafContext, chatId: string, extra): Promise<Message> {
        // @ts-ignore
        return ctx.telegram.sendVoice(chatId, await unwrap(this.file, ctx), extra);
    }
}

export class MyAudioBody extends MyMediaBody {
    constructor(
        readonly file: WrappedP<string>
    ) {
        super();
    }

    reply(ctx: TelegrafContext, extra): Promise<Message> {
        // @ts-ignore
        return ctx.replyWithAudio(unwrap(this.file, ctx), extra);
    }

    send(ctx: TelegrafContext, chatId: string, extra): Promise<Message> {
        // @ts-ignore
        return ctx.telegram.sendAudio(chatId, unwrap(this.file, ctx), extra);
    }
}

export class MyDocumentBody extends MyMediaBody {
    constructor(
        readonly file: WrappedP<string>
    ) {
        super();
    }

    async reply(ctx: TelegrafContext, extra): Promise<Message> {
        // @ts-ignore
        return ctx.replyWithDocument(await unwrap(this.file, ctx), extra);
    }

    async send(ctx: TelegrafContext, chatId: string, extra): Promise<Message> {
        // @ts-ignore
        return ctx.telegram.sendDocument(chatId, await unwrap(this.file, ctx), extra);
    }
}
