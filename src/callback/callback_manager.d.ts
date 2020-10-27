import { TelegrafContext } from "telegraf/typings/context";
import CallbackHandler from "./callback_handler";
export declare class CallbackManager {
    readonly handlers: CallbackHandler[];
    constructor(handlers: CallbackHandler[]);
    middleware(): (ctx: TelegrafContext, next: any) => Promise<any>;
}
