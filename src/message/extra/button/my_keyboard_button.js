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
exports.LocationRequestKeyboardButton = exports.ContactRequestKeyboardButton = exports.TextKeyboardButton = exports.MyKeyboardButton = void 0;
var utils_1 = require("../../../utils");
var MyKeyboardButton = /** @class */ (function () {
    function MyKeyboardButton() {
    }
    MyKeyboardButton.text = function (label, hide) {
        if (hide === void 0) { hide = false; }
        return new TextKeyboardButton(label, hide);
    };
    MyKeyboardButton.contact = function (label, hide) {
        if (hide === void 0) { hide = false; }
        return new ContactRequestKeyboardButton(label, hide);
    };
    MyKeyboardButton.location = function (label, hide) {
        if (hide === void 0) { hide = false; }
        return new LocationRequestKeyboardButton(label, hide);
    };
    return MyKeyboardButton;
}());
exports.MyKeyboardButton = MyKeyboardButton;
var TextKeyboardButton = /** @class */ (function (_super) {
    __extends(TextKeyboardButton, _super);
    function TextKeyboardButton(label, hide) {
        var _this = _super.call(this) || this;
        _this.label = label;
        _this.hide = hide;
        return _this;
    }
    TextKeyboardButton.prototype.build = function (ctx, m) {
        return m.button(utils_1.unwrap(this.label, ctx), utils_1.unwrap(this.hide, ctx));
    };
    return TextKeyboardButton;
}(MyKeyboardButton));
exports.TextKeyboardButton = TextKeyboardButton;
var ContactRequestKeyboardButton = /** @class */ (function (_super) {
    __extends(ContactRequestKeyboardButton, _super);
    function ContactRequestKeyboardButton(label, hide) {
        var _this = _super.call(this) || this;
        _this.label = label;
        _this.hide = hide;
        return _this;
    }
    ContactRequestKeyboardButton.prototype.build = function (ctx, m) {
        return m.contactRequestButton(utils_1.unwrap(this.label, ctx), utils_1.unwrap(this.hide, ctx));
    };
    return ContactRequestKeyboardButton;
}(MyKeyboardButton));
exports.ContactRequestKeyboardButton = ContactRequestKeyboardButton;
var LocationRequestKeyboardButton = /** @class */ (function (_super) {
    __extends(LocationRequestKeyboardButton, _super);
    function LocationRequestKeyboardButton(label, hide) {
        var _this = _super.call(this) || this;
        _this.label = label;
        _this.hide = hide;
        return _this;
    }
    LocationRequestKeyboardButton.prototype.build = function (ctx, m) {
        return m.locationRequestButton(utils_1.unwrap(this.label, ctx), utils_1.unwrap(this.hide, ctx));
    };
    return LocationRequestKeyboardButton;
}(MyKeyboardButton));
exports.LocationRequestKeyboardButton = LocationRequestKeyboardButton;
//# sourceMappingURL=my_keyboard_button.js.map