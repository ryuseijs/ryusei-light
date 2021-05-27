import { TokenInfo } from '../../../types';


/**
 * Returns a new TokenInfo object.
 *
 * @param state    - A state name.
 * @param depth    - Depth.
 * @param language - A language name.
 */
export function getInfo( state: string, depth: number, language?: string ): TokenInfo {
  return {
    state,
    depth,
    language: language || 'test',
    split   : false,
    head    : false,
    tail    : false,
    distance: 0,
  };
}
