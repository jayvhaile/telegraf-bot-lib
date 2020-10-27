import {Wrapped} from "../../../types";
import {TelegrafContext} from "telegraf/typings/context";
import {Markup} from "telegraf";
import {Button, ContactRequestButton, LocationRequestButton} from "telegraf/typings/markup";
import {flatArray, group, groupWith, unwrap} from "../../../utils";
import {MyButton} from "./my_button";

export abstract class MyKeyboardButton implements MyButton {
    abstract get label(): Wrapped<string>;

    abstract get hide(): Wrapped<boolean>;

    abstract build(ctx: TelegrafContext, m: Markup): Button | ContactRequestButton | LocationRequestButton;

    static text(label: Wrapped<string>, hide:Wrapped<boolean> = false): TextKeyboardButton {
        return new TextKeyboardButton(label, hide);
    }

    static contact(label: Wrapped<string>, hide:Wrapped<boolean> = false): ContactRequestKeyboardButton {
        return new ContactRequestKeyboardButton(label, hide);
    }

    static location(label: Wrapped<string>, hide:Wrapped<boolean> = false): LocationRequestKeyboardButton {
        return new LocationRequestKeyboardButton(label, hide);
    }
}

export class TextKeyboardButton extends MyKeyboardButton {
    constructor(
        readonly label: Wrapped<string>,
        readonly hide: Wrapped<boolean>,
    ) {
        super()
    }

    build(ctx: TelegrafContext, m: Markup): Button {
        return m.button(unwrap(this.label, ctx), unwrap(this.hide, ctx));
    }
}

export class ContactRequestKeyboardButton extends MyKeyboardButton {
    constructor(
        readonly label: Wrapped<string>,
        readonly hide: Wrapped<boolean>,
    ) {
        super()
    }

    build(ctx: TelegrafContext, m: Markup): ContactRequestButton {
        return m.contactRequestButton(unwrap(this.label, ctx), unwrap(this.hide, ctx));
    }
}

export class LocationRequestKeyboardButton extends MyKeyboardButton {
    constructor(
        readonly label: Wrapped<string>,
        readonly hide: Wrapped<boolean>,
    ) {
        super()
    }

    build(ctx: TelegrafContext, m: Markup): LocationRequestButton {
        return m.locationRequestButton(unwrap(this.label, ctx), unwrap(this.hide, ctx));
    }
}


