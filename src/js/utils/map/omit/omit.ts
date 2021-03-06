import { MapEntry } from '../types';
import { find } from '../find/find';
import { toArray } from '../../array';


/**
 * Omits entries specified by keys.
 *
 * @param map  - A map with entries.
 * @param keys - Any number of keys to omit.
 */
export function omit<T extends any>( map: MapEntry<T>[], keys: string | string[] ): void {
  keys = toArray( keys );

  for ( let i = 0; i < keys.length; i++ ) {
    const index = find( map, keys[ i ] );

    if ( index > -1 ) {
      map.splice( index, 1 );
    }
  }
}
