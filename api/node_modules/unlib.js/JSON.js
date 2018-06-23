"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var fs_1 = require("./fs");
var EnhancedJSON = (_a = {},
    _a[Symbol.toStringTag] = 'JSON',
    _a.parse = JSON.parse,
    _a.stringify = JSON.stringify,
    _a.load = fs_1.default.loadJSON,
    _a.dump = fs_1.default.dumpJSON,
    _a);
Object.defineProperty(EnhancedJSON, Symbol.toStringTag, __assign({}, Object.getOwnPropertyDescriptor(JSON, Symbol.toStringTag), { value: 'EnhancedJSON' }));
exports.default = EnhancedJSON;
//# sourceMappingURL=JSON.js.map