"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("util");
var Prom;
(function (Prom) {
    /**
     * @description Promisify an asynchronous function in a way differed from `util.promisify`.
     * @param func An asynchronous function whose last parameter is a callback typed (err: ErrorType, ...args) => any.
     * @returns {(...args: any[]) => Promise<any[]>} Promisified function. Will resolve all the arguments in the form of an array.
     */
    function promisify(func) {
        return func[util.promisify.custom] || (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new Promise(function (resolve, reject) {
                func.apply(void 0, __spread(args, [function (err) {
                        var callbackArgs = [];
                        for (var _i = 1; _i < arguments.length; _i++) {
                            callbackArgs[_i - 1] = arguments[_i];
                        }
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(callbackArgs); // Pass all the arguments instead of just the first argument
                        }
                    }]));
            });
        });
    }
    Prom.promisify = promisify;
    /**
     * @description Promisify all (or some of) the functions in `obj`.
     * @param obj Object to promisify.
     * @param candidates Optional. Names of canditate properties. Defaults to `Object.keys(obj)`.
     * @param promisify Optional. Promisify function should be used. Defaults to `Prom.promisify`.
     * @returns {Object} Promisified object.
     */
    function promisifyAll(obj, candidates, promisify) {
        var e_1, _a;
        if (candidates === void 0) { candidates = Object.keys(obj); }
        if (promisify === void 0) { promisify = Prom.promisify; }
        var res = {};
        try {
            for (var candidates_1 = __values(candidates), candidates_1_1 = candidates_1.next(); !candidates_1_1.done; candidates_1_1 = candidates_1.next()) {
                var property = candidates_1_1.value;
                res[property] = (typeof obj[property] == 'function' && !property.endsWith('Sync')) ? promisify(obj[property]) : obj[property];
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (candidates_1_1 && !candidates_1_1.done && (_a = candidates_1.return)) _a.call(candidates_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return res;
    }
    Prom.promisifyAll = promisifyAll;
})(Prom || (Prom = {}));
exports.default = Prom;
try {
    // Object.assign(module.exports, _default)
    for (var key in Prom)
        module.exports[key] = Prom[key];
}
catch (_a) {
}
//# sourceMappingURL=Prom.js.map