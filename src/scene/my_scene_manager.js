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
exports.MySceneManager = exports.SESSION_KEY = void 0;
exports.SESSION_KEY = 'step_scene_session';
var MySceneManager = /** @class */ (function () {
    function MySceneManager(scenes) {
        this.scenes = scenes;
    }
    Object.defineProperty(MySceneManager, "instance", {
        get: function () {
            if (!this._instance)
                throw "Scene Manager not initialized";
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    MySceneManager.init = function (scenes) {
        this._instance = new MySceneManager(scenes);
    };
    MySceneManager.getSession = function (ctx) {
        var session = ctx['session'];
        if (!session[exports.SESSION_KEY])
            session[exports.SESSION_KEY] = {};
        return session[exports.SESSION_KEY];
    };
    MySceneManager.prototype.middleware = function () {
        var _this = this;
        return function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
            var session, scene, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        session = MySceneManager.getSession(ctx);
                        if (!session['currentSceneId']) return [3 /*break*/, 2];
                        scene = this.scenes[session['currentSceneId']];
                        return [4 /*yield*/, scene.handle(ctx)];
                    case 1:
                        result = _a.sent();
                        if (result)
                            return [2 /*return*/, true];
                        _a.label = 2;
                    case 2: return [2 /*return*/, next()];
                }
            });
        }); };
    };
    MySceneManager.prototype.getCurrentScene = function (ctx) {
        var session = MySceneManager.getSession(ctx);
        if (session['currentSceneId']) {
            return this.scenes[session['currentSceneId']];
        }
        return null;
    };
    MySceneManager.prototype.enterScene = function (ctx, sceneId, data) {
        if (data === void 0) { data = {}; }
        var scene = this.scenes[sceneId];
        if (scene) {
            ctx['session'][exports.SESSION_KEY] = __assign({ currentSceneId: sceneId }, data);
            return scene.onEnterScene(ctx);
        }
        throw "Scene of id \"" + sceneId + "\" not found";
    };
    MySceneManager.prototype.leaveScene = function (ctx) {
        var _a;
        (_a = this.getCurrentScene(ctx)) === null || _a === void 0 ? void 0 : _a.onLeaveScene(ctx);
        ctx['session'][exports.SESSION_KEY] = {};
    };
    return MySceneManager;
}());
exports.MySceneManager = MySceneManager;
//# sourceMappingURL=my_scene_manager.js.map