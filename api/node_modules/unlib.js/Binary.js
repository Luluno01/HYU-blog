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
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var Binary;
(function (Binary_1) {
    /**
     * @description Left rotate `num` for `times` times.
     * @param size Size of `num` in bits
     * @param num The integer to rotate.
     * @param times Rotation times. Defaults to 1.
     * @returns {number} Left rotated `num`.
     */
    function lr(num, size, times) {
        if (times === void 0) { times = 1; }
        assert(size > 0);
        var max = 1 << size;
        assert(num < max);
        for (var i = 0; i < times; i++) {
            num = num << 1;
            num = (num & (max - 1)) + (Math.floor(num / max) && 1);
        }
        return num;
    }
    Binary_1.lr = lr;
    /**
     * @description Right rotate `num` for `times` times.
     * @param size Size of `num` in bits
     * @param num The integer to rotate.
     * @param times Rotation times. Defaults to 1.
     * @returns {number} Right rotated `num`.
     */
    function rr(num, size, times) {
        if (times === void 0) { times = 1; }
        assert(size > 0);
        var max = 1 << size;
        assert(num < max);
        for (var i = 0; i < times; i++) {
            num = (num >> 1) + ((num & 1) << (size - 1));
        }
        return num;
    }
    Binary_1.rr = rr;
    /**
     * @description Small-sized binary class with some helpful utilities.
     */
    var Binary = /** @class */ (function () {
        /**
         * @description Constructor of `Binary`.
         * @param value True value of the `Binary` object (unsigned).
         * @param size Size of this `Binary` object in bits. No larger than the size of `number`.
         */
        function Binary(value, size) {
            if (size === void 0) { size = 8; }
            this.value = 0;
            this._size = 8; // One byte
            this.mask = 255;
            assert(size > 0);
            assert(value >= 0);
            this.mask = (1 << size) - 1;
            if (typeof value == 'number') {
                this.value = (Math.floor(value || 0) & this.mask);
                this._size = size;
            }
            else {
                this.value = value.valueOf();
                this._size = value.size;
            }
        }
        Object.defineProperty(Binary.prototype, "size", {
            /**
             * @description Size of this `Binary` object in bits.
             */
            get: function () {
                return this._size;
            },
            /**
             * @description Resize this `Binary` object (in bits). This setter is equivalent to "unsigned extension".
             */
            set: function (newSize) {
                assert(newSize > 0);
                this._size = newSize;
                this.mask = (1 << newSize) - 1;
                this.value &= this.mask;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @description Resize this `Binary` object (in bits). Equivalent to "signed extension" (if it's an extension).
         * @param newSize New size.
         * @returns {Binary} This object.
         */
        Binary.prototype.resize = function (newSize) {
            assert(newSize > 0);
            var indexBit = 1 << (this._size - 1); // Sign bit
            var sign = this.value & indexBit;
            this.mask = 1 << newSize;
            this.value &= this.mask;
            indexBit = 1 << this._size;
            if (sign) {
                for (var i = this._size; i < newSize; i++) {
                    this.value += indexBit;
                    indexBit = indexBit << 1;
                }
            }
            this._size = newSize;
            return this;
        };
        /**
         * @description Left rotate the value of this `Binary` object.
         * @param times Rotation times. Defaults to 1.
         * @returns {Binary} This object.
         */
        Binary.prototype.lr = function (times) {
            if (times === void 0) { times = 1; }
            this.value = lr(this.value, this._size, times);
            return this;
        };
        /**
         * @description Left rotate the value of this `Binary` object without modifying current object.
         * @param times Rotation times. Defaults to 1.
         * @returns {Binary} Left rotated value in a new object.
         */
        Binary.prototype.lrn = function (times) {
            if (times === void 0) { times = 1; }
            return new Binary(lr(this.value, this._size, times), this._size);
        };
        /**
         * @description Right rotate the value of this `Binary` object.
         * @param times Rotation times. Defaults to 1.
         * @returns {Binary} This object.
         */
        Binary.prototype.rr = function (times) {
            if (times === void 0) { times = 1; }
            this.value = rr(this.value, this._size, times);
            return this;
        };
        /**
         * @description Right rotate the value of this `Binary` object without modifying current object.
         * @param times Rotation times. Defaults to 1.
         * @returns {Binary} Right rotated value in a new object.
         */
        Binary.prototype.rrn = function (times) {
            if (times === void 0) { times = 1; }
            return new Binary(rr(this.value, this._size, times), this._size);
        };
        /**
         * @description Add `num` to this `Binary` object.
         * @param num Number to add up.
         * @returns {Binary} This object.
         */
        Binary.prototype.add = function (num) {
            this.value += num.valueOf();
            if (typeof num == 'number') {
                this.value &= this.mask;
            }
            else {
                this.size = this._size > num.size ? this._size : num.size;
            }
            return this;
        };
        /**
         * @description Add `num` and this `Binary` object up without modifying current object.
         * @param num Number to add up.
         * @returns {Binary} Sum in a new object.
         */
        Binary.prototype.addn = function (num) {
            if (typeof num == 'number')
                return new Binary(this.value + num.valueOf(), this._size);
            else
                return (new Binary(this)).add(num);
        };
        /**
         * @description Substract `num` from this `Binary` object.
         * @param num Number to subtract.
         * @returns {Binary} This object.
         */
        Binary.prototype.sub = function (num) {
            if (typeof num == 'number') {
                this.add((new Binary(num, this._size)).complement());
            }
            else {
                if (this._size > num.size) {
                    num = (new Binary(num));
                    num.size = this._size;
                    this.add(num.complement());
                }
                else {
                    this.size = num.size;
                    this.add(num.complementn());
                }
            }
            return this;
        };
        /**
         * @description Substract `num` from this `Binary` object without modifying current object.
         * @param num Number to subtract.
         * @returns {Binary} Difference in a new object.
         */
        Binary.prototype.subn = function (num) {
            if (typeof num == 'number')
                return (new Binary(this)).sub(new Binary(num, this._size));
            else
                return (new Binary(this)).sub(num);
        };
        /**
         * @description Complement of this `Binary` object.
         * @returns {Binary} This object.
         */
        Binary.prototype.complement = function () {
            this.value ^= this.mask;
            this.add(1);
            return this;
        };
        /**
         * @description Get the complement of this `Binary` object without modifying current object.
         * @returns {Binary} Complement of this `Binary` object in a new object.
         */
        Binary.prototype.complementn = function () {
            return new Binary((this.value ^ this.mask) + 1, this._size);
        };
        /**
         * @description Simply return the value of this `Binary` object.
         * @returns {number} Value of this `Binary` object.
         */
        Binary.prototype.valueOf = function () {
            return this.value;
        };
        /**
         * @description Simply redirect the call of `toString` to the value of this `Binary` object.
         * @returns {stirng}
         */
        Binary.prototype.toString = function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return (_a = this.value).toString.apply(_a, __spread(args));
        };
        return Binary;
    }());
    Binary_1.Binary = Binary;
})(Binary || (Binary = {}));
exports.default = Binary;
try {
    // Object.assign(module.exports, _default)
    for (var key in Binary)
        module.exports[key] = Binary[key];
}
catch (_a) {
}
//# sourceMappingURL=Binary.js.map