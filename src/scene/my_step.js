"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepResult = void 0;
var my_message_1 = require("../message/my_message");
var my_keyboard_button_1 = require("../message/extra/button/my_keyboard_button");
var my_validators_1 = require("./my_validators");
var my_value_transformers_1 = require("./my_value_transformers");
var utils_1 = require("../utils");
var consts_1 = require("../consts");
var my_button_board_1 = require("../message/extra/button/my_button_board");
var my_extra_1 = require("../message/extra/my_extra");
var my_body_1 = require("../message/body/my_body");
var StepResult;
(function (StepResult) {
    StepResult[StepResult["NEXT"] = 0] = "NEXT";
    StepResult[StepResult["BACK"] = 1] = "BACK";
    StepResult[StepResult["LEAVE"] = 2] = "LEAVE";
    StepResult[StepResult["STAY"] = 3] = "STAY";
    StepResult[StepResult["SKIP"] = 4] = "SKIP";
})(StepResult = exports.StepResult || (exports.StepResult = {}));
var MyStep = /** @class */ (function () {
    function MyStep(name, validators, valueTransformer, onEnter, onMessage, onDone) {
        this.name = name;
        this.validators = validators;
        this.valueTransformer = valueTransformer;
        this.onEnter = onEnter;
        this.onMessage = onMessage;
        this.onDone = onDone;
    }
    MyStep.from = function (param) {
        return new MyStep(param.name, param.validators || [], param.valueTransformer || (function (_) { return null; }), param.onEnter, param.onMessage || (function (_) { return StepResult.STAY; }), param.onDone || (function (_) { return StepResult.NEXT; }));
    };
    MyStep.keyboardChoice = function (param) {
        var _this = this;
        return MyStep.from({
            name: param.name,
            validators: __spreadArrays([
                my_validators_1.default.textIn(utils_1.flatArray(param.choices))
            ], (param.validators || [])),
            valueTransformer: param.valueTransformer || my_value_transformers_1.default.text(),
            onEnter: function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, new my_message_1.MyMessage(my_body_1.default.from(param), my_extra_1.default.from({
                                markup: my_extra_1.joinMarkups([my_button_board_1.MyButtonBoard.fixedColumn(param.choices.map(function (c) { return my_keyboard_button_1.KeyboardButton.text(utils_1.unwrap(c, ctx)); }), param.columnCount || 2), navKeyboard(param), param.markup])
                            })).reply(ctx)];
                        case 1:
                            _b.sent();
                            return [4 /*yield*/, ((_a = param.onEnter) === null || _a === void 0 ? void 0 : _a.call(ctx))];
                        case 2:
                            _b.sent();
                            return [2 /*return*/, StepResult.STAY];
                    }
                });
            }); },
            onMessage: navHandler(param),
            onDone: param.onDone,
        });
    };
    MyStep.simple = function (param) {
        var _this = this;
        return MyStep.from({
            name: param.name,
            valueTransformer: param.valueTransformer,
            validators: param.validators,
            onEnter: function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            console.log("ON ENTER STEP");
                            return [4 /*yield*/, new my_message_1.MyMessage(my_body_1.default.from(param), my_extra_1.default.from(__assign(__assign({}, param), { markup: my_extra_1.joinMarkups([param.markup, navKeyboard(param)]) }))).reply(ctx)];
                        case 1:
                            _b.sent();
                            return [4 /*yield*/, ((_a = param.onEnter) === null || _a === void 0 ? void 0 : _a.call(ctx))];
                        case 2:
                            _b.sent();
                            return [2 /*return*/, StepResult.STAY];
                    }
                });
            }); },
            onMessage: navHandler(param),
            onDone: param.onDone,
        });
    };
    MyStep.text = function (param) {
        return this.simple(__assign(__assign({}, param), { validators: __spreadArrays([
                my_validators_1.default.text(param.errorMessage)
            ], (param.validators || [])), valueTransformer: param.valueTransformer || my_value_transformers_1.default.text() }));
    };
    MyStep.media = function (param) {
        return this.simple(__assign(__assign({}, param), { valueTransformer: param.valueTransformer || my_value_transformers_1.default.media() }));
    };
    MyStep.photo = function (param) {
        return this.media(__assign(__assign({}, param), { validators: __spreadArrays([my_validators_1.default.photo(param.errorMessage)], param.validators) }));
    };
    MyStep.video = function (param) {
        return this.media(__assign(__assign({}, param), { validators: __spreadArrays([my_validators_1.default.video(param.errorMessage)], param.validators) }));
    };
    MyStep.audio = function (param) {
        return this.media(__assign(__assign({}, param), { validators: __spreadArrays([my_validators_1.default.audio(param.errorMessage)], param.validators) }));
    };
    MyStep.voice = function (param) {
        return this.media(__assign(__assign({}, param), { validators: __spreadArrays([my_validators_1.default.voice(param.errorMessage)], param.validators) }));
    };
    MyStep.document = function (param) {
        return this.media(__assign(__assign({}, param), { validators: __spreadArrays([my_validators_1.default.document(param.errorMessage)], param.validators) }));
    };
    MyStep.contact = function (param) {
        return this.media(__assign(__assign({}, param), { validators: __spreadArrays([my_validators_1.default.document(param.errorMessage)], param.validators) }));
    };
    return MyStep;
}());
exports.default = MyStep;
function navHandler(navParams) {
    return function (ctx) {
        switch (ctx.message.text) {
            case utils_1.unwrap(navParams.back || consts_1.DEFAULT_STEP_BACK, ctx):
                return utils_1.unwrap(navParams.includeBack, ctx) ? StepResult.BACK : StepResult.STAY;
            case utils_1.unwrap(navParams.skip || consts_1.DEFAULT_STEP_SKIP, ctx):
                return utils_1.unwrap(navParams.includeSkip, ctx) ? StepResult.NEXT : StepResult.STAY;
            case utils_1.unwrap(navParams.exit || consts_1.DEFAULT_STEP_EXIT, ctx):
                return utils_1.unwrap(navParams.includeExit, ctx) ? StepResult.LEAVE : StepResult.STAY;
            default:
                return StepResult.STAY;
        }
    };
}
function navKeyboard(params) {
    return my_button_board_1.MyButtonBoard.fixedColumn([
        params.includeBack ? my_keyboard_button_1.KeyboardButton.text(params.back || consts_1.DEFAULT_STEP_BACK) : null,
        params.includeSkip ? my_keyboard_button_1.KeyboardButton.text(params.skip || consts_1.DEFAULT_STEP_SKIP) : null,
        params.includeExit ? my_keyboard_button_1.KeyboardButton.text(params.exit || consts_1.DEFAULT_STEP_EXIT) : null,
    ].filter(function (v) { return v; }), 2);
}
//# sourceMappingURL=my_step.js.map