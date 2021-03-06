/**
 * Returns an element that matches the provided selector.
 *
 * @param selector - A selector.
 * @param parent   - Optional. A parent element to start searching elements from.
 *
 * @return A found element or `null`.
 */
export function query<E extends Element = HTMLElement>(
  selector: string,
  parent: HTMLElement | Document = document
): E | null {
  return parent.querySelector<E>( selector );
}
