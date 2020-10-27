import { TelegrafContext } from "telegraf/typings/context";
import { Extra, Markup } from "telegraf";
import { Message } from "telegraf/typings/telegram-types";
import { MyButtonBoard } from "./button/my_button_board";
import { MyButton } from "./button/my_button";
export declare enum OtherMarkups {
    REMOVE_KEYBOARD = 0,
    FORCE_REPLY = 1
}
export declare type MyMarkup = MyButtonBoard<MyButton> | OtherMarkups;
export interface MyExtraParams {
    markup?: MyMarkup;
    parseMode?: ParseMode;
    enableWebPreview?: boolean;
    shouldNotify?: boolean;
    oneTimeKeyboard?: boolean;
    resizeKeyboard?: boolean;
    replyTo?: string;
    caption?: string;
}
export declare enum ParseMode {
    NONE = 0,
    HTML = 1,
    MARK_DOWN = 2
}
export default class MyExtra {
    readonly markup?: MyMarkup;
    readonly parseMode: ParseMode;
    readonly enableWebPreview: boolean;
    readonly shouldNotify: boolean;
    readonly oneTimeKeyboard: boolean;
    readonly resizeKeyboard: boolean;
    readonly replyTo?: string;
    readonly caption?: string;
    constructor(markup?: MyMarkup, parseMode?: ParseMode, enableWebPreview?: boolean, shouldNotify?: boolean, oneTimeKeyboard?: boolean, resizeKeyboard?: boolean, replyTo?: string, caption?: string);
    static from(params: MyExtraParams): MyExtra;
    static removeKeyboard(): MyExtra;
    static HTML(): MyExtra;
    static MARK_DOWN(): MyExtra;
    buildMarkup(ctx: TelegrafContext): (m: Markup) => Markup;
    build(ctx: TelegrafContext): Extra;
    edit(ctx: TelegrafContext): Promise<Message | boolean>;
    editIn(ctx: TelegrafContext, messageId: number, chatId: string): Promise<Message | boolean>;
}
export declare function joinMarkups(mm: MyMarkup[]): MyMarkup;
