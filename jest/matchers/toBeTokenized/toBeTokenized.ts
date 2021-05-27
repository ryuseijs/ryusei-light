import { RyuseiLight } from '../../../src/js';
import { CATEGORY_SPACE } from '../../../src/js/constants/categories';
import { Token } from '../../../src/js/types';


/**
 * The jest matcher to check if the code is tokenized to expected tokens or not.
 *
 * @since 0.0.12
 *
 * @param received       - A received string.
 * @param lang           - A language name.
 * @param expectedTokens - Expected tokens by an array.
 * @param ignoreSpaces   - Optional. Whether to ignore whitespaces or not. The default value is true.
 * @param infoProperty   - Optional. A info property name for the 3rd parameter. The default value is an empty string.
 */
export function toBeTokenized(
  received: string,
  lang: string,
  expectedTokens: Token[],
  ignoreSpaces = true,
  infoProperty = ''
): jest.CustomMatcherResult {
  if ( ! RyuseiLight.has( lang ) ) {
    throw new Error( `Language ${ lang } has not been registered.` );
  }

  let tokens = RyuseiLight.tokenize( received.trim(), lang )
    .reduce( ( accumulator, line ) => {
      return accumulator.concat( line );
    }, [] );

  if ( ignoreSpaces ) {
    tokens = tokens.filter( token => token[ 0 ] !== CATEGORY_SPACE );
  }

  if ( infoProperty ) {
    tokens = tokens.map( token => [ token[ 0 ], token[ 1 ], token[ 2 ][ infoProperty ] ] );
  } else {
    tokens = tokens.map( token => [ token[ 0 ], token[ 1 ] ] );
  }

  const pass = expectedTokens.length === tokens.length && expectedTokens.every( ( token, index ) => {
    return token.every( ( param, paramIndex ) => param === tokens[ index ][ paramIndex ] );
  } );

  const message = pass
    ? () => `The code was successfully tokenized to ${ this.utils.printReceived( expectedTokens ) }`
    : () => `Tokenization failed:
      Expect: ${ this.utils.printReceived( expectedTokens ) }
      Actual: ${ this.utils.printExpected( tokens ) }
    `;

  return {
    pass,
    message,
  }
}
