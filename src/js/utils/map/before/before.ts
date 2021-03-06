import { MapEntry } from '../types';
import { find } from '../find/find';


/**
 * Insert entries before the reference entry specified by the `ref`.
 * If the reference is not found, a new entry is created.
 *
 * @param map     - A map to insert values to.
 * @param ref     - A reference key.
 * @param entries - entries to insert.
 */
export function before<T extends any>( map: MapEntry<T>[], ref: string, entries: MapEntry<T>[] ): void {
  const index = find( map, ref );

  if ( index > -1 ) {
    map.splice( index, 0, ...entries );
  } else {
    map.push( ...entries );
  }
}
