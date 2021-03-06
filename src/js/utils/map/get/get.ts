import { MapEntry } from '../types';
import { find } from '../find/find';


/**
 * Gets the entry specified by the key.
 * If there are multiple entries with a same key, only the first matched entry will be returned.
 *
 * @param map - A map.
 * @param key - A key to get by.
 *
 * @return An entry if found, or otherwise `undefined`.
 */
export function get<T extends any>( map: MapEntry<T>[], key: string ): MapEntry<T> {
  return map[ find( map, key ) ];
}
