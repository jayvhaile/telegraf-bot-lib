import {TelegrafContext} from "telegraf/typings/context";
import {MyMessage} from "../message/my_message";
import {
    BodyParam,
    ChoiceStepParam, ErrorMessageParam, MediaTextBodyParam,
    MediaType,
    MyStepParam,
    PromiseOr,
    SimpleStepParam,
    StepNavigationParams
} from "../types";
import {MyKeyboardButton} from "../message/extra/button/my_keyboard_button";
import MyValidators from "./my_validators";
import MyValueTransformers from "./my_value_transformers";
import {flatArray, unwrap} from "../utils";
import {DEFAULT_STEP_BACK, DEFAULT_STEP_EXIT, DEFAULT_STEP_SKIP} from "../consts";
import {MyButtonBoard} from "../message/extra/button/my_button_board";
import MyExtra, {joinMarkups, MyExtraParams, MyMarkup} from "../message/extra/my_extra";
import MyBody from "../message/body/my_body";
import {Contact} from "telegram-typings";

export enum StepResult {
    NEXT, BACK, LEAVE, STAY, FREEZE,
}


export default class MyStep<T> {
    constructor(
        readonly name: string,
        readonly validators: Array<(ctx: TelegrafContext) => PromiseOr<string>>,
        readonly valueTransformer: (ctx: TelegrafContext) => PromiseOr<T>,
        readonly onEnter: (ctx: TelegrafContext) => PromiseOr<StepResult>,
        readonly onMessage: (ctx: TelegrafContext) => PromiseOr<StepResult>,
        readonly onDone: (ctx: TelegrafContext, t: T) => PromiseOr<StepResult>,
    ) {
    }

    static from<T>(param: MyStepParam<T>): MyStep<T> {
        return new MyStep<T>(
            param.name,
            param.validators || [],
            param.valueTransformer || (_ => null),
            param.onEnter,
            param.onMessage || (_ => StepResult.STAY),
            param.onDone || (_ => StepResult.NEXT),
        );
    }


    static keyboardChoice<T>(param: MyStepParam<T> & ChoiceStepParam & MediaTextBodyParam & StepNavigationParams & MyExtraParams): MyStep<T | string> {
        return MyStep.from<T | string>({
            name: param.name,
            validators: [
                MyValidators.textIn(flatArray(param.choices)),
                ...(param.validators || []),
            ],
            valueTransformer: param.valueTransformer || MyValueTransformers.text(),
            onEnter: async (ctx: TelegrafContext) => {
                await new MyMessage(
                    MyBody.from(param),
                    MyExtra.from({
                        markup: joinMarkups([MyButtonBoard.fixedColumn(
                            param.choices.map(c => MyKeyboardButton.text(unwrap(c, ctx))),
                            param.columnCount || 2,
                        ), navKeyboard(param), param.markup])
                    })
                ).reply(ctx);
                await param.onEnter?.call(ctx);
                return StepResult.STAY;
            },
            onMessage: navHandler(param),
            onDone: param.onDone,
        });
    }

    static simple<T>(param: SimpleStepParam<T>): MyStep<T> {
        return MyStep.from<T>({
            name: param.name,
            valueTransformer: param.valueTransformer,
            validators: param.validators,
            onEnter: async (ctx: TelegrafContext) => {
                await new MyMessage(MyBody.from(param), MyExtra.from({
                    ...param,
                    markup: joinMarkups([param.markup, navKeyboard(param)])
                })).reply(ctx);
                await param.onEnter?.call(ctx);
                return StepResult.STAY;
            },
            onMessage: (ctx) => {
                const res = param.onMessage?.(ctx) || StepResult.STAY;

                return res == StepResult.STAY ? navHandler(param)(ctx) : res;
            },
            onDone: param.onDone,
        });
    }

    static text(param: SimpleStepParam<string> & ErrorMessageParam): MyStep<string> {
        return this.simple<string>({
            ...param,
            validators: [
                MyValidators.text(param.errorMessage),
                ...(param.validators || []),
            ],
            valueTransformer: param.valueTransformer || MyValueTransformers.text(),
        })
    }


    static media(param: SimpleStepParam<MediaType> & ErrorMessageParam): MyStep<MediaType> {
        return this.simple<MediaType>({
            ...param,
            valueTransformer: param.valueTransformer || MyValueTransformers.media(),
        })
    }

    static photo(param: SimpleStepParam<MediaType> & ErrorMessageParam): MyStep<MediaType> {
        return this.media({...param, validators: [MyValidators.photo(param.errorMessage), ...(param.validators || [])]})
    }

    static video(param: SimpleStepParam<MediaType> & ErrorMessageParam): MyStep<MediaType> {
        return this.media({...param, validators: [MyValidators.video(param.errorMessage), ...(param.validators || [])]})
    }

    static audio(param: SimpleStepParam<MediaType> & ErrorMessageParam): MyStep<MediaType> {
        return this.media({...param, validators: [MyValidators.audio(param.errorMessage), ...(param.validators || [])]})
    }

    static voice(param: SimpleStepParam<MediaType> & ErrorMessageParam): MyStep<MediaType> {
        return this.media({...param, validators: [MyValidators.voice(param.errorMessage), ...(param.validators || [])]})
    }

    static document(param: SimpleStepParam<MediaType> & ErrorMessageParam): MyStep<MediaType> {
        return this.media({
            ...param,
            validators: [MyValidators.document(param.errorMessage), ...(param.validators || [])]
        })
    }

    static contact<T>(param: SimpleStepParam<T | Contact> & ErrorMessageParam): MyStep<T | Contact> {
        return this.simple<T | Contact>({
            ...param,
            validators: [MyValidators.contact(param.errorMessage), ...(param.validators || [])],
            valueTransformer: param.valueTransformer || MyValueTransformers.contact(),
        })
    }
}


function navHandler(navParams: StepNavigationParams): (ctx: TelegrafContext) => StepResult {
    return (ctx: TelegrafContext): StepResult => {
        switch (ctx.message.text) {
            case unwrap(navParams.back || DEFAULT_STEP_BACK, ctx):
                return unwrap(navParams.includeBack, ctx) ? StepResult.BACK : StepResult.STAY;
            case unwrap(navParams.skip || DEFAULT_STEP_SKIP, ctx):
                return unwrap(navParams.includeSkip, ctx) ? StepResult.NEXT : StepResult.STAY;
            case unwrap(navParams.exit || DEFAULT_STEP_EXIT, ctx):
                return unwrap(navParams.includeExit, ctx) ? StepResult.LEAVE : StepResult.STAY;
            default:
                return StepResult.STAY;
        }
    }
}


function navKeyboard(params: StepNavigationParams): MyButtonBoard<MyKeyboardButton> {
    return MyButtonBoard.fixedColumn([
        params.includeBack ? MyKeyboardButton.text(params.back || DEFAULT_STEP_BACK) : null,
        params.includeSkip ? MyKeyboardButton.text(params.skip || DEFAULT_STEP_SKIP) : null,
        params.includeExit ? MyKeyboardButton.text(params.exit || DEFAULT_STEP_EXIT) : null,
    ].filter(v => v), 2);
}




