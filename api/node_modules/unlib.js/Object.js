"use strict";
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
var EnhancedObject;
(function (EnhancedObject) {
    var e_1, _a;
    /**
     * @description Same as `Object.getOwnPropertyDescriptors`.
     * @returns {PropertyDescriptorMap}
     */
    EnhancedObject.getOwnPropertyDescriptors = 'getOwnPropertyDescriptors' in Object ?
        Object.getOwnPropertyDescriptors :
        function (obj) {
            var e_2, _a, e_3, _b;
            var properties = {};
            try {
                for (var _c = __values(Object.getOwnPropertyNames(obj)), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var propertyName = _d.value;
                    properties[propertyName] = Object.getOwnPropertyDescriptor(obj, propertyName);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
            try {
                for (var _e = __values(Object.getOwnPropertySymbols(obj)), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var sym = _f.value;
                    properties[sym] = Object.getOwnPropertyDescriptor(obj, sym);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return properties;
        };
    /**
     * @description Get own property names and symbols.
     * @param obj Target object.
     * @returns {(string | symbol)[]}
     */
    function getOwnPropertyNamesAndSymbols(obj) {
        return __spread(Object.getOwnPropertyNames(obj), Object.getOwnPropertySymbols(obj));
    }
    EnhancedObject.getOwnPropertyNamesAndSymbols = getOwnPropertyNamesAndSymbols;
    /* All properties */
    /**
     * @description Get all property names and symbols.
     * Including inherited or non-enumerable properties' names & symbols.
     * @param obj Target object.
     * @returns {(string | symbol)}
     */
    function getPropertyNamesAndSymbols(obj) {
        var e_4, _a;
        if (!obj)
            return [];
        assert(obj instanceof Object || typeof obj == 'object');
        var names = obj == Object.prototype ? new Set() : new Set(getPropertyNamesAndSymbols(obj.__proto__)); // Get inherited symbols | string
        // Get own symbols | string
        var properties = EnhancedObject.getOwnPropertyDescriptors(obj);
        try {
            for (var _b = __values(getOwnPropertyNamesAndSymbols(properties)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var propertyName = _c.value;
                names.add(propertyName);
                // if(Object.prototype.propertyIsEnumerable.call(obj, propertyName)) {
                //   names.add(propertyName)
                // }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return __spread(names);
    }
    EnhancedObject.getPropertyNamesAndSymbols = getPropertyNamesAndSymbols;
    /**
     * @description Get all property descriptors and names & symbols.
     * Including inherited or non-enumerable properties'.
     * @param obj Target Object.
     * @returns {{ names: Set<string | symbol>; descriptors: PropertyDescriptorMap }}
     */
    function _getPropertyDescriptorsEntries(obj) {
        var e_5, _a;
        if (!obj)
            return { names: new Set(), descriptors: {} };
        assert(obj instanceof Object || typeof obj == 'object');
        var des = obj == Object.prototype ? { names: new Set(), descriptors: {} } : _getPropertyDescriptorsEntries(obj.__proto__); // Get inherited descriptors
        // Get own descriptors
        var properties = EnhancedObject.getOwnPropertyDescriptors(obj);
        try {
            for (var _b = __values(getOwnPropertyNamesAndSymbols(properties)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var propertyName = _c.value;
                des.names.add(propertyName);
                var tmp = des.descriptors;
                tmp[propertyName] = Object.getOwnPropertyDescriptor(obj, propertyName); // Override inherited property
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return des;
    }
    /**
     * @description Get all property descriptors entries.
     * Including inherited or non-enumerable properties' descriptors.
     * @param obj Target object.
     * @returns {[(string | symbol), PropertyDescriptor][]}
     */
    function getPropertyDescriptorsEntries(obj) {
        if (!obj)
            return [];
        assert(obj instanceof Object || typeof obj == 'object');
        var _des = _getPropertyDescriptorsEntries(obj);
        _des.names = __spread(_des.names);
        var des = _des.names.map(function (name) {
            return [name, _des.descriptors[name]];
        });
        return des;
    }
    EnhancedObject.getPropertyDescriptorsEntries = getPropertyDescriptorsEntries;
    /**
     * @description Get all property descriptors.
     * Including inherited or non-enumerable properties' descriptors.
     * @param obj Target object
     * @returns {PropertyDescriptorMap}
     */
    function getPropertyDescriptors(obj) {
        if (!obj)
            return {};
        assert(obj instanceof Object || typeof obj == 'object');
        return _getPropertyDescriptorsEntries(obj).descriptors;
    }
    EnhancedObject.getPropertyDescriptors = getPropertyDescriptors;
    /* All enumerable propertise */
    /**
     * @description Get all enumerable property names and symbols.
     * Including inherited properties' names & symbols.
     * @param obj Target object.
     * @returns {(string | symbol)}
     */
    function getEnumerablePropertyNamesAndSymbols(obj) {
        var e_6, _a;
        if (!obj)
            return [];
        assert(obj instanceof Object || typeof obj == 'object');
        var names = obj == Object.prototype ? new Set() : new Set(getPropertyNamesAndSymbols(obj.__proto__)); // Get inherited symbols | string
        // Get own symbols | string
        var properties = EnhancedObject.getOwnPropertyDescriptors(obj);
        try {
            for (var _b = __values(getOwnPropertyNamesAndSymbols(properties)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var propertyName = _c.value;
                // names.add(propertyName)
                if (Object.prototype.propertyIsEnumerable.call(obj, propertyName)) {
                    names.add(propertyName);
                }
                else {
                    names.delete(propertyName);
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return __spread(names);
    }
    EnhancedObject.getEnumerablePropertyNamesAndSymbols = getEnumerablePropertyNamesAndSymbols;
    /**
     * @description Get all enumerable property descriptors and names & symbols.
     * Including inherited properties'.
     * @param obj Target Object.
     * @returns {{ names: Set<string | symbol>; descriptors: PropertyDescriptorMap }}
     */
    function _getEnumerablePropertyDescriptorsEntries(obj) {
        var e_7, _a;
        if (!obj)
            return { names: new Set(), descriptors: {} };
        assert(obj instanceof Object || typeof obj == 'object');
        var des = obj == Object.prototype ? { names: new Set(), descriptors: {} } : _getEnumerablePropertyDescriptorsEntries(obj.__proto__); // Get inherited descriptors
        // Get own descriptors
        var properties = EnhancedObject.getOwnPropertyDescriptors(obj);
        try {
            for (var _b = __values(getOwnPropertyNamesAndSymbols(properties)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var propertyName = _c.value;
                // des.names.add(propertyName)
                // let tmp: any = des.descriptors
                // tmp[propertyName] = Object.getOwnPropertyDescriptor(obj, propertyName)  // Override inherited property
                if (Object.prototype.propertyIsEnumerable.call(obj, propertyName)) {
                    des.names.add(propertyName);
                    var tmp = des.descriptors;
                    tmp[propertyName] = Object.getOwnPropertyDescriptor(obj, propertyName); // Override inherited property
                }
                else {
                    des.names.delete(propertyName);
                    var tmp = des.descriptors;
                    delete tmp[propertyName];
                }
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return des;
    }
    /**
     * @description Get all enumerable property descriptors entries.
     * Including inherited properties' descriptors.
     * @param obj Target object.
     * @returns {[(string | symbol), PropertyDescriptor][]}
     */
    function getEnumerablePropertyDescriptorsEntries(obj) {
        if (!obj)
            return [];
        assert(obj instanceof Object || typeof obj == 'object');
        var _des = _getEnumerablePropertyDescriptorsEntries(obj);
        _des.names = __spread(_des.names);
        var des = _des.names.map(function (name) {
            return [name, _des.descriptors[name]];
        });
        return des;
    }
    EnhancedObject.getEnumerablePropertyDescriptorsEntries = getEnumerablePropertyDescriptorsEntries;
    /**
     * @description Get all enumerable property descriptors.
     * Including inherited properties' descriptors.
     * @param obj Target object
     * @returns {PropertyDescriptorMap}
     */
    function getEnumerablePropertyDescriptors(obj) {
        if (!obj)
            return {};
        assert(obj instanceof Object || typeof obj == 'object');
        return _getEnumerablePropertyDescriptorsEntries(obj).descriptors;
    }
    EnhancedObject.getEnumerablePropertyDescriptors = getEnumerablePropertyDescriptors;
    /* Assign */
    /**
     * @description Assign `src`'s all properties to `dst`.
     * Inherited or non-enumerable properties will be assigned.
     * @param dst Destination object.
     * @param src Source object.
     * @returns {T & U} `dst`.
     */
    function assignAll(dst, src) {
        if (!src)
            return dst;
        assert(dst instanceof Object || typeof dst == 'object');
        return Object.defineProperties(dst, getPropertyDescriptors(src));
    }
    EnhancedObject.assignAll = assignAll;
    /**
     * @description Assign `src`'s all enumerable properties to `dst`.
     * Inherited properties will be assigned.
     * @param dst Destination object.
     * @param src Source object.
     * @returns {T & U} `dst`.
     */
    function assignEnumerable(dst, src) {
        if (!src)
            return dst;
        assert(dst instanceof Object || typeof dst == 'object');
        return Object.defineProperties(dst, getEnumerablePropertyDescriptors(src));
    }
    EnhancedObject.assignEnumerable = assignEnumerable;
    /**
     * @description Assign all `src`'s own properties to `dst`.
     * Non-enumerable properties will be sssigned.
     * @param dst Destination object.
     * @param src Source object.
     * @returns {T & U} `dst`.
     */
    function assignOwnProperties(dst, src) {
        if (!src)
            return dst;
        assert(dst instanceof Object || typeof dst == 'object');
        return Object.defineProperties(dst, EnhancedObject.getOwnPropertyDescriptors(src));
    }
    EnhancedObject.assignOwnProperties = assignOwnProperties;
    EnhancedObject.assignEnumerableOwnProperties = Object.assign;
    /* Copy */
    /**
     * @description Copy an object.
     * Only enumerable own properties will be copied.
     * @param src Source object.
     * @returns {T & {}} Copied object.
     */
    function copy(src) {
        return Object.assign({}, src);
    }
    EnhancedObject.copy = copy;
    /**
     * @description Copy an object.
     * Inherited or non-enumerable properties will be copied.
     * @param src Source object.
     * @returns {T & {}} Copied object.
     */
    function copyAll(src) {
        return assignAll({}, src);
    }
    EnhancedObject.copyAll = copyAll;
    /**
     * @description Copy an object.
     * Only enumerable properties will be copied.
     * Inherited properties will be copied.
     * @param src Source object.
     * @returns {T & {}} Copied object.
     */
    function copyEnumerable(src) {
        return assignEnumerable({}, src);
    }
    EnhancedObject.copyEnumerable = copyEnumerable;
    /**
     * @description Copy an object.
     * Only own properties will be copied.
     * Non-enumerable properties will be copied.
     * @param src Source object.
     * @returns {T & {}} Copied object.
     */
    function copyOwnProperties(src) {
        return assignOwnProperties({}, src);
    }
    EnhancedObject.copyOwnProperties = copyOwnProperties;
    EnhancedObject.copyEnumerableOwnProperties = copy;
    /* Append */
    /**
     * @description Append all enumerable own properties of `src` to `dst`.
     * Own properties of `dst` will be reserved.
     * @param dst Destination object.
     * @param src Source object.
     * @returns {T & U} `dst`.
     */
    function append(dst, src) {
        var e_8, _a;
        if (!src)
            return dst;
        assert(dst instanceof Object || typeof dst == 'object');
        var dstOwnPropertyNames = getOwnPropertyNamesAndSymbols(dst);
        try {
            for (var _b = __values(getOwnPropertyNamesAndSymbols(src)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var propertyName = _c.value;
                if (!dstOwnPropertyNames.includes(propertyName) && Object.prototype.propertyIsEnumerable.call(src, propertyName))
                    dst[propertyName] = src[propertyName];
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_8) throw e_8.error; }
        }
        return dst;
    }
    EnhancedObject.append = append;
    /**
     * @description Append all properties of `src` to `dst`.
     * Inherited or non-enumerable properties will be appended.
     * Own properties of `dst` will be reserved.
     * @param dst Destination object.
     * @param src Source object.
     * @returns {T & U} `dst`.
     */
    function appendAll(dst, src) {
        var e_9, _a;
        if (!src)
            return dst;
        assert(dst instanceof Object || typeof dst == 'object');
        var dstOwnPropertyNames = getOwnPropertyNamesAndSymbols(dst);
        try {
            for (var _b = __values(getPropertyNamesAndSymbols(src)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var propertyName = _c.value;
                if (!dstOwnPropertyNames.includes(propertyName))
                    dst[propertyName] = src[propertyName];
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_9) throw e_9.error; }
        }
        return dst;
    }
    EnhancedObject.appendAll = appendAll;
    /**
     * @description Append all enumerable properties of `src` to `dst`.
     * Inherited properties will be appended.
     * Own properties of `dst` will be reserved.
     * @param dst Destination object.
     * @param src Source object.
     * @returns {T & U} `dst`.
     */
    function appendEnumerable(dst, src) {
        var e_10, _a;
        if (!src)
            return dst;
        assert(dst instanceof Object || typeof dst == 'object');
        var dstOwnPropertyNames = getOwnPropertyNamesAndSymbols(dst);
        try {
            for (var _b = __values(getEnumerablePropertyNamesAndSymbols(src)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var propertyName = _c.value;
                if (!dstOwnPropertyNames.includes(propertyName))
                    dst[propertyName] = src[propertyName];
            }
        }
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_10) throw e_10.error; }
        }
        return dst;
    }
    EnhancedObject.appendEnumerable = appendEnumerable;
    /**
     * @description Append all own properties of `src` to `dst`.
     * Non-enumerable properties will be appended.
     * Own properties of `dst` will be reserved.
     * @param dst Destination object.
     * @param src Source object.
     * @returns {T & U} `dst`.
     */
    function appendOwnProperties(dst, src) {
        var e_11, _a;
        if (!src)
            return dst;
        assert(dst instanceof Object || typeof dst == 'object');
        var dstOwnPropertyNames = getOwnPropertyNamesAndSymbols(dst);
        try {
            for (var _b = __values(getOwnPropertyNamesAndSymbols(src)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var propertyName = _c.value;
                if (!dstOwnPropertyNames.includes(propertyName))
                    dst[propertyName] = src[propertyName];
            }
        }
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_11) throw e_11.error; }
        }
        return dst;
    }
    EnhancedObject.appendOwnProperties = appendOwnProperties;
    /* Update */
    /**
     * @description Update `dst` with enumerable own properties of `src`.
     * None-own-properties of `dst` will not be updated.
     * @param dst Destination object.
     * @param src Source object.
     * @returns {T} `dst`.
     */
    function update(dst, src) {
        var e_12, _a;
        if (!src)
            return dst;
        assert(dst instanceof Object || typeof dst == 'object');
        var dstOwnPropertyNames = getOwnPropertyNamesAndSymbols(dst);
        try {
            for (var _b = __values(getOwnPropertyNamesAndSymbols(src)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var propertyName = _c.value;
                if (dstOwnPropertyNames.includes(propertyName) && Object.prototype.propertyIsEnumerable.call(src, propertyName))
                    dst[propertyName] = src[propertyName];
            }
        }
        catch (e_12_1) { e_12 = { error: e_12_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_12) throw e_12.error; }
        }
        return dst;
    }
    EnhancedObject.update = update;
    /**
     * @description Update `dst` with all properties of `src`.
     * Inherited or non-enumerable will be considered.
     * None-own-properties of `dst` will not be updated.
     * @param dst Destination object.
     * @param src Source object.
     * @returns {T} `dst`.
     */
    function updateAll(dst, src) {
        var e_13, _a;
        if (!src)
            return dst;
        assert(dst instanceof Object || typeof dst == 'object');
        var dstOwnPropertyNames = getOwnPropertyNamesAndSymbols(dst);
        try {
            for (var _b = __values(getPropertyNamesAndSymbols(src)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var propertyName = _c.value;
                if (dstOwnPropertyNames.includes(propertyName))
                    dst[propertyName] = src[propertyName];
            }
        }
        catch (e_13_1) { e_13 = { error: e_13_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_13) throw e_13.error; }
        }
        return dst;
    }
    EnhancedObject.updateAll = updateAll;
    /**
     * @description Update `dst` with all enumerable properties of `src`.
     * Inherited properties will be considered.
     * None-own-properties of `dst` will not be updated.
     * @param dst Destination object.
     * @param src Source object.
     * @returns {T} `dst`.
     */
    function updateEnumerable(dst, src) {
        var e_14, _a;
        if (!src)
            return dst;
        assert(dst instanceof Object || typeof dst == 'object');
        var dstOwnPropertyNames = getOwnPropertyNamesAndSymbols(dst);
        try {
            for (var _b = __values(getEnumerablePropertyNamesAndSymbols(src)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var propertyName = _c.value;
                if (dstOwnPropertyNames.includes(propertyName))
                    dst[propertyName] = src[propertyName];
            }
        }
        catch (e_14_1) { e_14 = { error: e_14_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_14) throw e_14.error; }
        }
        return dst;
    }
    EnhancedObject.updateEnumerable = updateEnumerable;
    /**
     * @description Update `dst` with all own properties of `src`.
     * Non-enumerable properties will be considered.
     * None-own-properties of `dst` will not be updated.
     * @param dst Destination object.
     * @param src Source object.
     * @returns {T} `dst`.
     */
    function updateOwnProperties(dst, src) {
        var e_15, _a;
        if (!src)
            return dst;
        assert(dst instanceof Object || typeof dst == 'object');
        var dstOwnPropertyNames = getOwnPropertyNamesAndSymbols(dst);
        try {
            for (var _b = __values(getOwnPropertyNamesAndSymbols(src)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var propertyName = _c.value;
                if (dstOwnPropertyNames.includes(propertyName))
                    dst[propertyName] = src[propertyName];
            }
        }
        catch (e_15_1) { e_15 = { error: e_15_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_15) throw e_15.error; }
        }
        return dst;
    }
    EnhancedObject.updateOwnProperties = updateOwnProperties;
    // interface prototype {
    //   append: <T>(src: T) => T & {}
    //   appendAll: <T>(src: T) => T & {}
    //   appendEnumerable: <T>(src: T) => T & {}
    //   appendOwnProperties: <T>(src: T) => T & {}
    //   update: <T>(src: T) => {}
    //   updateAll: <T>(src: T) => {}
    //   updateEnumerable: <T>(src: T) => {}
    //   updateOwnProperties: <T>(src: T) => {}
    // }
    var proto = (function () {
        var proto = {};
        var _loop_1 = function (name) {
            if (name.startsWith('append') || name.startsWith('update')) {
                Object.defineProperty(proto, name, {
                    value: function (src) {
                        return EnhancedObject[name](this, src);
                    },
                    writable: true,
                    enumerable: false,
                    configurable: true
                });
            }
        };
        for (var name in EnhancedObject) {
            _loop_1(name);
        }
        return proto;
    })();
    var protoList = (function () {
        var proto = [];
        for (var name in EnhancedObject) {
            if (name.startsWith('append') || name.startsWith('update')) {
                proto.push(name);
            }
        }
        return proto;
    })();
    EnhancedObject.prototype = appendOwnProperties(proto, Object.prototype);
    Object.defineProperty(EnhancedObject, 'prototype', { value: EnhancedObject.prototype, writable: true, enumerable: false, configurable: true });
    try {
        for (var _b = __values(getOwnPropertyNamesAndSymbols(EnhancedObject.prototype)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var proto_1 = _c.value;
            Object.defineProperty(EnhancedObject.prototype, proto_1, { value: EnhancedObject.prototype[proto_1], writable: true, enumerable: false, configurable: true });
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    /**
     * @description Patch built-in `Object` with `EnhancedObject`.
     */
    function patch() {
        var e_16, _a;
        append(Object, EnhancedObject);
        try {
            for (var protoList_1 = __values(protoList), protoList_1_1 = protoList_1.next(); !protoList_1_1.done; protoList_1_1 = protoList_1.next()) {
                var name = protoList_1_1.value;
                Object.defineProperty(Object.prototype, name, {
                    value: EnhancedObject.prototype[name],
                    writable: true,
                    enumerable: false,
                    configurable: true
                });
            }
        }
        catch (e_16_1) { e_16 = { error: e_16_1 }; }
        finally {
            try {
                if (protoList_1_1 && !protoList_1_1.done && (_a = protoList_1.return)) _a.call(protoList_1);
            }
            finally { if (e_16) throw e_16.error; }
        }
    }
    EnhancedObject.patch = patch;
})(EnhancedObject || (EnhancedObject = {}));
EnhancedObject.appendOwnProperties(EnhancedObject, Object);
exports.default = EnhancedObject;
try {
    for (var key in EnhancedObject)
        module.exports[key] = EnhancedObject[key];
}
catch (_a) {
}
//# sourceMappingURL=Object.js.map