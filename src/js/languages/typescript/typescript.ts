import { Language } from '../../types';
import { CATEGORY_FUNCTION, CATEGORY_KEYWORD } from '../../constants/categories';
import { assign, before } from '../../utils';
import { javascript } from '../javascript/javascript';


/**
 * Returns the Typescript language definition.
 *
 * @return A Language object.
 */
export function typescript(): Language {
  const language = assign( javascript(), {
    id   : 'typescript',
    name : 'TypeScript',
    alias: [ 'ts' ],
  } );

  const { grammar } = language;
  const { main }    = grammar;

  before( main, CATEGORY_KEYWORD, [
    [
      CATEGORY_KEYWORD,
      /\b(?:declare|keyof|namespace|readonly|type|string|number|boolean|bigint|symbol|object|any|never|unknown|infer)\b/,
    ],
  ] );

  before( main, CATEGORY_FUNCTION, [ [ '#functions', /([\w$]+)?(?:<[^>]+?>)?\s*?\(/ ] ] );

  assign( grammar, {
    functions: [
      [ CATEGORY_FUNCTION, /^[\w$]+/ ],
      // Avoid circular references("main" has #functions).
      ...main.filter( tokenizer => tokenizer[ 0 ] !== '#functions' ),
    ],
  } );

  return language;
}
