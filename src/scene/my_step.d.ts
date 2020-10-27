import { TelegrafContext } from "telegraf/typings/context";
import { ChoiceStepParam, ErrorMessageParam, MediaTextBodyParam, MediaType, MyStepParam, PromiseOr, SimpleStepParam, StepNavigationParams } from "../types";
import { MyExtraParams } from "../message/extra/my_extra";
import { Contact } from "telegram-typings";
export declare enum StepResult {
    NEXT = 0,
    BACK = 1,
    LEAVE = 2,
    STAY = 3,
    FREEZE = 4
}
export default class MyStep<T> {
    readonly name: string;
    readonly validators: Array<(ctx: TelegrafContext) => PromiseOr<string>>;
    readonly valueTransformer: (ctx: TelegrafContext) => PromiseOr<T>;
    readonly onEnter: (ctx: TelegrafContext) => PromiseOr<StepResult>;
    readonly onMessage: (ctx: TelegrafContext) => PromiseOr<StepResult>;
    readonly onDone: (ctx: TelegrafContext, t: T) => PromiseOr<StepResult>;
    constructor(name: string, validators: Array<(ctx: TelegrafContext) => PromiseOr<string>>, valueTransformer: (ctx: TelegrafContext) => PromiseOr<T>, onEnter: (ctx: TelegrafContext) => PromiseOr<StepResult>, onMessage: (ctx: TelegrafContext) => PromiseOr<StepResult>, onDone: (ctx: TelegrafContext, t: T) => PromiseOr<StepResult>);
    static from<T>(param: MyStepParam<T>): MyStep<T>;
    static keyboardChoice<T>(param: MyStepParam<T> & ChoiceStepParam & MediaTextBodyParam & StepNavigationParams & MyExtraParams): MyStep<T | string>;
    static simple<T>(param: SimpleStepParam<T>): MyStep<T>;
    static text(param: SimpleStepParam<string> & ErrorMessageParam): MyStep<string>;
    static media(param: SimpleStepParam<MediaType> & ErrorMessageParam): MyStep<MediaType>;
    static photo(param: SimpleStepParam<MediaType> & ErrorMessageParam): MyStep<MediaType>;
    static video(param: SimpleStepParam<MediaType> & ErrorMessageParam): MyStep<MediaType>;
    static audio(param: SimpleStepParam<MediaType> & ErrorMessageParam): MyStep<MediaType>;
    static voice(param: SimpleStepParam<MediaType> & ErrorMessageParam): MyStep<MediaType>;
    static document(param: SimpleStepParam<MediaType> & ErrorMessageParam): MyStep<MediaType>;
    static contact<T>(param: SimpleStepParam<T | Contact> & ErrorMessageParam): MyStep<T | Contact>;
}
