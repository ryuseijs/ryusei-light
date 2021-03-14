import { RyuseiLight } from '../../../src/js';


/**
 * The jest matcher to check if the code is tokenized to expected tokens or not.
 *
 * @since 0.0.12
 *
 * @param received       - A received string.
 * @param lang           - A language name.
 * @param expectedTokens - Expected tokens by an array.
 * @param ignoreSpaces   - Options. Whether to ignore whitespaces or not. The default value is true.
 */
export function toBeTokenized(
  received: string,
  lang: string,
  expectedTokens: [ string, string ][],
  ignoreSpaces = true
): jest.CustomMatcherResult {
  if ( ! RyuseiLight.has( lang ) ) {
    throw new Error( `Language ${ lang } has not been registered.` );
  }

  let tokens = RyuseiLight.tokenize( received.trim(), lang )
    .reduce( ( accumulator, line ) => {
      return accumulator.concat( line );
    }, [] );

  if ( ignoreSpaces ) {
    tokens = tokens.filter( token => token[ 0 ] !== 'space' );
  }

  const pass = expectedTokens.every( ( token, index ) => {
    return token[ 0 ] === tokens[ index ][ 0 ] && token[ 1 ] === tokens[ index ][ 1 ];
  } );

  const message = pass
    ? () => `The code was successfully tokenized to ${ this.utils.printReceived( expectedTokens ) }`
    : () => `The code was not tokenized to
      Expect: ${ this.utils.printReceived( expectedTokens ) }
      Actual: ${ this.utils.printExpected( tokens ) }
    `;

  return {
    pass,
    message,
  }
}
