declare namespace Binary {
    /**
     * @description Left rotate `num` for `times` times.
     * @param size Size of `num` in bits
     * @param num The integer to rotate.
     * @param times Rotation times. Defaults to 1.
     * @returns {number} Left rotated `num`.
     */
    function lr(num: number, size: number, times?: number): number;
    /**
     * @description Right rotate `num` for `times` times.
     * @param size Size of `num` in bits
     * @param num The integer to rotate.
     * @param times Rotation times. Defaults to 1.
     * @returns {number} Right rotated `num`.
     */
    function rr(num: number, size: number, times?: number): number;
    /**
     * @description Small-sized binary class with some helpful utilities.
     */
    class Binary {
        private value;
        private _size;
        private mask;
        /**
         * @description Constructor of `Binary`.
         * @param value True value of the `Binary` object (unsigned).
         * @param size Size of this `Binary` object in bits. No larger than the size of `number`.
         */
        constructor(value: number | Binary, size?: number);
        /**
         * @description Size of this `Binary` object in bits.
         */
        /**
        * @description Resize this `Binary` object (in bits). This setter is equivalent to "unsigned extension".
        */
        size: number;
        /**
         * @description Resize this `Binary` object (in bits). Equivalent to "signed extension" (if it's an extension).
         * @param newSize New size.
         * @returns {Binary} This object.
         */
        resize(newSize: number): Binary;
        /**
         * @description Left rotate the value of this `Binary` object.
         * @param times Rotation times. Defaults to 1.
         * @returns {Binary} This object.
         */
        lr(times?: number): Binary;
        /**
         * @description Left rotate the value of this `Binary` object without modifying current object.
         * @param times Rotation times. Defaults to 1.
         * @returns {Binary} Left rotated value in a new object.
         */
        lrn(times?: number): Binary;
        /**
         * @description Right rotate the value of this `Binary` object.
         * @param times Rotation times. Defaults to 1.
         * @returns {Binary} This object.
         */
        rr(times?: number): Binary;
        /**
         * @description Right rotate the value of this `Binary` object without modifying current object.
         * @param times Rotation times. Defaults to 1.
         * @returns {Binary} Right rotated value in a new object.
         */
        rrn(times?: number): Binary;
        /**
         * @description Add `num` to this `Binary` object.
         * @param num Number to add up.
         * @returns {Binary} This object.
         */
        add(num: number | Binary): Binary;
        /**
         * @description Add `num` and this `Binary` object up without modifying current object.
         * @param num Number to add up.
         * @returns {Binary} Sum in a new object.
         */
        addn(num: number | Binary): Binary;
        /**
         * @description Substract `num` from this `Binary` object.
         * @param num Number to subtract.
         * @returns {Binary} This object.
         */
        sub(num: number | Binary): Binary;
        /**
         * @description Substract `num` from this `Binary` object without modifying current object.
         * @param num Number to subtract.
         * @returns {Binary} Difference in a new object.
         */
        subn(num: number | Binary): Binary;
        /**
         * @description Complement of this `Binary` object.
         * @returns {Binary} This object.
         */
        complement(): Binary;
        /**
         * @description Get the complement of this `Binary` object without modifying current object.
         * @returns {Binary} Complement of this `Binary` object in a new object.
         */
        complementn(): Binary;
        /**
         * @description Simply return the value of this `Binary` object.
         * @returns {number} Value of this `Binary` object.
         */
        valueOf(): number;
        /**
         * @description Simply redirect the call of `toString` to the value of this `Binary` object.
         * @returns {stirng}
         */
        toString(...args: any[]): string;
    }
}
export default Binary;
