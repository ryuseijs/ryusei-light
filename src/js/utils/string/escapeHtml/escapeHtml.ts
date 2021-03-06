/**
 * Converts essential HTML special characters to HTML entities.
 *
 * @param string - A string to escape.
 *
 * @return An escaped string.
 */
export function escapeHtml( string: string ): string {
  return string.replace( /&/g, '&amp;' ).replace( /</g, '&lt;' );
}
