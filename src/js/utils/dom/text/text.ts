import { isUndefined } from '../../type/type';


export function text( node: Node ): string;
export function text( node: Node, text: string ): void;

/**
 * Sets or gets a text content of the provided node.
 *
 * @param node - A node to get or set a text.
 * @param text - Optional. A text to set.
 */
export function text( node: Node, text?: string ): string | void {
  if ( isUndefined( text ) ) {
    return node.textContent;
  }

  node.textContent = text;
}
