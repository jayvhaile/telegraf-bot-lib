import { Wrapped } from "../../../types";
import { TelegrafContext } from "telegraf/typings/context";
import { Markup } from "telegraf";
import { CallbackButton, UrlButton } from "telegraf/typings/markup";
import { MyButton } from "./my_button";
export declare abstract class MyInlineButton implements MyButton {
    abstract get id(): string;
    abstract get label(): Wrapped<string>;
    abstract get hide(): Wrapped<boolean>;
    abstract build(ctx: TelegrafContext, m: Markup): CallbackButton | UrlButton;
    static callback(param: {
        id: string;
        label: Wrapped<string>;
        data: Wrapped<string>;
        hide?: Wrapped<boolean>;
    }): InlineCallbackButton;
    static url(param: {
        id?: string;
        label: Wrapped<string>;
        url: Wrapped<string>;
        hide?: Wrapped<boolean>;
    }): InlineURLButton;
}
export declare class InlineCallbackButton extends MyInlineButton {
    readonly id: string;
    readonly label: Wrapped<string>;
    readonly data: Wrapped<string>;
    readonly hide: Wrapped<boolean>;
    constructor(id: string, label: Wrapped<string>, data: Wrapped<string>, hide: Wrapped<boolean>);
    build(ctx: TelegrafContext, m: Markup): CallbackButton;
}
export declare class InlineURLButton extends MyInlineButton {
    readonly id: string;
    readonly label: Wrapped<string>;
    readonly url: Wrapped<string>;
    readonly hide: Wrapped<boolean>;
    constructor(id: string, label: Wrapped<string>, url: Wrapped<string>, hide: Wrapped<boolean>);
    build(ctx: TelegrafContext, m: Markup): UrlButton;
}
