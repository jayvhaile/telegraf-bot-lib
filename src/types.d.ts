import { MyBaseScene } from "./scene/my_scene";
import { TelegrafContext } from "telegraf/typings/context";
import { MyExtraParams } from "./message/extra/my_extra";
import MyBody from "./message/body/my_body";
import { StepResult } from "./scene/my_step";
import { MyKeyboardButton } from "./message/extra/button/my_keyboard_button";
export declare type PromiseOr<T> = T | Promise<T>;
export declare type SceneMap = Record<string, MyBaseScene>;
export declare type Wrapped<T> = T | ((ctx: TelegrafContext) => T);
export declare type WrappedP<T> = T | Promise<T> | ((ctx: TelegrafContext) => T) | ((ctx: TelegrafContext) => Promise<T>);
export declare type MediaType = {
    fileId: string;
    type: string;
    caption: string;
};
export declare type SimpleStepParam<T> = MyStepParam<T> & MediaTextBodyParam & StepNavigationParams & MyExtraParams;
export declare type ErrorMessageParam = {
    errorMessage?: Wrapped<string>;
};
export interface MySceneParam {
    onEnter?: (ctx: TelegrafContext) => any;
    onHandle?: (ctx: TelegrafContext) => Promise<boolean>;
    onExit?: (ctx: TelegrafContext) => any;
}
export interface MyStepParam<T> {
    name: string;
    validators?: Array<(ctx: TelegrafContext) => PromiseOr<string>>;
    valueTransformer?: (ctx: TelegrafContext) => PromiseOr<T>;
    onMessage?: (ctx: TelegrafContext) => PromiseOr<StepResult>;
    onEnter?: (ctx: TelegrafContext) => PromiseOr<StepResult>;
    onDone?: (ctx: TelegrafContext, t: T) => PromiseOr<StepResult>;
}
export interface StepNavigationParams {
    back?: Wrapped<string>;
    skip?: Wrapped<string>;
    exit?: Wrapped<string>;
    includeBack?: Wrapped<boolean>;
    includeSkip?: Wrapped<boolean>;
    includeExit?: Wrapped<boolean>;
}
export interface BodyParam {
    messageBody: MyBody;
}
export interface MediaTextBodyParam {
    fileId?: Wrapped<string>;
    text?: Wrapped<string>;
    type?: "photo" | "video" | "audio" | "voice" | "document";
}
export interface ChoiceStepParam {
    choices: Wrapped<string>[];
    columnCount?: number;
}
export interface KeyboardMenuParam {
    actionButtons: ActionKeyboardButton[];
    layout: number[];
}
export interface ActionKeyboardButton {
    button: MyKeyboardButton;
    action: (ctx: TelegrafContext) => any;
}
export declare type CallbackResponse = {
    text: Wrapped<string>;
    showAlert: Wrapped<boolean>;
};
