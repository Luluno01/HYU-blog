"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Timer_1 = require("./Timer");
var sleep_1 = require("./sleep");
var Time = {
    Timer: Timer_1.Timer,
    sleep: sleep_1.sleep
};
exports.default = Time;
try {
    for (var key in Time)
        module.exports[key] = Time[key];
}
catch (_a) {
}
//# sourceMappingURL=index.js.map