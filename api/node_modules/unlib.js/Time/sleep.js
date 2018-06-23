"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description Promise version of `setTimeout`.
 * @param delay The time in milliseconds.
 * @param args Additional parameters which will be passed through to `resolve`.
 */
function sleep(delay) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, delay, args);
    });
}
exports.sleep = sleep;
//# sourceMappingURL=sleep.js.map