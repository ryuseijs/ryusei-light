import { MapEntry } from '../types';


/**
 * Finds the provided key from a map and returns its index.
 *
 * @param map - A map to search in.
 * @param key - A key to search for.
 *
 * @return An index if found, or `-1` otherwise.
 */
export function find<T extends any>( map: MapEntry<T>[], key: string ): number {
  for ( let i = 0; i < map.length; i++ ) {
    if ( map[ i ][ 0 ] === key ) {
      return i;
    }
  }

  return -1;
}
