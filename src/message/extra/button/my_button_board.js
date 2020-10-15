"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyButtonBoard = exports.ButtonLayout = void 0;
var utils_1 = require("../../../utils");
var ButtonLayout = /** @class */ (function () {
    function ButtonLayout() {
    }
    ButtonLayout.horizontal = function () {
        return [8];
    };
    ButtonLayout.vertical = function () {
        return [1];
    };
    ButtonLayout.fixed = function (column) {
        return [column];
    };
    return ButtonLayout;
}());
exports.ButtonLayout = ButtonLayout;
var MyButtonBoard = /** @class */ (function () {
    function MyButtonBoard(buttons) {
        this.buttons = buttons;
    }
    Object.defineProperty(MyButtonBoard.prototype, "first", {
        get: function () {
            return utils_1.flatArray(this.buttons)[0];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MyButtonBoard.prototype, "isEmpty", {
        get: function () {
            return this.buttons.length == 0;
        },
        enumerable: false,
        configurable: true
    });
    MyButtonBoard.prototype.horizontal = function () {
        return MyButtonBoard.horizontal(utils_1.flatArray(this.buttons));
    };
    MyButtonBoard.prototype.vertical = function () {
        return MyButtonBoard.vertical(utils_1.flatArray(this.buttons));
    };
    MyButtonBoard.prototype.fixedColumn = function (columnCount) {
        return MyButtonBoard.fixedColumn(utils_1.flatArray(this.buttons), columnCount);
    };
    MyButtonBoard.prototype.layout = function (columnCounts) {
        return MyButtonBoard.layout(utils_1.flatArray(this.buttons), columnCounts);
    };
    MyButtonBoard.prototype.join = function (keyboard) {
        return MyButtonBoard.join(this, keyboard);
    };
    MyButtonBoard.with = function (buttons) {
        return new MyButtonBoard([]);
    };
    MyButtonBoard.empty = function () {
        return new MyButtonBoard([]);
    };
    MyButtonBoard.horizontal = function (buttons) {
        return new MyButtonBoard([buttons]);
    };
    MyButtonBoard.vertical = function (buttons) {
        return new MyButtonBoard(utils_1.group(buttons, 1));
    };
    MyButtonBoard.fixedColumn = function (buttons, columnCount) {
        return new MyButtonBoard(utils_1.group(buttons, columnCount));
    };
    MyButtonBoard.layout = function (buttons, columnCounts) {
        return new MyButtonBoard(utils_1.groupWith(buttons, columnCounts));
    };
    MyButtonBoard.join = function (keyboard1, keyboard2) {
        return new MyButtonBoard(__spreadArrays(keyboard1.buttons, keyboard2.buttons));
    };
    MyButtonBoard.joinAll = function (keyboards) {
        var res = [];
        keyboards.forEach(function (k) { return res.push.apply(res, k.buttons); });
        return new MyButtonBoard(res);
    };
    return MyButtonBoard;
}());
exports.MyButtonBoard = MyButtonBoard;
//# sourceMappingURL=my_button_board.js.map