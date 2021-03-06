import { forOwn } from '../../object';
import { isObject, isString } from '../../type/type';


export function attr( elm: Element, attrs: string ): string;
export function attr( elm: Element, attrs: Record<string, string | number | boolean> ): void;

/**
 * Sets new attributes to the passed element if the `attrs` is an object literal,
 * or gets an attribute value from it if the `attrs` is a string.
 *
 * @param elm   - An element to set or get an attribute.
 * @param attrs - An attribute name as a string or new attributes as an object literal.
 */
export function attr( elm: Element, attrs: string | Record<string, string | number | boolean> ): string | void {
  if ( isString( attrs ) ) {
    return elm.getAttribute( attrs ) || '';
  }

  if ( isObject( attrs ) ) {
    forOwn( attrs, ( value, key ) => {
      elm.setAttribute( key, String( value ) );
    } );
  }
}
