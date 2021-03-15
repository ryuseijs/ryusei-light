import { Language } from '../../types';
import {
  CATEGORY_BRACKET,
  CATEGORY_COMMENT,
  CATEGORY_FUNCTION,
  CATEGORY_KEYWORD,
  CATEGORY_NUMBER,
  CATEGORY_OPERATOR,
  CATEGORY_PROPERTY,
  CATEGORY_SELECTOR,
  CATEGORY_SPACE,
  CATEGORY_STRING,
  CATEGORY_DELIMITER,
  CATEGORY_TAG,
  CATEGORY_ATRULE,
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

        // An atrule without a block
        [ '#findSingleAtrule' ],

        // Blocks including atrules
        [ '#findBlock' ],
      ],

      findBlock: [
        [ '#block', /[^\s;{}][^;{}]*{.*?}/s, '@rest' ],
      ],

      findSingleAtrule: [
        [ '#atrule', /@[^{;]+?;/s ],
      ],

      // Finds atrules before { and ;
      findAtrule: [
        [ '#atrule', /@[^{;]*?(?=[{;])/s ],
      ],

      // May not start with digits
      findSelector: [
        [ '#selector', /[^\s{};].*?(?={)/s ],
      ],

      common: [
        [ CATEGORY_STRING, /(['"]).*?[^\\]\1/s ],
        [ CATEGORY_COMMENT, REGEXP_MULTILINE_COMMENT ],
        [ CATEGORY_SPACE, REGEXP_SPACE ],
      ],

      block: [
        [ '#inner', /{/, '@rest' ],
        [ CATEGORY_BRACKET, /}/, '@break' ],
        [ '#findAtrule' ],
        [ '#findSelector' ],
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
        [ CATEGORY_ATRULE, /[^\s();]+/ ],
        [ CATEGORY_DELIMITER, /[:;,]/ ],
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
        [ CATEGORY_DELIMITER, /=/ ],
        [ CATEGORY_SELECTOR, /::?\S+/ ],
        [ CATEGORY_SELECTOR, /[\W\d]\S+/ ],
        [ CATEGORY_TAG, /\b[a-z]+|\*/i ],
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
        [ CATEGORY_PROPERTY, /[a-z0-9-_\xA0-\uFFFF]+(?=:)/i ],
        [ '#url', /\burl\(/, '@rest' ],
        [ CATEGORY_FUNCTION, /\b[\w-]+(?=\()\b/ ],
        [ CATEGORY_KEYWORD, /!important|\b(?:initial|inherit|unset)/ ],
        [ CATEGORY_PROPERTY, /[a-z0-9-]+(?=:)/ ],
        [ CATEGORY_NUMBER, /#([0-9a-f]{6}|[0-9a-f]{3})/i ],
        [ CATEGORY_NUMBER, /\bU\+[0-9a-f?-]+/i ],
        [ CATEGORY_NUMBER, /[+-]?(\d+\.?\d*|\d*\.?\d+)/ ],
        [ CATEGORY_DELIMITER, /[:;,]/ ],
        [ '#paren', /\(/, '@rest' ],
        [ CATEGORY_BRACKET, /[[\])]/ ],
        [ CATEGORY_SPACE, REGEXP_SPACE ],
      ],
    },
  };
}
