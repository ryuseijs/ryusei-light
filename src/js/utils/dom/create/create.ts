import { append }   from '../append/append';
import { addClass } from '../addClass/addClass';


/**
 * Creates a HTML element.
 *
 * @param tag     - A tag name.
 * @param classes - Optional. Classes to add.
 * @param parent  - Optional. A parent element where the created element is appended.
 */
export function create<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  classes?: string | string[],
  parent?: HTMLElement
): HTMLElementTagNameMap[ K ] {
  const elm = document.createElement( tag );

  if ( classes ) {
    addClass( elm, classes );
  }

  if ( parent ) {
    append( parent, elm );
  }

  return elm;
}
