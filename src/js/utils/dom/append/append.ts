import { toArray } from '../../array';


/**
 * Appends children to the parent element.
 *
 * @param parent   - A parent element.
 * @param children - A child or children to append to the parent.
 */
export function append( parent: HTMLElement, children: Node | Node[] ): void {
  children = toArray<Node>( children );

  for ( let i = 0; i < children.length; i++ ) {
    parent.appendChild( children[ i ] );
  }
}
