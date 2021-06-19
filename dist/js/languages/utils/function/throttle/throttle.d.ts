import { AnyFunction } from '../../../types';
/**
 * Returns a function that invokes the provided function at most once in the specified duration.
 *
 * @since 0.0.1
 *
 * @param callback - A function to throttle.
 * @param interval - A throttle duration in milliseconds.
 *
 * @return A throttled function.
 */
export declare function throttle(callback: AnyFunction, interval: number): () => void;
//# sourceMappingURL=throttle.d.ts.map