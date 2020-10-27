import { TelegrafContext } from "telegraf/typings/context";
import { CallbackResponse, PromiseOr, Wrapped } from "../types";
export default class CallbackHandler {
    readonly id: string;
    readonly handle: (ctx: TelegrafContext, data: string) => PromiseOr<CallbackResponse | Wrapped<string>>;
    constructor(id: string, handle: (ctx: TelegrafContext, data: string) => PromiseOr<CallbackResponse | Wrapped<string>>);
}
