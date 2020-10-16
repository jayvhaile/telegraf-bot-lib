"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionUtils = exports.unwrapList = exports.unwrap = exports.groupWith = exports.group = exports.mapDeep = exports.flatArray = void 0;
function flatArray(array) {
    var result = [];
    array.forEach(function (element) {
        if (element.forEach) {
            // @ts-ignore
            result.push.apply(result, flatArray(element));
        }
        else {
            result.push(element);
        }
    });
    return result;
}
exports.flatArray = flatArray;
function mapDeep(array, mapper) {
    var result = [];
    array.forEach(function (element) {
        if (element.forEach) {
            result.push(mapDeep(element, mapper));
        }
        else {
            result.push(mapper(element));
        }
    });
    return result;
}
exports.mapDeep = mapDeep;
function group(input, take) {
    if (take === void 0) { take = 2; }
    var result = [];
    for (var i = 0; i < input.length; i += take) {
        result.push(input.slice(i, i + take));
    }
    return result;
}
exports.group = group;
function groupWith(input, takes) {
    var result = [];
    for (var index = 0, cumulative = 0; cumulative < input.length; index++) {
        var take = takes[index % takes.length];
        result.push(input.slice(cumulative, cumulative += take));
    }
    return result;
}
exports.groupWith = groupWith;
function unwrap(wrapped, ctx) {
    if (!wrapped)
        return null;
    if (typeof wrapped == 'function') {
        return wrapped(ctx);
    }
    return wrapped;
}
exports.unwrap = unwrap;
function unwrapList(wrapped, ctx) {
    return wrapped.map(function (w) { return unwrap(w, ctx); });
}
exports.unwrapList = unwrapList;
var SessionUtils = /** @class */ (function () {
    function SessionUtils() {
    }
    SessionUtils.set = function (ctx, path, data) {
        var schema = ctx['session'];
        var pList = path.split('.');
        var len = pList.length;
        for (var i = 0; i < len - 1; i++) {
            var elem = pList[i];
            if (!schema[elem])
                schema[elem] = {};
            schema = schema[elem];
        }
        schema[pList[len - 1]] = data;
        return schema;
    };
    SessionUtils.get = function (ctx, path) {
        if (path === void 0) { path = ''; }
        var result = ctx['session'];
        if (!path || !path.length)
            return result;
        var split = path.split('.');
        for (var i = 0; i < split.length; i++) {
            result = result === null || result === void 0 ? void 0 : result[split[i]];
        }
        return result;
    };
    return SessionUtils;
}());
exports.SessionUtils = SessionUtils;
//# sourceMappingURL=utils.js.map