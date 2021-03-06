/**
 * Checks if the string starts with the `char` or not.
 *
 * @param string - A string to check.
 * @param char   - A character.
 *
 * @return `true` if the string starts with the `char`, or otherwise `false`.
 */
export function startsWith( string: string, char: string ): boolean {
  return string.charAt( 0 ) === char;
}
