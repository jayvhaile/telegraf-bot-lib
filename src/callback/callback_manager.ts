import {TelegrafContext} from "telegraf/typings/context";
import {DATA_SEPARATOR} from "../consts";
import {unwrap} from "../utils";
import CallbackHandler from "./callback_handler";
import {CallbackResponse} from "../types";

export class CallbackManager {
    constructor(
        readonly handlers: CallbackHandler[],
    ) {
    }

    middleware() {
        return async (ctx: TelegrafContext, next) => {
            if (ctx.update.callback_query) {
                let callbackData = ctx.update.callback_query.data;
                const split = callbackData.split(DATA_SEPARATOR);
                if (split.length == 2) {
                    const handler = this.handlers.find(h => h.id == split[0]);
                    if (handler) {
                        const result = await handler.handle(ctx, split[1]);
                        if (result){
                            if(result['text']){
                                const r=result as CallbackResponse;
                                return ctx.answerCbQuery(
                                    unwrap(r.text, ctx),
                                    unwrap(r.showAlert, ctx)
                                );
                            }
                            // @ts-ignore
                            return ctx.answerCbQuery(unwrap(result, ctx));
                        }
                    }
                }
            }
            return next();
        }
    }
}
