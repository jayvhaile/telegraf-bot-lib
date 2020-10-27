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
Object.defineProperty(exports, "__esModule", { value: true });
exports.History = void 0;
var utils_1 = require("../utils");
var my_stage_1 = require("./my_stage");
var History = /** @class */ (function () {
    function History() {
    }
    History.prototype.stack = function (ctx) {
        return utils_1.SessionUtils.get(ctx, my_stage_1.SESSION_KEY + ".history") || [];
    };
    History.prototype.push = function (ctx, location, replace) {
        if (replace === void 0) { replace = false; }
        var stack = this.stack(ctx);
        if (replace)
            stack.pop();
        stack.push(location);
        utils_1.SessionUtils.set(ctx, my_stage_1.SESSION_KEY + ".history", stack);
    };
    History.prototype.pop = function (ctx) {
        var stack = this.stack(ctx);
        stack.pop();
        utils_1.SessionUtils.set(ctx, my_stage_1.SESSION_KEY + ".history", stack);
    };
    History.prototype.head = function (ctx) {
        var stack = this.stack(ctx);
        return stack.length ? stack[stack.length - 1] : null;
    };
    History.prototype.popHead = function (ctx) {
        var stack = this.stack(ctx);
        return stack.length > 1 ? stack[stack.length - 2] : null;
    };
    History.prototype.updateHeadData = function (ctx, data, preserve) {
        if (preserve === void 0) { preserve = false; }
        var stack = this.stack(ctx);
        if (stack.length) {
            var location_1 = stack.pop();
            stack.push(__assign(__assign({}, location_1), { data: __assign(__assign({}, (preserve && location_1.data ? location_1.data : [])), data) }));
            utils_1.SessionUtils.set(ctx, my_stage_1.SESSION_KEY + ".history", stack);
        }
        else
            throw "Empty History";
    };
    return History;
}());
exports.History = History;
var Router = /** @class */ (function () {
    function Router(routes) {
        this.routes = routes;
        this.history = new History();
    }
    Object.defineProperty(Router.prototype, "defaultRoute", {
        get: function () {
            return this.routes.find(function (route) { return route.path == '/'; });
        },
        enumerable: false,
        configurable: true
    });
    Router.prototype.findRoute = function (ctx, path) {
        return this.routes.find(function (route) { return route.path == path; });
    };
    Router.prototype.head = function (ctx) {
        var headHistory = this.history.head(ctx);
        return headHistory ? this.findRoute(ctx, headHistory.path) : null;
    };
    Router.prototype.push = function (ctx, to, replace) {
        if (replace === void 0) { replace = false; }
        return this.enterLocation(ctx, typeof to == "string" ? { path: to } : to, replace);
    };
    Router.prototype.pop = function (ctx) {
        var to = this.history.popHead(ctx);
        return this.enterLocation(ctx, to, false, true);
    };
    Router.prototype.enterRoute = function (ctx, fromRoute, toRoute, leave) {
        if (leave === void 0) { leave = false; }
        return __awaiter(this, void 0, void 0, function () {
            var to;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        to = toRoute || this.defaultRoute;
                        if (!fromRoute) return [3 /*break*/, 5];
                        if (!(fromRoute.path == (to === null || to === void 0 ? void 0 : to.path))) return [3 /*break*/, 1];
                        return [2 /*return*/];
                    case 1:
                        if (!leave) return [3 /*break*/, 3];
                        return [4 /*yield*/, fromRoute.scene.onLeaveScene(ctx)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        to === null || to === void 0 ? void 0 : to.scene.onEnterScene(ctx);
                        return [2 /*return*/];
                    case 4: return [3 /*break*/, 6];
                    case 5: return [2 /*return*/, to === null || to === void 0 ? void 0 : to.scene.onEnterScene(ctx)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Router.prototype.getNext = function (ctx, to) {
        var _a, _b;
        var route = this.findRoute(ctx, to.path) || this.defaultRoute;
        if (!route)
            return to;
        var next = (_b = (_a = route.guard) === null || _a === void 0 ? void 0 : _a.call(route, ctx, this.history.head(ctx), to)) !== null && _b !== void 0 ? _b : to;
        return to != next ? this.getNext(ctx, next) : next;
    };
    Router.prototype.enterLocation = function (ctx, t, replace, pop) {
        if (replace === void 0) { replace = false; }
        if (pop === void 0) { pop = false; }
        return __awaiter(this, void 0, void 0, function () {
            var head, headRoute, to, next, route;
            return __generator(this, function (_a) {
                head = this.history.head(ctx);
                headRoute = this.head(ctx);
                to = t || { path: '/' };
                next = this.getNext(ctx, to);
                route = this.findRoute(ctx, next.path);
                // console.log("===============Enter Location===================");
                // console.log(head);
                // console.log(to);
                // console.log(t);
                // console.log("================================================");
                if (head) {
                    if (head.path == next.path && route) {
                        this.history.updateHeadData(ctx, next.data, !replace);
                        return [2 /*return*/, this.enterRoute(ctx, headRoute, route, replace)];
                    }
                    else {
                        if (pop)
                            this.history.pop(ctx);
                        else
                            this.history.push(ctx, next, replace);
                        return [2 /*return*/, this.enterRoute(ctx, headRoute, route, replace || pop)];
                    }
                }
                else {
                    this.history.push(ctx, next, replace);
                    return [2 /*return*/, this.enterRoute(ctx, null, route, replace)];
                }
                return [2 /*return*/];
            });
        });
    };
    return Router;
}());
exports.default = Router;
//# sourceMappingURL=router.js.map