"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinMarkups = exports.ParseMode = exports.OtherMarkups = void 0;
var telegraf_1 = require("telegraf");
var utils_1 = require("../../utils");
var my_inline_button_1 = require("./button/my_inline_button");
var my_keyboard_button_1 = require("./button/my_keyboard_button");
var my_button_board_1 = require("./button/my_button_board");
var OtherMarkups;
(function (OtherMarkups) {
    OtherMarkups[OtherMarkups["REMOVE_KEYBOARD"] = 0] = "REMOVE_KEYBOARD";
    OtherMarkups[OtherMarkups["FORCE_REPLY"] = 1] = "FORCE_REPLY";
})(OtherMarkups = exports.OtherMarkups || (exports.OtherMarkups = {}));
var ParseMode;
(function (ParseMode) {
    ParseMode[ParseMode["NONE"] = 0] = "NONE";
    ParseMode[ParseMode["HTML"] = 1] = "HTML";
    ParseMode[ParseMode["MARK_DOWN"] = 2] = "MARK_DOWN";
})(ParseMode = exports.ParseMode || (exports.ParseMode = {}));
var MyExtra = /** @class */ (function () {
    function MyExtra(markup, parseMode, enableWebPreview, shouldNotify, oneTimeKeyboard, resizeKeyboard, replyTo, caption) {
        if (parseMode === void 0) { parseMode = ParseMode.NONE; }
        if (enableWebPreview === void 0) { enableWebPreview = true; }
        if (shouldNotify === void 0) { shouldNotify = true; }
        if (oneTimeKeyboard === void 0) { oneTimeKeyboard = false; }
        if (resizeKeyboard === void 0) { resizeKeyboard = true; }
        this.markup = markup;
        this.parseMode = parseMode;
        this.enableWebPreview = enableWebPreview;
        this.shouldNotify = shouldNotify;
        this.oneTimeKeyboard = oneTimeKeyboard;
        this.resizeKeyboard = resizeKeyboard;
        this.replyTo = replyTo;
        this.caption = caption;
    }
    MyExtra.from = function (params) {
        if (!params)
            return null;
        return new MyExtra(params.markup, params.parseMode, params.enableWebPreview, params.shouldNotify, params.oneTimeKeyboard, params.resizeKeyboard, params.replyTo, params.caption);
    };
    MyExtra.removeKeyboard = function () {
        return MyExtra.from({
            markup: OtherMarkups.REMOVE_KEYBOARD,
        });
    };
    MyExtra.HTML = function () {
        return MyExtra.from({
            parseMode: ParseMode.HTML,
        });
    };
    MyExtra.MARK_DOWN = function () {
        return MyExtra.from({
            parseMode: ParseMode.MARK_DOWN,
        });
    };
    MyExtra.prototype.buildMarkup = function (ctx) {
        var _this = this;
        return function (m) {
            if (_this.markup == OtherMarkups.REMOVE_KEYBOARD) {
                m.removeKeyboard(true);
            }
            else if (_this.markup == OtherMarkups.FORCE_REPLY) {
                m.forceReply(true);
            }
            else if (_this.markup instanceof my_button_board_1.MyButtonBoard) {
                if (_this.markup.buttons[0][0] instanceof my_keyboard_button_1.KeyboardButton) {
                    var buttons = _this.markup.buttons;
                    m.keyboard(buttons.map(function (row) { return row.map(function (btn) { return btn.build(ctx, m); }); }));
                }
                else if (_this.markup.buttons[0][0] instanceof my_inline_button_1.InlineButton) {
                    var buttons = _this.markup.buttons;
                    m.inlineKeyboard(buttons.map(function (row) { return row.map(function (btn) { return btn.build(ctx, m); }); }), {});
                }
            }
            return m.oneTime(_this.oneTimeKeyboard)
                .resize(_this.resizeKeyboard);
        };
    };
    MyExtra.prototype.build = function (ctx) {
        var extra = telegraf_1.Extra
            .webPreview(this.enableWebPreview)
            .notifications(this.shouldNotify)
            .inReplyTo(this.replyTo)
            .markup(this.buildMarkup(ctx))
            .caption(utils_1.unwrap(this.caption, ctx));
        if (this.parseMode == ParseMode.HTML)
            extra = extra.HTML();
        if (this.parseMode == ParseMode.MARK_DOWN)
            extra = extra.markdown();
        return extra;
    };
    MyExtra.prototype.edit = function (ctx) {
        // @ts-ignore
        return ctx.editMessageReplyMarkup(this.build(ctx));
    };
    MyExtra.prototype.editIn = function (ctx, messageId, chatId) {
        // @ts-ignore
        return ctx.telegram.editMessageReplyMarkup(chatId, messageId, null, this.build(ctx));
    };
    return MyExtra;
}());
exports.default = MyExtra;
function joinMarkups(mm) {
    var markups = mm.filter(function (m) { return m; });
    if (markups.every(function (m) { return m == OtherMarkups.REMOVE_KEYBOARD; }))
        return OtherMarkups.REMOVE_KEYBOARD;
    if (markups.every(function (m) { return m == OtherMarkups.FORCE_REPLY; }))
        return OtherMarkups.FORCE_REPLY;
    if (markups.every(function (m) { return m instanceof my_button_board_1.MyButtonBoard; })) {
        if (markups.filter(function (m) { return !m.isEmpty; })
            .every(function (m) { return m.first instanceof my_inline_button_1.InlineButton; })) {
            return my_button_board_1.MyButtonBoard.joinAll(markups.map(function (m) { return m; }));
        }
        if (markups.filter(function (m) { return !m.isEmpty; })
            .every(function (m) { return m.first instanceof my_keyboard_button_1.KeyboardButton; })) {
            return my_button_board_1.MyButtonBoard.joinAll(markups.map(function (m) { return m; }));
        }
    }
    throw "Cannot join markups";
}
exports.joinMarkups = joinMarkups;
//# sourceMappingURL=my_extra.js.map