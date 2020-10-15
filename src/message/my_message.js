"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyMessage = void 0;
var my_extra_1 = require("./extra/my_extra");
var my_body_1 = require("./body/my_body");
var MyMessage = /** @class */ (function () {
    function MyMessage(body, extra) {
        this.body = body;
        this.extra = extra;
    }
    MyMessage.prototype.send = function (ctx, chatId) {
        return this.body.send(ctx, chatId, this.extra.build(ctx));
    };
    ;
    MyMessage.prototype.reply = function (ctx) {
        return this.body.reply(ctx, this.extra.build(ctx));
    };
    MyMessage.prototype.editBody = function (ctx, messageId) {
        return this.body.edit(ctx, messageId);
    };
    MyMessage.prototype.editBodyIn = function (ctx, messageId, chatId) {
        return this.body.editIn(ctx, messageId, chatId);
    };
    MyMessage.prototype.editExtra = function (ctx) {
        return this.extra.edit(ctx);
    };
    MyMessage.prototype.editExtraIn = function (ctx, messageId, chatId) {
        return this.extra.editIn(ctx, messageId, chatId);
    };
    MyMessage.text = function (text, extra) {
        return new MyMessage(my_body_1.default.text(text), extra instanceof my_extra_1.default ? extra : my_extra_1.default.from(extra));
    };
    MyMessage.photo = function (file, extra) {
        return new MyMessage(my_body_1.default.photo(file), extra instanceof my_extra_1.default ? extra : my_extra_1.default.from(extra));
    };
    MyMessage.video = function (file, extra) {
        return new MyMessage(my_body_1.default.video(file), extra instanceof my_extra_1.default ? extra : my_extra_1.default.from(extra));
    };
    MyMessage.audio = function (file, extra) {
        return new MyMessage(my_body_1.default.audio(file), extra instanceof my_extra_1.default ? extra : my_extra_1.default.from(extra));
    };
    MyMessage.voice = function (file, extra) {
        return new MyMessage(my_body_1.default.voice(file), extra instanceof my_extra_1.default ? extra : my_extra_1.default.from(extra));
    };
    MyMessage.document = function (file, extra) {
        return new MyMessage(my_body_1.default.document(file), extra instanceof my_extra_1.default ? extra : my_extra_1.default.from(extra));
    };
    return MyMessage;
}());
exports.MyMessage = MyMessage;
//# sourceMappingURL=my_message.js.map