import { Language } from '../../types';
import {
  CATEGORY_ATTRIBUTE, CATEGORY_BRACKET, CATEGORY_CLASS, CATEGORY_SPACE,
  CATEGORY_DELIMITER, CATEGORY_TAG, CATEGORY_VALUE,
} from '../../constants/categories';
import { REGEXP_SPACE } from '../../constants/regexp';
import { assign, before } from '../../utils';
import { javascript } from '../javascript/javascript';


/**
 * Options for the JSX language definition.
 *
 * @since 0.0.12
 */
interface JsxOptions {
  /**
   * The base language. The default value is `javascript()`.
   */
  base?: () => Language;
}

/**
 * Returns the JSX language definition.
 *
 * @return A Language object.
 */
export function jsx( options: JsxOptions = {} ): Language {
  const language = assign( ( options.base || javascript )(), {
    id   : 'jsx',
    name : 'JSX',
    alias: [ 'react' ],
  } );

  const { grammar } = language;

  before( grammar.main, CATEGORY_CLASS, [ [ '#findPairedTag' ], [ '#findSelfClosedTag' ] ] );

  assign( grammar, {
    // This doesn't pick correct paired tags if nested, but they are incrementally searched later.
    findPairedTag: [
      [ '#pairedTag', /(?:<\s*?(\w+).*?>.*?<\/\1>)|<\s*?>.*?<\/>/s, '@rest' ],
    ],

    // Should not match the closing delimiter inside `{}`, `''` and `""`.
    findSelfClosedTag: [
      [ '#selfClosedTag', /<(?:{.*?}|(['"]).*?\1|[^>])+?\/>/s ],
    ],

    findBracket: [
      [ '#code', /{/, '@rest' ],
    ],

    pairedTag: [
      [ '#openTag', /^</, '@rest' ],
      [ '#findBracket' ],
      [ '#findPairedTag' ],
      [ '#findSelfClosedTag' ],
      [ '#tagName', /<\/([\w][^\s]*?)?>/, '@break' ],
      [ CATEGORY_SPACE, REGEXP_SPACE ],
    ],

    code: [
      [ CATEGORY_BRACKET, /^{/ ],
      [ CATEGORY_BRACKET, /}/, '@break' ],
      [ '#findBracket' ],
      [ '#main' ],
    ],

    selfClosedTag: [
      [ '#openTag', /^</, '@rest' ],
    ],

    openTag: [
      [ '#tagName', /<\s*[^\s/>"'=]*/ ],
      [ '#findBracket' ],
      [ CATEGORY_ATTRIBUTE, /[^\s/>"'=]+/ ],
      [ CATEGORY_VALUE, /(['"])(\\\1|.)*?\1/ ],
      [ CATEGORY_SPACE, REGEXP_SPACE ],
      [ CATEGORY_DELIMITER, /[/=]/ ],
      [ CATEGORY_BRACKET, />/, '@break' ],
    ],

    tagName: [
      [ CATEGORY_BRACKET, /[<>]/ ],
      [ CATEGORY_SPACE, REGEXP_SPACE ],
      [ CATEGORY_DELIMITER, /\// ],
      [ CATEGORY_CLASS, /[A-Z][\w$-]*/ ],
      [ CATEGORY_TAG, /[^\s/>"'=]+/ ],
    ],
  } );

  return language;
}
