import { toArray } from '../../array';


/**
 * Adds classes to the element.
 *
 * @param elm     - An element to add classes to.
 * @param classes - Classes to add.
 */
export function addClass( elm: HTMLElement, classes: string | string[] ): void {
  toArray( classes ).forEach( name => {
    if ( name ) {
      elm.classList.add( name );
    }
  } );
}
