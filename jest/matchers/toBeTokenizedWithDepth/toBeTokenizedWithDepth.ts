import { Token } from '../../../src/js/types';
import { toBeTokenized } from '../toBeTokenized/toBeTokenized';


/**
 * The jest matcher to check if the code is tokenized to expected tokens or not.
 * The depth parameter must be matched.
 *
 * @since 1.0.2
 *
 * @param received       - A received string.
 * @param lang           - A language name.
 * @param expectedTokens - Expected tokens with depth.
 * @param ignoreSpaces   - Optional. Whether to ignore whitespaces or not. The default value is true.
 */
export function toBeTokenizedWithDepth(
  received: string,
  lang: string,
  expectedTokens: Required<Token>[],
  ignoreSpaces = true,
): jest.CustomMatcherResult {
  return toBeTokenized( received, lang, expectedTokens, ignoreSpaces, true );
}
