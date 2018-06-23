import Random from './Random';
declare namespace Generators {
    /**
     * @description A generator that generates a sequence ranged [`a`, `b`) at a pace of `step` per step.
     * @param a The lower bound.
     * @param b Optional. The upper bound. If not set, the range would be [0, `a`).
     * @param step Optional. Defaults to 1. Step.
     */
    function range(a: number, b?: number, step?: number): IterableIterator<number>;
    /**
     * @description A generator that generates a characters sequence ranged [`a`, `b`] at a pace of `step` per step.
     * @param a The lower bound.
     * @param b The upper bound.
     * @param step Optional. Defaults to 1. Step.
     */
    function charRange(a: string, b: string, step?: number): IterableIterator<string>;
    /**
     * @description Combine all the generators passed as parameters into a new generator.
     * @param ranges Range generators to combine together.
     */
    function newRange<T>(...ranges: Array<IterableIterator<T>>): IterableIterator<T>;
    /**
     * @description A generator that generates a random sequence whose items are chosen from `arr`.
     * @param arr An array of candidates or a generator.
     * @param length The length of generated sequence.
     */
    function randSeq<T>(arr: ArrayLike<T> | IterableIterator<T>, length: number): IterableIterator<any>;
    /**
     * @description A use less function that simulates a race election. Generator version of `Random.Election.race` which is, once again, somehow, a useless function.
     * @param candidates Candidates for the race election.
     * @param maxVotes Max votes to win.
     */
    function race<T>(candidates: Array<Random.Election.Candidate> | Iterable<T>, maxVotes: number): IterableIterator<{
        voteFor: Random.Election.Candidate;
        index: number;
        winner: Random.Election.Candidate;
        candidates: Random.Election.Candidate[];
    } | {
        voteFor: Random.Election.Candidate;
        index: number;
        candidates: Random.Election.Candidate[];
        winner?: undefined;
    }>;
    /**
     * @description Yet another useless function that simulates an election. Generator version of `Random.Election.elect` which is, once again, somehow, a useless function.
     * @param candidates Candidates for the election.
     * @param voters The number of voters.
     */
    function elect<T>(candidates: Array<Random.Election.Candidate> | Iterable<T>, voters: number): IterableIterator<{
        voteFor: Random.Election.Candidate;
        index: number;
        winner: Random.Election.Candidate;
        candidates: Random.Election.Candidate[];
    } | {
        voteFor: Random.Election.Candidate;
        index: number;
        candidates: Random.Election.Candidate[];
        winner?: undefined;
    }>;
}
export default Generators;
