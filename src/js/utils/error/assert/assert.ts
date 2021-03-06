/**
 * Throws an error if the provided condition is falsy.
 *
 * @param condition - If falsy, an error is thrown.
 * @param message   - Optional. A message for the error.
 */
export function assert( condition: any, message = '' ): void {
  if ( ! condition ) {
    throw new Error( message );
  }
}
