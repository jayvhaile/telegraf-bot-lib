"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var MyValidators = /** @class */ (function () {
    function MyValidators() {
    }
    MyValidators.textAnd = function (validator, errorMessage) {
        if (errorMessage === void 0) { errorMessage = "Text Required"; }
        return function (ctx) { return !!ctx.message.text ? null : utils_1.unwrap(errorMessage, ctx); };
    };
    MyValidators.text = function (errorMessage) {
        if (errorMessage === void 0) { errorMessage = "Text Required"; }
        return function (ctx) { return !!ctx.message.text ? null : utils_1.unwrap(errorMessage, ctx); };
    };
    MyValidators.numeric = function (min, max, errorMessage) {
        if (errorMessage === void 0) { errorMessage = "Text Required"; }
        return function (ctx) { return !!ctx.message.text ? null : utils_1.unwrap(errorMessage, ctx); };
    };
    MyValidators.regex = function (regex, errorMessage) {
        if (errorMessage === void 0) { errorMessage = "Invalid Input"; }
        return function (ctx) { return regex.test(ctx.message.text) ? null : utils_1.unwrap(errorMessage, ctx); };
    };
    MyValidators.textIn = function (choices, errorMessage) {
        return function (ctx) { return utils_1.unwrapList(choices, ctx).includes(ctx.message.text) ? null : utils_1.unwrap(errorMessage || (function (ctx) { return "Choice should be one of:\n" + utils_1.unwrapList(choices, ctx).join(",\n"); }), ctx); };
    };
    MyValidators.photo = function (errorMessage, captioned) {
        if (captioned === void 0) { captioned = false; }
        return function (ctx) { return !!ctx.message.photo ? null : utils_1.unwrap(errorMessage || "Photo Required", ctx); };
    };
    MyValidators.video = function (errorMessage) {
        return function (ctx) { return !!ctx.message.video ? null : utils_1.unwrap(errorMessage || "Video Required!", ctx); };
    };
    MyValidators.voice = function (errorMessage) {
        return function (ctx) { return !!ctx.message.voice ? null : utils_1.unwrap(errorMessage || "Video Required!", ctx); };
    };
    MyValidators.document = function (errorMessage) {
        return function (ctx) { return !!ctx.message.document ? null : utils_1.unwrap(errorMessage || "Document Required!", ctx); };
    };
    MyValidators.audio = function (errorMessage) {
        return function (ctx) { return !!ctx.message.audio ? null : utils_1.unwrap(errorMessage || "Audio Required!", ctx); };
    };
    MyValidators.contact = function (errorMessage) {
        return function (ctx) { return !!ctx.message.contact ? null : utils_1.unwrap(errorMessage || "Contact Required!", ctx); };
    };
    MyValidators.ownContact = function (errorMessage) {
        return function (ctx) { return !!ctx.message.contact && ctx.message.contact.user_id == ctx.from.id ? null
            : utils_1.unwrap(errorMessage || "Own Contact Required!", ctx); };
    };
    MyValidators.location = function (errorMessage) {
        return function (ctx) { return !!ctx.message.contact ? null : utils_1.unwrap(errorMessage || "Contact Required!", ctx); };
    };
    MyValidators.or = function (validators, errorMessage) {
        return function (ctx) {
            var pass = validators.some(function (v) { return v(ctx) == null; });
            if (pass)
                return null;
            return utils_1.unwrap(errorMessage, ctx);
        };
    };
    return MyValidators;
}());
exports.default = MyValidators;
//# sourceMappingURL=my_validators.js.map