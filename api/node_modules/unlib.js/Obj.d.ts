export interface EnhancedObject extends ObjectConstructor {
    getOwnPropertyDescriptors(obj: any): PropertyDescriptorMap;
    getOwnPropertyNamesAndSymbols(obj: any): (string | symbol)[];
    getPropertyNamesAndSymbols(obj: any): (string | symbol)[];
    getPropertyDescriptorsEntries(obj: any): [(string | symbol), PropertyDescriptor][];
    getPropertyDescriptors(obj: any): PropertyDescriptorMap;
    getEnumerablePropertyNamesAndSymbols(obj: any): (string | symbol)[];
    getEnumerablePropertyDescriptorsEntries(obj: any): [(string | symbol), PropertyDescriptor][];
    getEnumerablePropertyDescriptors(obj: any): PropertyDescriptorMap;
    assignAll<T, U>(dst: T, src: U): T & U;
    assignEnumerable<T, U>(dst: T, src: U): T & U;
    assignOwnProperties<T, U>(dst: T, src: U): T & U;
    copy<T>(src: T): T & {};
    copyAll<T>(src: T): T & {};
    copyEnumerable<T>(src: T): T & {};
    copyOwnProperties<T>(src: T): T & {};
    append<T, U>(dst: T, src: U): T & U;
    appendAll<T, U>(dst: T, src: U): T & U;
    appendEnumerable<T, U>(dst: T, src: U): T & U;
    appendOwnProperties<T, U>(dst: T, src: U): T & U;
    update<T, U>(dst: T, src: U): T;
    updateAll<T, U>(dst: T, src: U): T;
    updateEnumerable<T, U>(dst: T, src: U): T;
    updateOwnProperties<T, U>(dst: T, src: U): T;
    prototype: {
        constructor: Function;
        toString(): string;
        toLocaleString(): string;
        valueOf(): Object;
        hasOwnProperty(v: PropertyKey): boolean;
        isPrototypeOf(v: Object): boolean;
        propertyIsEnumerable(v: PropertyKey): boolean;
        append: <T>(src: T) => T & {};
        appendAll: <T>(src: T) => T & {};
        appendEnumerable: <T>(src: T) => T & {};
        appendOwnProperties: <T>(src: T) => T & {};
        update: <T>(src: T) => {};
        updateAll: <T>(src: T) => {};
        updateEnumerable: <T>(src: T) => {};
        updateOwnProperties: <T>(src: T) => {};
    };
    patch(): void;
}
declare namespace EnhancedObject {
    /**
     * @description Same as `Object.getOwnPropertyDescriptors`.
     * @returns {PropertyDescriptorMap}
     */
    const getOwnPropertyDescriptors: (obj: any) => PropertyDescriptorMap;
    /**
     * @description Get own property names and symbols.
     * @param obj Target object.
     * @returns {(string | symbol)[]}
     */
    function getOwnPropertyNamesAndSymbols(obj: any): (string | symbol)[];
    /**
     * @description Get all property names and symbols.
     * Including inherited or non-enumerable properties' names & symbols.
     * @param obj Target object.
     * @returns {(string | symbol)}
     */
    function getPropertyNamesAndSymbols(obj: any): (string | symbol)[];
    /**
     * @description Get all property descriptors entries.
     * Including inherited or non-enumerable properties' descriptors.
     * @param obj Target object.
     * @returns {[(string | symbol), PropertyDescriptor][]}
     */
    function getPropertyDescriptorsEntries(obj: any): [(string | symbol), PropertyDescriptor][];
    /**
     * @description Get all property descriptors.
     * Including inherited or non-enumerable properties' descriptors.
     * @param obj Target object
     * @returns {PropertyDescriptorMap}
     */
    function getPropertyDescriptors(obj: any): PropertyDescriptorMap;
    /**
     * @description Get all enumerable property names and symbols.
     * Including inherited properties' names & symbols.
     * @param obj Target object.
     * @returns {(string | symbol)}
     */
    function getEnumerablePropertyNamesAndSymbols(obj: any): (string | symbol)[];
    /**
     * @description Get all enumerable property descriptors entries.
     * Including inherited properties' descriptors.
     * @param obj Target object.
     * @returns {[(string | symbol), PropertyDescriptor][]}
     */
    function getEnumerablePropertyDescriptorsEntries(obj: any): [(string | symbol), PropertyDescriptor][];
    /**
     * @description Get all enumerable property descriptors.
     * Including inherited properties' descriptors.
     * @param obj Target object
     * @returns {PropertyDescriptorMap}
     */
    function getEnumerablePropertyDescriptors(obj: any): PropertyDescriptorMap;
    /**
     * @description Assign `src`'s all properties to `dst`.
     * Inherited or non-enumerable properties will be assigned.
     * @param dst Destination object.
     * @param src Source object.
     * @returns {T & U} `dst`.
     */
    function assignAll<T, U>(dst: T, src: U): T & U;
    /**
     * @description Assign `src`'s all enumerable properties to `dst`.
     * Inherited properties will be assigned.
     * @param dst Destination object.
     * @param src Source object.
     * @returns {T & U} `dst`.
     */
    function assignEnumerable<T, U>(dst: T, src: U): T & U;
    /**
     * @description Assign all `src`'s own properties to `dst`.
     * Non-enumerable properties will be sssigned.
     * @param dst Destination object.
     * @param src Source object.
     * @returns {T & U} `dst`.
     */
    function assignOwnProperties<T, U>(dst: T, src: U): T & U;
    const assignEnumerableOwnProperties: typeof Object.assign;
    /**
     * @description Copy an object.
     * Only enumerable own properties will be copied.
     * @param src Source object.
     * @returns {T & {}} Copied object.
     */
    function copy<T>(src: T): T & {};
    /**
     * @description Copy an object.
     * Inherited or non-enumerable properties will be copied.
     * @param src Source object.
     * @returns {T & {}} Copied object.
     */
    function copyAll<T>(src: T): T & {};
    /**
     * @description Copy an object.
     * Only enumerable properties will be copied.
     * Inherited properties will be copied.
     * @param src Source object.
     * @returns {T & {}} Copied object.
     */
    function copyEnumerable<T>(src: T): T & {};
    /**
     * @description Copy an object.
     * Only own properties will be copied.
     * Non-enumerable properties will be copied.
     * @param src Source object.
     * @returns {T & {}} Copied object.
     */
    function copyOwnProperties<T>(src: T): T & {};
    const copyEnumerableOwnProperties: typeof copy;
    /**
     * @description Append all enumerable own properties of `src` to `dst`.
     * Own properties of `dst` will be reserved.
     * @param dst Destination object.
     * @param src Source object.
     * @returns {T & U} `dst`.
     */
    function append<T, U>(dst: T, src: U): T & U;
    /**
     * @description Append all properties of `src` to `dst`.
     * Inherited or non-enumerable properties will be appended.
     * Own properties of `dst` will be reserved.
     * @param dst Destination object.
     * @param src Source object.
     * @returns {T & U} `dst`.
     */
    function appendAll<T, U>(dst: T, src: U): T & U;
    /**
     * @description Append all enumerable properties of `src` to `dst`.
     * Inherited properties will be appended.
     * Own properties of `dst` will be reserved.
     * @param dst Destination object.
     * @param src Source object.
     * @returns {T & U} `dst`.
     */
    function appendEnumerable<T, U>(dst: T, src: U): T & U;
    /**
     * @description Append all own properties of `src` to `dst`.
     * Non-enumerable properties will be appended.
     * Own properties of `dst` will be reserved.
     * @param dst Destination object.
     * @param src Source object.
     * @returns {T & U} `dst`.
     */
    function appendOwnProperties<T, U>(dst: T, src: U): T & U;
    /**
     * @description Update `dst` with enumerable own properties of `src`.
     * None-own-properties of `dst` will not be updated.
     * @param dst Destination object.
     * @param src Source object.
     * @returns {T} `dst`.
     */
    function update<T, U>(dst: T, src: U): T;
    /**
     * @description Update `dst` with all properties of `src`.
     * Inherited or non-enumerable will be considered.
     * None-own-properties of `dst` will not be updated.
     * @param dst Destination object.
     * @param src Source object.
     * @returns {T} `dst`.
     */
    function updateAll<T, U>(dst: T, src: U): T;
    /**
     * @description Update `dst` with all enumerable properties of `src`.
     * Inherited properties will be considered.
     * None-own-properties of `dst` will not be updated.
     * @param dst Destination object.
     * @param src Source object.
     * @returns {T} `dst`.
     */
    function updateEnumerable<T, U>(dst: T, src: U): T;
    /**
     * @description Update `dst` with all own properties of `src`.
     * Non-enumerable properties will be considered.
     * None-own-properties of `dst` will not be updated.
     * @param dst Destination object.
     * @param src Source object.
     * @returns {T} `dst`.
     */
    function updateOwnProperties<T, U>(dst: T, src: U): T;
    let prototype: Object;
    /**
     * @description Patch built-in `Object` with `EnhancedObject`.
     */
    function patch(): void;
}
export default EnhancedObject;
