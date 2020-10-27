import { TelegrafContext } from "telegraf/typings/context";
import { Message } from "telegraf/typings/telegram-types";
import { Wrapped } from "../types";
import MyExtra, { MyExtraParams } from "./extra/my_extra";
import MyBody from "./body/my_body";
export declare class MyMessage {
    readonly body: MyBody;
    readonly extra: MyExtra;
    constructor(body: MyBody, extra: MyExtra);
    send(ctx: TelegrafContext, chatId: string): Promise<Message>;
    reply(ctx: TelegrafContext): Promise<Message>;
    editBody(ctx: TelegrafContext, messageId: number): Promise<Message | boolean>;
    editBodyIn(ctx: TelegrafContext, messageId: number, chatId: string): Promise<Message | boolean>;
    editExtra(ctx: TelegrafContext): Promise<Message | boolean>;
    editExtraIn(ctx: TelegrafContext, messageId: number, chatId: string): Promise<Message | boolean>;
    static text(text: Wrapped<string>, extra?: MyExtra | MyExtraParams): MyMessage;
    static photo(file: Wrapped<string>, extra?: MyExtra | MyExtraParams): MyMessage;
    static video(file: Wrapped<string>, extra?: MyExtra | MyExtraParams): MyMessage;
    static audio(file: Wrapped<string>, extra?: MyExtra | MyExtraParams): MyMessage;
    static voice(file: Wrapped<string>, extra?: MyExtra | MyExtraParams): MyMessage;
    static document(file: Wrapped<string>, extra?: MyExtra | MyExtraParams): MyMessage;
}
