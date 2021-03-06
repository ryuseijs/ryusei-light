import { isArray } from '../../type/type';


/**
 * Push the provided value to an array only if the value is not an array.
 *
 * @param value - A value to push.
 *
 * @return An array containing the value, or the value itself if it is already an array.
 */
export function toArray<T>( value: T | T[] ): T[] {
  return isArray<T>( value ) ? value : [ value ];
}
