/**
 * Inserts the provided element(s) after the `ref` element.
 *
 * @since 1.0.0
 *
 * @param ref  - A new element is inserted after this element.
 * @param elms - An element or elements to insert.
 */
export function after( ref: Element, ...elms: Element[] ): void {
  const parent = ref.parentElement;

  if ( parent ) {
    for ( let i = elms.length - 1; i >= 0; i-- ) {
      const elm = elms[ i ];
      parent.insertBefore( elm, ref.nextElementSibling );
    }
  }
}
