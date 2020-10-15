"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.InlineURLButton = exports.InlineCallbackButton = exports.InlineButton = void 0;
var utils_1 = require("../../../utils");
var consts_1 = require("../../../consts");
var InlineButton = /** @class */ (function () {
    function InlineButton() {
    }
    InlineButton.callback = function (param) {
        return new InlineCallbackButton(param.id, param.label, param.data, param.hide || false);
    };
    InlineButton.url = function (param) {
        return new InlineURLButton(param.id, param.label, param.url, param.hide || false);
    };
    return InlineButton;
}());
exports.InlineButton = InlineButton;
var InlineCallbackButton = /** @class */ (function (_super) {
    __extends(InlineCallbackButton, _super);
    function InlineCallbackButton(id, label, data, hide) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.label = label;
        _this.data = data;
        _this.hide = hide;
        return _this;
    }
    InlineCallbackButton.prototype.build = function (ctx, m) {
        var text = utils_1.unwrap(this.label, ctx);
        var data = utils_1.unwrap(this.data, ctx);
        var hide = utils_1.unwrap(this.hide, ctx);
        return m.callbackButton(text, "" + this.id + consts_1.DATA_SEPARATOR + data, hide);
    };
    return InlineCallbackButton;
}(InlineButton));
exports.InlineCallbackButton = InlineCallbackButton;
var InlineURLButton = /** @class */ (function (_super) {
    __extends(InlineURLButton, _super);
    function InlineURLButton(id, label, url, hide) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.label = label;
        _this.url = url;
        _this.hide = hide;
        return _this;
    }
    InlineURLButton.prototype.build = function (ctx, m) {
        var text = utils_1.unwrap(this.label, ctx);
        var url = utils_1.unwrap(this.url, ctx);
        var hide = utils_1.unwrap(this.hide, ctx);
        return m.urlButton(text, "" + (this.id || '') + (this.id ? consts_1.DATA_SEPARATOR : '') + url, hide);
    };
    return InlineURLButton;
}(InlineButton));
exports.InlineURLButton = InlineURLButton;
//# sourceMappingURL=my_inline_button.js.map