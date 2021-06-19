import { MapEntry } from '../types';
/**
 * Gets the entry specified by the key.
 * If there are multiple entries with a same key, only the first matched entry will be returned.
 *
 * @param map - A map.
 * @param key - A key to get by.
 *
 * @return An entry if found, or otherwise `undefined`.
 */
export declare function get<T extends any>(map: MapEntry<T>[], key: string): MapEntry<T>;
//# sourceMappingURL=get.d.ts.map