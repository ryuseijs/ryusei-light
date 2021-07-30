import {
  REGEXP_BOOLEAN, REGEXP_BRACKET, REGEXP_DOUBLE_QUOTE, REGEXP_GENERAL_KEYWORDS, REGEXP_MULTILINE_COMMENT,
  REGEXP_NUMBER, REGEXP_QUOTE, REGEXP_SLASH_COMMENT, REGEXP_SPACE,
} from '../../constants/regexp';
import { Language } from '../../types';
import {
  CATEGORY_DELIMITER, CATEGORY_DECORATOR, CATEGORY_KEYWORD, CATEGORY_REGEXP, CATEGORY_STRING,
  CATEGORY_OPERATOR, CATEGORY_COMMENT, CATEGORY_CLASS, CATEGORY_FUNCTION, CATEGORY_BOOLEAN,
  CATEGORY_IDENTIFIER, CATEGORY_NUMBER, CATEGORY_BRACKET, CATEGORY_SPACE,
} from '../../constants/categories';


/**
 * Returns the JavaScript language definition.
 *
 * @return A Language object.
 */
export function javascript(): Language {
  return {
    id   : 'javascript',
    name : 'JavaScript',
    alias: [ 'js' ],

    source: {
      func: /[_$a-z\xA0-\uFFFF][_$a-z0-9\xA0-\uFFFF]*/,
    },

    grammar: {
      main: [
        [ CATEGORY_STRING, REGEXP_QUOTE ],
        [ CATEGORY_STRING, REGEXP_DOUBLE_QUOTE ],
        [ '#backtick', /`/, '@rest' ],
        [ CATEGORY_COMMENT, REGEXP_MULTILINE_COMMENT ],
        [ CATEGORY_COMMENT, REGEXP_SLASH_COMMENT ],
        [ CATEGORY_REGEXP, /\/(\[.*?[^\\]]|\\\/|.)+?\/[gimsuy]*/ ],
        [ CATEGORY_KEYWORD, REGEXP_GENERAL_KEYWORDS ],
        [ CATEGORY_KEYWORD, /\b(?:as|async|await|case|catch|const|debugger|default|delete|enum|export|from|import|let|package|private|protected|public|super|switch|static|this|typeof|undefined|var|void|with|yield)\b/ ],
        [ CATEGORY_KEYWORD, /\b((get|set)(?=\s+%func))/i ],
        [ CATEGORY_CLASS, /\b[A-Z][\w$]*\b/ ],
        [ CATEGORY_FUNCTION, /%func(?=\s*\()/i ],
        [ CATEGORY_BOOLEAN, REGEXP_BOOLEAN ],
        [ CATEGORY_DECORATOR, /@[^\s(@]+/ ],
        [ CATEGORY_IDENTIFIER, /\b[a-z_$][\w$]*\b/ ],
        [ CATEGORY_NUMBER, REGEXP_NUMBER ],
        [ CATEGORY_OPERATOR, /=>/ ],
        [ CATEGORY_OPERATOR, /\+[+=]?|-[-=]?|\*\*?=?|[/%^]=?|&&?=?|\|\|?=?|\?\??=?|<<?=?|>>>=?|>>?=?|[!=]=?=?|[~:^]/ ],
        [ CATEGORY_BRACKET, REGEXP_BRACKET ],
        [ CATEGORY_DELIMITER, /[;.,]+/ ],
        [ CATEGORY_SPACE, REGEXP_SPACE ],
      ],

      backtick: [
        [ CATEGORY_STRING, /^`/ ],
        [ CATEGORY_STRING, /(\$[^{]|\\[$`]|[^`$])+/ ],
        [ '#expression', /\${/, '@rest' ],
        [ CATEGORY_STRING, /`/, '@break' ],
      ],

      expression: [
        [ CATEGORY_DELIMITER, /^\${/ ],
        [ CATEGORY_DELIMITER, /}/, '@break' ],
        [ '#main' ],
      ],
    },
  };
}
