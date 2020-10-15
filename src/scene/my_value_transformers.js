"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MyValueTransformers = /** @class */ (function () {
    function MyValueTransformers() {
    }
    MyValueTransformers.text = function () {
        return function (ctx) { return ctx.message.text; };
    };
    MyValueTransformers.media = function () {
        return function (ctx) {
            var _a, _b;
            return ({
                type: ['video', 'audio', 'voice', 'document', 'photo'][[
                    ctx.message.video,
                    ctx.message.audio,
                    ctx.message.voice,
                    ctx.message.document,
                    (_a = ctx.message.photo) === null || _a === void 0 ? void 0 : _a[0],
                ].map(function (a) { return !!a; }).indexOf(true)],
                fileId: [
                    ctx.message.video,
                    ctx.message.audio,
                    ctx.message.voice,
                    ctx.message.document,
                    (_b = ctx.message.photo) === null || _b === void 0 ? void 0 : _b[0],
                ].find(function (m) { return m; }).file_id,
                caption: ctx.message.caption,
            });
        };
    };
    return MyValueTransformers;
}());
exports.default = MyValueTransformers;
//# sourceMappingURL=my_value_transformers.js.map