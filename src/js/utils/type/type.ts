/**
 * Checks if the given subject is an object or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is an object, or otherwise `false`.
 */
export function isObject<T extends object>( subject: any ): subject is T {
  return subject !== null && typeof subject === 'object';
}

/**
 * Checks if the given subject is an array or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is an array, or otherwise `false`.
 */
export function isArray<T>( subject: any ): subject is T[] {
  return Array.isArray( subject );
}

/**
 * Checks if the given subject is a function or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is a function, or otherwise `false`.
 */
export function isFunction( subject: any ): subject is ( ...args: any[] ) => any {
  return typeof subject === 'function';
}

/**
 * Checks if the given subject is a string or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is a string, or otherwise `false`.
 */
export function isString( subject: any ): subject is string {
  return typeof subject === 'string';
}

/**
 * Checks if the given subject is `undefined` or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is `undefined`, or otherwise `false`.
 */
export function isUndefined( subject: any ): subject is undefined {
  return typeof subject === 'undefined';
}

/**
 * Checks if the given subject is an HTMLElement instance or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is an HTMLElement instance, or otherwise `false`.
 */
export function isHTMLElement( subject: any ): subject is HTMLElement {
  return subject instanceof HTMLElement;
}
