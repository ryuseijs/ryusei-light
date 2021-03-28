/**
 * Returns an open tag with provided classes.
 *
 * @param classes - Classes.
 * @param tag     - Optional. A tag name.
 */
export function tag( classes: string[], tag?: string ): string {
  return `<${ tag || 'div' } class="${ classes.join( ' ' ) }">`;
}
