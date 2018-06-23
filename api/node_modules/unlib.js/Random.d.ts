declare namespace Random {
    /**
     * @description Same as `Math random`.
     * @returns {number} Same as `Math.random`.
     */
    const rand: () => number;
    /**
     * @description Generate a **floating-point** number randomly ranged [`a`, `b`), or [0, `a`) if `b` is undefined.
     * @param a The lower bound of the generated number.
     * @param b Optional. The upper bound of the generated number. If undefined, the range would be [0, a).
     * @returns {number} Generated floating-point number.
     */
    function random(a: number, b?: number): number;
    /**
     * @description Generate an **integer** randomly ranged [`a`, `b`), or [0, `a`) if `b` is undefined.
     * @param a The lower bound of the generated number.
     * @param b Optional. The upper bound of the generated number. If undefined, the range would be [0, a).
     * @returns {number} Generated integer.
     */
    function randint(a: number, b?: number): number;
    /**
     * @description Perform a sampling.
     * @param arr The population to sample.
     * @param count The expected number of samples.
     * @param protect Optional. Defaults to `false`. Whether to protect `arr` during sampling. If false, `arr.splice` will be used.
     * @returns {Array<T>} An array of resulted samples.
     */
    function sample<T>(arr: Array<T>, count: number, protect?: boolean): Array<T>;
    /**
     * @description Shuffle the items in the array given.
     * @param arr The array with items to shuffle.
     * @param protect Optional. Defaults to false. Whether to protect `arr` during shuffle.
     * @returns {Array<T>} The array that has been shuffled.
     */
    function shuffle<T>(arr: Array<T>, protect?: boolean): Array<T>;
    /**
     * @description Generate a random sequence whose items are chosen from `arr`.
     * @param arr An array of candidates or a generator.
     * @param length The length of generated sequence.
     * @returns {Array<T>} Generated sequence.
     */
    function randSeq<T>(arr: ArrayLike<T> | IterableIterator<T>, length: number): Array<T>;
    namespace Election {
        /**
         * @description Generate a random string whose characters are chosen from `arr`.
         * @param arr A candidate string or an array of candidates string or a generator.
         * @param length The length of generated string.
         * @returns {string} Generated string.
         */
        function randStr(arr: ArrayLike<string> | IterableIterator<string>, length: number): string;
        interface Candidate extends Object {
            votes: number;
        }
        class Candidate implements Candidate {
            votes: number;
            value?: any;
            constructor(candidate: Candidate | any, copy?: boolean);
            /**
             * @description Create a new candidates array from `candidates`.
             * @param candidates Original array.
             */
            static fromArray<T>(candidates: Array<Candidate> | Iterable<T>): Array<Candidate>;
        }
        interface ElectResult {
            winner: Candidate;
            candidates: Array<Candidate>;
            records: Array<number>;
        }
        /**
         * @description A useless function that simulates a single vote.
         * @param candidates Candidates to vote for.
         * @returns The index of candidate being voted.
         */
        function vote(candidates: Array<Candidate>): number;
        /**
         * @description A useless function that simulates a race election.
         * @param candidates Candidates for the race election.
         * @param maxVotes Max votes to win.
         */
        function race<T>(candidates: Array<Candidate> | Iterable<T>, maxVotes: number): ElectResult;
        /**
         * @description Yet another useless function that simulates an election.
         * @param candidates Candidates for the election.
         * @param voters The number of voters.
         */
        function elect<T>(candidates: Array<Candidate> | Iterable<T>, voters: number): ElectResult;
    }
}
export default Random;
