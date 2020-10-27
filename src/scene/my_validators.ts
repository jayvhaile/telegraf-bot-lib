import {TelegrafContext} from "telegraf/typings/context";
import {PromiseOr, Wrapped} from "../types";
import {unwrap, unwrapList} from "../utils";

export default class MyValidators {
    static textAnd(validator:(string)=>string,errorMessage: Wrapped<string> = "Text Required") {
        return (ctx: TelegrafContext) => !!ctx.message.text ? null : unwrap(errorMessage, ctx)
    }
    static text(errorMessage: Wrapped<string> = "Text Required") {
        return (ctx: TelegrafContext) => !!ctx.message.text ? null : unwrap(errorMessage, ctx)
    }

    static numeric(min: number, max: number, errorMessage: Wrapped<string> = "Text Required") {
        return (ctx: TelegrafContext) => !!ctx.message.text ? null : unwrap(errorMessage, ctx)
    }

    static regex(regex: RegExp, errorMessage: Wrapped<string> = "Invalid Input") {
        return (ctx: TelegrafContext) => regex.test(ctx.message.text) ? null : unwrap(errorMessage, ctx);
    }

    static textIn(
        choices: Wrapped<string>[],
        errorMessage?: Wrapped<string>,
    ) {
        return (ctx: TelegrafContext) => unwrapList(choices, ctx).includes(ctx.message.text) ? null : unwrap(
            errorMessage || (ctx => `Choice should be one of:\n${unwrapList(choices, ctx).join(",\n")}`),
            ctx
        );
    }

    static photo(errorMessage?: Wrapped<string>, captioned = false) {
        return (ctx: TelegrafContext) => !!ctx.message.photo ? null : unwrap(errorMessage || "Photo Required", ctx)
    }

    static video(errorMessage?: Wrapped<string>) {
        return (ctx: TelegrafContext) => !!ctx.message.video ? null : unwrap(errorMessage || "Video Required!", ctx)
    }

    static voice(errorMessage?: Wrapped<string>) {
        return (ctx: TelegrafContext) => !!ctx.message.voice ? null : unwrap(errorMessage || "Video Required!", ctx)
    }

    static document(errorMessage?: Wrapped<string>) {
        return (ctx: TelegrafContext) => !!ctx.message.document ? null : unwrap(errorMessage || "Document Required!", ctx)
    }

    static audio(errorMessage?: Wrapped<string>) {
        return (ctx: TelegrafContext) => !!ctx.message.audio ? null : unwrap(errorMessage || "Audio Required!", ctx)
    }

    static contact(errorMessage?: Wrapped<string>) {
        return (ctx: TelegrafContext) => !!ctx.message.contact ? null : unwrap(errorMessage || "Contact Required!", ctx)
    }

    static ownContact(errorMessage?: Wrapped<string>) {
        return (ctx: TelegrafContext) => !!ctx.message.contact && ctx.message.contact.user_id == ctx.from.id ? null
            : unwrap(errorMessage || "Own Contact Required!", ctx)
    }

    static location(errorMessage?: Wrapped<string>) {
        return (ctx: TelegrafContext) => !!ctx.message.contact ? null : unwrap(errorMessage || "Contact Required!", ctx)
    }

    static or(validators: Array<(ctx: TelegrafContext) => PromiseOr<string>>, errorMessage: Wrapped<string>) {
        return ctx => {
            const pass = validators.some(v => v(ctx) == null)
            if (pass) return null;
            return unwrap(errorMessage, ctx);
        }
    }


}
