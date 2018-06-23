"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constants;
(function (Constants) {
    /**
     * @description All visible ASCII characters.
     */
    Constants.VISIBLE_ASCII_CHAR = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'; // Generators.charRange('!', '~')
})(Constants || (Constants = {}));
exports.default = Constants;
try {
    // Object.assign(module.exports, _default)
    for (var key in Constants)
        module.exports[key] = Constants[key];
}
catch (_a) {
}
//# sourceMappingURL=Constants.js.map