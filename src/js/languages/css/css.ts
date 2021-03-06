import { Language } from '../../types';
import {
  CATEGORY_BRACKET, CATEGORY_COMMENT, CATEGORY_FUNCTION, CATEGORY_KEYWORD, CATEGORY_NUMBER, CATEGORY_OPERATOR,
  CATEGORY_PROPERTY, CATEGORY_SELECTOR, CATEGORY_SPACE, CATEGORY_STRING, CATEGORY_SYMBOL, CATEGORY_TAG,
} from '../../constants/categories';
import { REGEXP_MULTILINE_COMMENT, REGEXP_SPACE } from '../../constants/regexp';


/**
 * Returns the CSS language definition.
 *
 * @return A Language object.
 */
export function css(): Language {
  return {
    id  : 'css',
    name: 'CSS',

    grammar: {
      main: [
        [ '#common' ],
        [ '#findBlock' ],
        [ '#findAtrule' ],
      ],

      findBlock: [
        [ '#block', /[^\s][^;{}]+{.*?}/s, '@rest' ],
      ],

      findAtrule: [
        [ '#atrule', /@\w.+?(;|(?=[{}]))/s ],
      ],

      findSelector: [
        [ '#selector', /[^\s{};/].*?(?={)/s ],
      ],

      common: [
        [ CATEGORY_STRING, /(['"]).*?[^\\]\1/s ],
        [ CATEGORY_COMMENT, REGEXP_MULTILINE_COMMENT ],
        [ CATEGORY_SPACE, REGEXP_SPACE ],
      ],

      block: [
        [ '#findAtrule' ],
        [ '#findSelector' ],
        [ '#inner', /{/, '@rest' ],
        [ CATEGORY_BRACKET, /}/, '@break' ],
        [ CATEGORY_SPACE, REGEXP_SPACE ],
      ],

      inner: [
        [ CATEGORY_BRACKET, /{/ ],
        [ '#common' ],
        [ '#findBlock' ],
        [ '#props' ],
        [ '#findAtrule' ],
        [ '', /}/, '@back' ],
      ],

      atrule: [
        [ '#common' ],
        [ '#url', /\burl\(/, '@rest' ],
        [ CATEGORY_SPACE, REGEXP_SPACE ],
        [ CATEGORY_KEYWORD, /[^\s();]+/ ],
        [ CATEGORY_SYMBOL, /[:;,]/ ],
        [ '#paren', /\(/, '@rest' ],
      ],

      paren: [
        [ CATEGORY_BRACKET, /^\(/ ],
        [ '#common' ],
        [ '#paren', /\(/, '@rest' ],
        [ CATEGORY_BRACKET, /\)/, '@break' ],
        [ '#props' ],
      ],

      selector: [
        [ '#common' ],
        [ CATEGORY_OPERATOR, /[>+~]/ ],
        [ CATEGORY_BRACKET, /[[\]()]/ ],
        [ CATEGORY_SYMBOL, /=/ ],
        [ CATEGORY_SELECTOR, /::?\S+/ ],
        [ CATEGORY_SELECTOR, /[\W\d]\S+/ ],
        [ CATEGORY_TAG, /\b[a-zA-Z]+|\*/ ],
        [ CATEGORY_SELECTOR, /\S+/ ],
      ],

      url: [
        [ '#common' ],
        [ CATEGORY_FUNCTION, /^url/ ],
        [ CATEGORY_BRACKET, /\(/ ],
        [ CATEGORY_STRING, /[^)]+/ ],
        [ CATEGORY_BRACKET, /\)/, '@break' ],
      ],

      props: [
        [ CATEGORY_PROPERTY, /[a-z0-9-]+(?=:)/i ],
        [ '#url', /\burl\(/, '@rest' ],
        [ CATEGORY_FUNCTION, /\b[\w-]+(?=\()\b/ ],
        [ CATEGORY_KEYWORD, /!important|\b(?:initial|inherit|unset)/ ],
        [ CATEGORY_PROPERTY, /[a-z0-9-]+(?=:)/ ],
        [ CATEGORY_NUMBER, /#([0-9a-f]{6}|[0-9a-f]{3})/i ],
        [ CATEGORY_NUMBER, /\bU\+[0-9a-f?-]+/i ],
        [ CATEGORY_NUMBER, /[+-]?(\d+\.?\d*|\d*\.?\d+)/ ],
        [ CATEGORY_SYMBOL, /[:;,]/ ],
        [ '#paren', /\(/, '@rest' ],
        [ CATEGORY_BRACKET, /[[\])]/ ],
        [ CATEGORY_SPACE, REGEXP_SPACE ],
      ],
    },
  };
}
