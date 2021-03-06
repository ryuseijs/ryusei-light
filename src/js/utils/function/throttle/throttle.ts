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
export function throttle( callback: AnyFunction, interval: number ): () => void {
  let timer;

  return function () {
    if ( ! timer ) {
      timer = setTimeout( () => {
        callback();
        timer = null;
      }, interval );
    }
  };
}
