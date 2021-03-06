import { forOwn } from '../../object';


/**
 * Applies inline styles to the provided element by an object literal.
 *
 * @param elm    - An element to apply styles to.
 * @param styles - An object literal with styles.
 */
export function styles( elm: HTMLElement, styles: Record<string, string | number> ): void {
  forOwn( styles, ( value, key ) => {
    elm.style[ key ] = String( value );
  } );
}
