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
Object.defineProperty(exports, "__esModule", { value: true });
var my_stage_1 = require("./my_stage");
var my_step_1 = require("./my_step");
var my_scene_1 = require("./my_scene");
var MyStepScene = /** @class */ (function (_super) {
    __extends(MyStepScene, _super);
    function MyStepScene(steps, onResult, onLeave) {
        var _this = _super.call(this) || this;
        _this.steps = steps;
        _this.onResult = onResult;
        _this.onLeave = onLeave;
        return _this;
    }
    MyStepScene.prototype.getCursor = function (ctx) {
        var _a;
        return ((_a = my_stage_1.MyStage.router.history.head(ctx).data) === null || _a === void 0 ? void 0 : _a['cursor']) || 0;
    };
    MyStepScene.prototype.setCursor = function (ctx, value) {
        my_stage_1.MyStage.router.history.updateHeadData(ctx, {
            cursor: value
        }, true);
    };
    MyStepScene.prototype.prevStep = function (ctx) {
        var cursor = this.getCursor(ctx);
        return cursor == 0 ? null : this.steps[cursor - 1];
    };
    MyStepScene.prototype.currentStep = function (ctx) {
        var cursor = this.getCursor(ctx);
        return this.steps[cursor];
    };
    MyStepScene.prototype.nextStep = function (ctx) {
        var cursor = this.getCursor(ctx);
        return cursor + 1 >= this.steps.length ? null : this.steps[cursor + 1];
    };
    MyStepScene.prototype.handle = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var currentStep, onMessageResult, validations, value, result;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        currentStep = this.currentStep(ctx);
                        return [4 /*yield*/, currentStep.onMessage(ctx)];
                    case 1:
                        onMessageResult = _b.sent();
                        if (onMessageResult != my_step_1.StepResult.STAY) {
                            return [2 /*return*/, this.handleResult(ctx, onMessageResult)];
                        }
                        return [4 /*yield*/, Promise.all(currentStep.validators.map(function (v) { return v(ctx); }))];
                    case 2:
                        validations = (_b.sent()).filter(function (e) { return e; });
                        if (!validations.length) return [3 /*break*/, 4];
                        return [4 /*yield*/, ctx.reply(validations[0])];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, true];
                    case 4:
                        value = currentStep.valueTransformer(ctx);
                        my_stage_1.MyStage.router.history.updateHeadData(ctx, (_a = {},
                            _a[currentStep.name] = value,
                            _a), true);
                        return [4 /*yield*/, currentStep.onDone(ctx, value)];
                    case 5:
                        result = _b.sent();
                        return [4 /*yield*/, this.handleResult(ctx, result)];
                    case 6:
                        _b.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    MyStepScene.prototype.handleResult = function (ctx, result) {
        return __awaiter(this, void 0, void 0, function () {
            var session, cursor, prevStep, nextStep, _a, result_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        session = my_stage_1.MyStage.router.history.head(ctx).data;
                        cursor = this.getCursor(ctx);
                        prevStep = this.prevStep(ctx);
                        nextStep = this.nextStep(ctx);
                        _a = result;
                        switch (_a) {
                            case my_step_1.StepResult.BACK: return [3 /*break*/, 1];
                            case my_step_1.StepResult.LEAVE: return [3 /*break*/, 3];
                            case my_step_1.StepResult.NEXT: return [3 /*break*/, 5];
                            case my_step_1.StepResult.STAY: return [3 /*break*/, 8];
                            case my_step_1.StepResult.FREEZE: return [3 /*break*/, 9];
                        }
                        return [3 /*break*/, 10];
                    case 1:
                        if (prevStep) {
                            this.setCursor(ctx, cursor - 1);
                            return [2 /*return*/, this.enterStep(ctx, prevStep)];
                        }
                        return [4 /*yield*/, my_stage_1.MyStage.router.pop(ctx)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, false];
                    case 3: return [4 /*yield*/, my_stage_1.MyStage.router.pop(ctx)];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, false];
                    case 5:
                        if (nextStep) {
                            this.setCursor(ctx, cursor + 1);
                            return [2 /*return*/, this.enterStep(ctx, nextStep)];
                        }
                        result_1 = __assign({}, session);
                        return [4 /*yield*/, this.onResult(ctx, result_1)];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, my_stage_1.MyStage.router.pop(ctx)];
                    case 7:
                        _b.sent();
                        return [2 /*return*/, false];
                    case 8: return [2 /*return*/, true];
                    case 9: return [2 /*return*/, true];
                    case 10: return [2 /*return*/, true];
                }
            });
        });
    };
    MyStepScene.prototype.enterStep = function (ctx, step) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.handleResult;
                        _b = [ctx];
                        return [4 /*yield*/, step.onEnter(ctx)];
                    case 1: return [2 /*return*/, _a.apply(this, _b.concat([_c.sent()]))];
                }
            });
        });
    };
    MyStepScene.prototype.onEnterScene = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var cursor, currentStep;
            return __generator(this, function (_a) {
                cursor = this.getCursor(ctx);
                currentStep = this.steps[cursor];
                return [2 /*return*/, this.enterStep(ctx, currentStep)];
            });
        });
    };
    MyStepScene.prototype.onLeaveScene = function (ctx) {
        return this.onLeave(ctx);
    };
    return MyStepScene;
}(my_scene_1.MyBaseScene));
exports.default = MyStepScene;
//# sourceMappingURL=my_step_scene.js.map