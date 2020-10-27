import {TelegrafContext} from "telegraf/typings/context";
import {Extra, Markup} from "telegraf";
import {unwrap} from "../../utils";
import {Message} from "telegraf/typings/telegram-types";
import {MyInlineButton} from "./button/my_inline_button";
import {MyKeyboardButton} from "./button/my_keyboard_button";
import {MyButtonBoard} from "./button/my_button_board";
import {MyButton} from "./button/my_button";

export enum OtherMarkups {
    REMOVE_KEYBOARD,
    FORCE_REPLY
}

export type MyMarkup = MyButtonBoard<MyButton> | OtherMarkups;


export interface MyExtraParams {
    markup?: MyMarkup;
    parseMode?: ParseMode;
    enableWebPreview?: boolean;
    shouldNotify?: boolean;
    oneTimeKeyboard?: boolean;
    resizeKeyboard?: boolean;
    replyTo?: string;
    caption?: string;
}

export enum ParseMode {
    NONE, HTML, MARK_DOWN
}

export default class MyExtra {
    constructor(
        readonly markup?: MyMarkup,
        readonly parseMode: ParseMode = ParseMode.NONE,
        readonly enableWebPreview: boolean = true,
        readonly shouldNotify: boolean = true,
        readonly oneTimeKeyboard: boolean = false,
        readonly resizeKeyboard: boolean = true,
        readonly replyTo?: string,
        readonly caption?: string,
    ) {
    }

    static from(params: MyExtraParams): MyExtra {
        if (!params) return null;
        return new MyExtra(
            params.markup,
            params.parseMode,
            params.enableWebPreview,
            params.shouldNotify,
            params.oneTimeKeyboard,
            params.resizeKeyboard,
            params.replyTo,
            params.caption
        )
    }

    static removeKeyboard(): MyExtra {
        return MyExtra.from({
            markup: OtherMarkups.REMOVE_KEYBOARD,
        })
    }

    static HTML(): MyExtra {
        return MyExtra.from({
            parseMode: ParseMode.HTML,
        })
    }

    static MARK_DOWN(): MyExtra {
        return MyExtra.from({
            parseMode: ParseMode.MARK_DOWN,
        })
    }


    buildMarkup(ctx: TelegrafContext) {
        return (m: Markup) => {
            if (this.markup == OtherMarkups.REMOVE_KEYBOARD) {
                m.removeKeyboard(true)
            } else if (this.markup == OtherMarkups.FORCE_REPLY) {
                m.forceReply(true)
            } else if (this.markup instanceof MyButtonBoard) {
                if (this.markup.buttons[0][0] instanceof MyKeyboardButton) {
                    const buttons = this.markup.buttons as MyKeyboardButton[][];
                    m.keyboard(buttons.map(row => row.map(btn => btn.build(ctx, m))));
                } else if (this.markup.buttons[0][0] instanceof MyInlineButton) {
                    const buttons = this.markup.buttons as MyInlineButton[][];
                    m.inlineKeyboard(buttons.map(row => row.map(btn => btn.build(ctx, m))), {});
                }
            }
            return m.oneTime(this.oneTimeKeyboard)
                .resize(this.resizeKeyboard)

        }
    }

    build(ctx: TelegrafContext): Extra {
        let extra = Extra
            .webPreview(this.enableWebPreview)
            .notifications(this.shouldNotify)
            .inReplyTo(this.replyTo)
            .markup(this.buildMarkup(ctx))
            .caption(unwrap(this.caption, ctx));

        if (this.parseMode == ParseMode.HTML) extra = extra.HTML();
        if (this.parseMode == ParseMode.MARK_DOWN) extra = extra.markdown();

        return extra;
    }

    edit(ctx: TelegrafContext): Promise<Message | boolean> {
        // @ts-ignore
        return ctx.editMessageReplyMarkup(this.build(ctx));
    }

    editIn(ctx: TelegrafContext, messageId: number, chatId: string): Promise<Message | boolean> {
        // @ts-ignore
        return ctx.telegram.editMessageReplyMarkup(chatId, messageId, null, this.build(ctx));
    }
}

export function joinMarkups(mm: MyMarkup[]): MyMarkup {
    const markups = mm.filter(m => m);
    if (markups.every(m => m == OtherMarkups.REMOVE_KEYBOARD))
        return OtherMarkups.REMOVE_KEYBOARD;
    if (markups.every(m => m == OtherMarkups.FORCE_REPLY))
        return OtherMarkups.FORCE_REPLY;
    if (markups.every(m => m instanceof MyButtonBoard)) {
        if (markups.filter(m => !(m as MyButtonBoard<MyButton>).isEmpty)
            .every(m => (m as MyButtonBoard<MyButton>).first instanceof MyInlineButton)) {
            return MyButtonBoard.joinAll<MyInlineButton>(markups.map(m => m as MyButtonBoard<MyInlineButton>))
        }
        if (markups.filter(m => !(m as MyButtonBoard<MyButton>).isEmpty)
            .every(m => (m as MyButtonBoard<MyButton>).first instanceof MyKeyboardButton)) {
            return MyButtonBoard.joinAll<MyKeyboardButton>(markups.map(m => m as MyButtonBoard<MyKeyboardButton>))
        }
    }
    throw "Cannot join markups";
}
