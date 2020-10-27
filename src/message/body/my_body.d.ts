import { TelegrafContext } from "telegraf/typings/context";
import { Message } from "telegraf/typings/telegram-types";
import { Extra } from "telegraf";
import { MediaTextBodyParam, Wrapped, WrappedP } from "../../types";
export default abstract class MyBody {
    abstract send(ctx: TelegrafContext, chatId: string, extra: Extra): Promise<Message>;
    abstract reply(ctx: TelegrafContext, extra: Extra): Promise<Message>;
    abstract edit(ctx: TelegrafContext, messageId: number): Promise<Message | boolean>;
    abstract editIn(ctx: TelegrafContext, messageId: number, chatId: string): Promise<Message | boolean>;
    static from(param: MediaTextBodyParam): MyBody;
    static text(text: Wrapped<string>): MyBody;
    static photo(file: Wrapped<string>): MyBody;
    static video(file: Wrapped<string>): MyBody;
    static audio(file: Wrapped<string>): MyBody;
    static voice(file: Wrapped<string>): MyBody;
    static document(file: Wrapped<string>): MyBody;
}
export declare abstract class MyMediaBody extends MyBody {
    protected constructor();
    abstract get file(): WrappedP<string>;
    edit(ctx: TelegrafContext, messageId: number): Promise<Message | boolean>;
    editIn(ctx: TelegrafContext, messageId: number, chatId: string): Promise<Message | boolean>;
    static from(param: MediaTextBodyParam): MyBody;
}
export declare class MyPhotoBody extends MyMediaBody {
    readonly file: WrappedP<string>;
    constructor(file: WrappedP<string>);
    reply(ctx: TelegrafContext, extra: any): Promise<Message>;
    send(ctx: TelegrafContext, chatId: string, extra: any): Promise<Message>;
}
export declare class MyVideoBody extends MyMediaBody {
    readonly file: WrappedP<string>;
    constructor(file: WrappedP<string>);
    reply(ctx: TelegrafContext, extra: any): Promise<Message>;
    send(ctx: TelegrafContext, chatId: string, extra: any): Promise<Message>;
}
export declare class MyVoiceBody extends MyMediaBody {
    readonly file: WrappedP<string>;
    constructor(file: WrappedP<string>);
    reply(ctx: TelegrafContext, extra: any): Promise<Message>;
    send(ctx: TelegrafContext, chatId: string, extra: any): Promise<Message>;
}
export declare class MyAudioBody extends MyMediaBody {
    readonly file: WrappedP<string>;
    constructor(file: WrappedP<string>);
    reply(ctx: TelegrafContext, extra: any): Promise<Message>;
    send(ctx: TelegrafContext, chatId: string, extra: any): Promise<Message>;
}
export declare class MyDocumentBody extends MyMediaBody {
    readonly file: WrappedP<string>;
    constructor(file: WrappedP<string>);
    reply(ctx: TelegrafContext, extra: any): Promise<Message>;
    send(ctx: TelegrafContext, chatId: string, extra: any): Promise<Message>;
}
