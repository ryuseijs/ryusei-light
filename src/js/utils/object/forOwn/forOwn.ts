/**
 * Iterates over the provided object by own enumerable keys with calling the iteratee function.
 *
 * @param object   - An object to iterate over.
 * @param iteratee - An iteratee function that takes the value and key as arguments.
 *
 * @return A provided object itself.
 */
export function forOwn<T extends object>( object: T, iteratee: ( value: T[ keyof T ], key: string ) => void ) {
  if ( object ) {
    const keys = Object.keys( object );

    for ( let i = 0; i < keys.length; i++ ) {
      iteratee( object[ keys[ i ] ], keys[ i ] );
    }
  }
}
