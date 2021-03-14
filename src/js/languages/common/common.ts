import { Language } from '../../types';
import {
  CATEGORY_BOOLEAN, CATEGORY_BRACKET, CATEGORY_CLASS, CATEGORY_COMMENT, CATEGORY_FUNCTION,
  CATEGORY_IDENTIFIER, CATEGORY_KEYWORD, CATEGORY_NUMBER, CATEGORY_OPERATOR,
  CATEGORY_SPACE, CATEGORY_STRING, CATEGORY_DELIMITER,
} from '../../constants/categories';
import {
  REGEXP_BOOLEAN, REGEXP_BRACKET, REGEXP_DOUBLE_QUOTE, REGEXP_FUNCTION, REGEXP_MULTILINE_COMMENT, REGEXP_NUMBER,
  REGEXP_QUOTE, REGEXP_SLASH_COMMENT, REGEXP_SPACE,
} from '../../constants/regexp';


/**
 * Returns a common language definition.
 *
 * @return A Language object.
 */
export function common(): Language {
  return {
    id  : 'common',
    name: '',

    grammar: {
      main: [
        [ CATEGORY_STRING, REGEXP_QUOTE ],
        [ CATEGORY_STRING, REGEXP_DOUBLE_QUOTE ],
        [ CATEGORY_COMMENT, REGEXP_MULTILINE_COMMENT ],
        [ CATEGORY_COMMENT, REGEXP_SLASH_COMMENT ],
        [ CATEGORY_KEYWORD, /\b(?:break|catch|class|continue|do|else|extends|finally|for|function|if|implements|in|instanceof|interface|new|null|return|throw|trait|try|while)\b/ ],
        [ CATEGORY_CLASS, /\b[A-Z][\w$]*\b/ ],
        [ CATEGORY_FUNCTION, REGEXP_FUNCTION ],
        [ CATEGORY_BOOLEAN, REGEXP_BOOLEAN ],
        [ CATEGORY_IDENTIFIER, /\b[a-z_$][\w$]*\b/ ],
        [ CATEGORY_NUMBER, REGEXP_NUMBER ],
        [ CATEGORY_OPERATOR, /\+[+=]?|-[-=]?|\*\*?=?|[/%^]=?|&&?=?|\|\|?=?|\?\??=?|<<?=?|>>>=?|>>?=?|[!=]=?=?|[~:^]/ ],
        [ CATEGORY_BRACKET, REGEXP_BRACKET ],
        [ CATEGORY_DELIMITER, /[;.,]+/ ],
        [ CATEGORY_SPACE, REGEXP_SPACE ],
      ],
    },
  };
}
