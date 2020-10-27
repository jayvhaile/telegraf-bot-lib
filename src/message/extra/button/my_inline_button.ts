import {Wrapped} from "../../../types";
import {TelegrafContext} from "telegraf/typings/context";
import {Markup} from "telegraf";
import {CallbackButton, UrlButton} from "telegraf/typings/markup";
import {unwrap} from "../../../utils";
import {DATA_SEPARATOR} from "../../../consts";
import {MyButton} from "./my_button";

export abstract class MyInlineButton implements MyButton{
    abstract get id(): string;

    abstract get label(): Wrapped<string>;

    abstract get hide(): Wrapped<boolean>;

    abstract build(ctx: TelegrafContext, m: Markup): CallbackButton | UrlButton;

    static callback(param: { id: string, label: Wrapped<string>, data: Wrapped<string>, hide?: Wrapped<boolean> }) {
        return new InlineCallbackButton(param.id, param.label, param.data, param.hide || false);
    }

    static url(param: { id?: string, label: Wrapped<string>, url: Wrapped<string>, hide?: Wrapped<boolean> }) {
        return new InlineURLButton(param.id, param.label, param.url, param.hide || false);
    }
}

export class InlineCallbackButton extends MyInlineButton {
    constructor(
        readonly id: string,
        readonly label: Wrapped<string>,
        readonly data: Wrapped<string>,
        readonly hide: Wrapped<boolean>,
    ) {
        super();
    }

    build(ctx: TelegrafContext, m: Markup): CallbackButton {
        const text = unwrap(this.label, ctx);
        const data = unwrap(this.data, ctx);
        const hide = unwrap(this.hide, ctx);
        return m.callbackButton(text, `${this.id}${DATA_SEPARATOR}${data}`, hide);
    }
}

export class InlineURLButton extends MyInlineButton {
    constructor(
        readonly id: string,
        readonly label: Wrapped<string>,
        readonly url: Wrapped<string>,
        readonly hide: Wrapped<boolean>,
    ) {
        super();
    }

    build(ctx: TelegrafContext, m: Markup): UrlButton {
        const text = unwrap(this.label, ctx);
        const url = unwrap(this.url, ctx);
        const hide = unwrap(this.hide, ctx);
        return m.urlButton(text, `${this.id || ''}${this.id ? DATA_SEPARATOR : ''}${url}`, hide);
    }
}
