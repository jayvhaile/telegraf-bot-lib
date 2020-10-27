import { WrappedP } from "../../types";
import { TelegrafContext } from "telegraf/typings/context";
import { Extra } from "telegraf";
import { Message } from "telegraf/typings/telegram-types";
import MyBody from "./my_body";
export declare class MyTextBody implements MyBody {
    readonly text: WrappedP<string>;
    constructor(text: WrappedP<string>);
    edit(ctx: TelegrafContext): Promise<Message | boolean>;
    editIn(ctx: TelegrafContext, messageId: number, chatId: string): Promise<Message | boolean>;
    reply(ctx: TelegrafContext, extra: Extra): Promise<Message>;
    send(ctx: TelegrafContext, chatId: string, extra: Extra): Promise<Message>;
}
