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
exports.MyDocumentBody = exports.MyAudioBody = exports.MyVoiceBody = exports.MyVideoBody = exports.MyPhotoBody = exports.MyMediaBody = void 0;
var my_text_body_1 = require("./my_text_body");
var utils_1 = require("../../utils");
var MyBody = /** @class */ (function () {
    function MyBody() {
    }
    MyBody.from = function (param) {
        return MyMediaBody.from(param) || MyBody.text(param.text);
    };
    MyBody.text = function (text) {
        return new my_text_body_1.MyTextBody(text);
    };
    MyBody.photo = function (file) {
        return new MyPhotoBody(file);
    };
    MyBody.video = function (file) {
        return new MyVideoBody(file);
    };
    MyBody.audio = function (file) {
        return new MyAudioBody(file);
    };
    MyBody.voice = function (file) {
        return new MyVoiceBody(file);
    };
    MyBody.document = function (file) {
        return new MyDocumentBody(file);
    };
    return MyBody;
}());
exports.default = MyBody;
var MyMediaBody = /** @class */ (function (_super) {
    __extends(MyMediaBody, _super);
    function MyMediaBody() {
        return _super.call(this) || this;
    }
    MyMediaBody.prototype.edit = function (ctx, messageId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = ctx).editMessageMedia;
                        return [4 /*yield*/, utils_1.unwrap(this.file, ctx)];
                    case 1: 
                    // @ts-ignore
                    return [2 /*return*/, _b.apply(_a, [_c.sent(), extra])];
                }
            });
        });
    };
    MyMediaBody.prototype.editIn = function (ctx, messageId, chatId) {
        return null;
    };
    MyMediaBody.from = function (param) {
        if (param.fileId && param.type)
            switch (param.type) {
                case "audio":
                    return MyBody.audio(param.fileId);
                case "document":
                    return MyBody.document(param.fileId);
                case "photo":
                    return MyBody.photo(param.fileId);
                case "video":
                    return MyBody.video(param.fileId);
                case "voice":
                    return MyBody.voice(param.fileId);
            }
        return null;
    };
    return MyMediaBody;
}(MyBody));
exports.MyMediaBody = MyMediaBody;
var MyPhotoBody = /** @class */ (function (_super) {
    __extends(MyPhotoBody, _super);
    function MyPhotoBody(file) {
        var _this = _super.call(this) || this;
        _this.file = file;
        return _this;
    }
    MyPhotoBody.prototype.reply = function (ctx, extra) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = ctx).replyWithPhoto;
                        return [4 /*yield*/, utils_1.unwrap(this.file, ctx)];
                    case 1: 
                    // @ts-ignore
                    return [2 /*return*/, _b.apply(_a, [_c.sent(), extra])];
                }
            });
        });
    };
    MyPhotoBody.prototype.send = function (ctx, chatId, extra) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = ctx.telegram).sendPhoto;
                        _c = [chatId];
                        return [4 /*yield*/, utils_1.unwrap(this.file, ctx)];
                    case 1: 
                    // @ts-ignore
                    return [2 /*return*/, _b.apply(_a, _c.concat([_d.sent(), extra]))];
                }
            });
        });
    };
    return MyPhotoBody;
}(MyMediaBody));
exports.MyPhotoBody = MyPhotoBody;
var MyVideoBody = /** @class */ (function (_super) {
    __extends(MyVideoBody, _super);
    function MyVideoBody(file) {
        var _this = _super.call(this) || this;
        _this.file = file;
        return _this;
    }
    MyVideoBody.prototype.reply = function (ctx, extra) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = ctx).replyWithVideo;
                        return [4 /*yield*/, utils_1.unwrap(this.file, ctx)];
                    case 1: 
                    // @ts-ignore
                    return [2 /*return*/, _b.apply(_a, [_c.sent(), extra])];
                }
            });
        });
    };
    MyVideoBody.prototype.send = function (ctx, chatId, extra) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = ctx.telegram).sendVideo;
                        _c = [chatId];
                        return [4 /*yield*/, utils_1.unwrap(this.file, ctx)];
                    case 1: 
                    // @ts-ignore
                    return [2 /*return*/, _b.apply(_a, _c.concat([_d.sent(), extra]))];
                }
            });
        });
    };
    return MyVideoBody;
}(MyMediaBody));
exports.MyVideoBody = MyVideoBody;
var MyVoiceBody = /** @class */ (function (_super) {
    __extends(MyVoiceBody, _super);
    function MyVoiceBody(file) {
        var _this = _super.call(this) || this;
        _this.file = file;
        return _this;
    }
    MyVoiceBody.prototype.reply = function (ctx, extra) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = ctx).replyWithVoice;
                        return [4 /*yield*/, utils_1.unwrap(this.file, ctx)];
                    case 1: 
                    // @ts-ignore
                    return [2 /*return*/, _b.apply(_a, [_c.sent(), extra])];
                }
            });
        });
    };
    MyVoiceBody.prototype.send = function (ctx, chatId, extra) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = ctx.telegram).sendVoice;
                        _c = [chatId];
                        return [4 /*yield*/, utils_1.unwrap(this.file, ctx)];
                    case 1: 
                    // @ts-ignore
                    return [2 /*return*/, _b.apply(_a, _c.concat([_d.sent(), extra]))];
                }
            });
        });
    };
    return MyVoiceBody;
}(MyMediaBody));
exports.MyVoiceBody = MyVoiceBody;
var MyAudioBody = /** @class */ (function (_super) {
    __extends(MyAudioBody, _super);
    function MyAudioBody(file) {
        var _this = _super.call(this) || this;
        _this.file = file;
        return _this;
    }
    MyAudioBody.prototype.reply = function (ctx, extra) {
        // @ts-ignore
        return ctx.replyWithAudio(utils_1.unwrap(this.file, ctx), extra);
    };
    MyAudioBody.prototype.send = function (ctx, chatId, extra) {
        // @ts-ignore
        return ctx.telegram.sendAudio(chatId, utils_1.unwrap(this.file, ctx), extra);
    };
    return MyAudioBody;
}(MyMediaBody));
exports.MyAudioBody = MyAudioBody;
var MyDocumentBody = /** @class */ (function (_super) {
    __extends(MyDocumentBody, _super);
    function MyDocumentBody(file) {
        var _this = _super.call(this) || this;
        _this.file = file;
        return _this;
    }
    MyDocumentBody.prototype.reply = function (ctx, extra) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = ctx).replyWithDocument;
                        return [4 /*yield*/, utils_1.unwrap(this.file, ctx)];
                    case 1: 
                    // @ts-ignore
                    return [2 /*return*/, _b.apply(_a, [_c.sent(), extra])];
                }
            });
        });
    };
    MyDocumentBody.prototype.send = function (ctx, chatId, extra) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = ctx.telegram).sendDocument;
                        _c = [chatId];
                        return [4 /*yield*/, utils_1.unwrap(this.file, ctx)];
                    case 1: 
                    // @ts-ignore
                    return [2 /*return*/, _b.apply(_a, _c.concat([_d.sent(), extra]))];
                }
            });
        });
    };
    return MyDocumentBody;
}(MyMediaBody));
exports.MyDocumentBody = MyDocumentBody;
//# sourceMappingURL=my_body.js.map