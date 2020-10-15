"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeCall = exports.unwrapList = exports.unwrap = exports.groupWith = exports.group = exports.mapDeep = exports.flatArray = void 0;
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
function safeCall() {
}
exports.safeCall = safeCall;
//# sourceMappingURL=utils.js.map