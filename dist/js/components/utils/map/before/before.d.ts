import { MapEntry } from '../types';
/**
 * Insert entries before the reference entry specified by the `ref`.
 * If the reference is not found, a new entry is created.
 *
 * @param map     - A map to insert values to.
 * @param ref     - A reference key.
 * @param entries - entries to insert.
 */
export declare function before<T extends any>(map: MapEntry<T>[], ref: string, entries: MapEntry<T>[]): void;
//# sourceMappingURL=before.d.ts.map