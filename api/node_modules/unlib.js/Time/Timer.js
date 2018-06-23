"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Timer = /** @class */ (function () {
    /**
     * @description Constructor of `Timer`.
     * @param callback Callback function.
     * @param interval Timer interval.
     * @param maxDuration Max timer running time in milliseconds. Timer stops when max duration exceeded. 0 or undefined leads to an infinite timer.
     */
    function Timer(callback, interval, maxDuration) {
        var _this = this;
        this._callback = function () {
            if (_this.duration && Date.now() - _this.startTime > _this.duration) {
                _this.duration = -1;
                if (_this._onStop) {
                    _this._onStop(new Date());
                }
                clearInterval(_this.int);
                _this.int = null;
                return;
            }
            _this.callback(new Date());
        };
        if (interval < 0) {
            throw new RangeError('Invalid interval. Expected a non-negative number');
        }
        this.interval = interval;
        this.duration = maxDuration || 0;
        this.startTime = -1;
        this.pauseTime = -1;
        this.int = null;
        this.callback = callback;
        return this;
    }
    /**
     * @description Start the timer.
     * @returns {Timer} This object.
     */
    Timer.prototype.start = function () {
        if (this.int)
            return this; // Already started
        this.startTime = Date.now();
        this.pauseTime = -1;
        this.int = setInterval(this._callback, this.interval);
        return this;
    };
    /**
     * @description Pause the timer.
     * @returns {Timer} this object.
     */
    Timer.prototype.pause = function () {
        if (!this.int)
            return;
        clearInterval(this.int);
        this.int = null;
        this.pauseTime = Date.now();
        this.duration = this.startTime + this.duration - this.pauseTime; // Remaining time
        return this;
    };
    Object.defineProperty(Timer.prototype, "onStop", {
        /**
         * @description Get `onStop` handler.
         * @returns {(time?: Date, ...args) => any | null} A handler function will be called when the timer stops.
         */
        get: function () {
            return this._onStop;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @description Stop the timer.
     * @returns {number} The remaining duration in milliseconds.
     */
    Timer.prototype.stop = function () {
        if (!this.int)
            return;
        clearInterval(this.int);
        this.int = null;
        if (this.pauseTime > 0) { // Pause -> stop
            this.duration = this.pauseTime - this.startTime;
        }
        else {
            this.duration = this.duration - (Date.now() - this.startTime);
        }
        this.pauseTime = -1;
        this.startTime = -1;
        if (this._onStop) {
            this._onStop((new Date()));
        }
        return this.duration; // Remaining time
    };
    /**
     * @description Attach handlers to the timer for specific event.
     * @param event The event to listen to.
     * @param callback The handler function for the event `event`.
     */
    Timer.prototype.on = function (event, callback) {
        switch (event) {
            case 'stop': {
                this._onStop = callback;
                break;
            }
            default: return this;
        }
        return this;
    };
    return Timer;
}());
exports.Timer = Timer;
//# sourceMappingURL=Timer.js.map