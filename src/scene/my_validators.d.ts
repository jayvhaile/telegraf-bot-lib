import { TelegrafContext } from "telegraf/typings/context";
import { PromiseOr, Wrapped } from "../types";
export default class MyValidators {
    static textAnd(validator: (string: any) => string, errorMessage?: Wrapped<string>): (ctx: TelegrafContext) => string;
    static text(errorMessage?: Wrapped<string>): (ctx: TelegrafContext) => string;
    static numeric(min: number, max: number, errorMessage?: Wrapped<string>): (ctx: TelegrafContext) => string;
    static regex(regex: RegExp, errorMessage?: Wrapped<string>): (ctx: TelegrafContext) => string;
    static textIn(choices: Wrapped<string>[], errorMessage?: Wrapped<string>): (ctx: TelegrafContext) => string;
    static photo(errorMessage?: Wrapped<string>, captioned?: boolean): (ctx: TelegrafContext) => string;
    static video(errorMessage?: Wrapped<string>): (ctx: TelegrafContext) => string;
    static voice(errorMessage?: Wrapped<string>): (ctx: TelegrafContext) => string;
    static document(errorMessage?: Wrapped<string>): (ctx: TelegrafContext) => string;
    static audio(errorMessage?: Wrapped<string>): (ctx: TelegrafContext) => string;
    static contact(errorMessage?: Wrapped<string>): (ctx: TelegrafContext) => string;
    static ownContact(errorMessage?: Wrapped<string>): (ctx: TelegrafContext) => string;
    static location(errorMessage?: Wrapped<string>): (ctx: TelegrafContext) => string;
    static or(validators: Array<(ctx: TelegrafContext) => PromiseOr<string>>, errorMessage: Wrapped<string>): (ctx: any) => string;
}
