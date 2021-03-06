/**
 * Returns flags of the provided regexp object.
 * IE doesn't support RegExp#flags.
 *
 * @param regexp - A RegExp object.
 *
 * @return Flags as a string.
 */
export function getFlags( regexp: RegExp ): string {
  return regexp.toString().match( /[gimsy]*$/ )[ 0 ];
}
