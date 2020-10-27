import { Wrapped } from "../../../types";
import { TelegrafContext } from "telegraf/typings/context";
import { Markup } from "telegraf";
import { Button, ContactRequestButton, LocationRequestButton } from "telegraf/typings/markup";
import { MyButton } from "./my_button";
export declare abstract class MyKeyboardButton implements MyButton {
    abstract get label(): Wrapped<string>;
    abstract get hide(): Wrapped<boolean>;
    abstract build(ctx: TelegrafContext, m: Markup): Button | ContactRequestButton | LocationRequestButton;
    static text(label: Wrapped<string>, hide?: Wrapped<boolean>): TextKeyboardButton;
    static contact(label: Wrapped<string>, hide?: Wrapped<boolean>): ContactRequestKeyboardButton;
    static location(label: Wrapped<string>, hide?: Wrapped<boolean>): LocationRequestKeyboardButton;
}
export declare class TextKeyboardButton extends MyKeyboardButton {
    readonly label: Wrapped<string>;
    readonly hide: Wrapped<boolean>;
    constructor(label: Wrapped<string>, hide: Wrapped<boolean>);
    build(ctx: TelegrafContext, m: Markup): Button;
}
export declare class ContactRequestKeyboardButton extends MyKeyboardButton {
    readonly label: Wrapped<string>;
    readonly hide: Wrapped<boolean>;
    constructor(label: Wrapped<string>, hide: Wrapped<boolean>);
    build(ctx: TelegrafContext, m: Markup): ContactRequestButton;
}
export declare class LocationRequestKeyboardButton extends MyKeyboardButton {
    readonly label: Wrapped<string>;
    readonly hide: Wrapped<boolean>;
    constructor(label: Wrapped<string>, hide: Wrapped<boolean>);
    build(ctx: TelegrafContext, m: Markup): LocationRequestButton;
}
