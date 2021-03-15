import { REGEXP_BOOLEAN, REGEXP_DOUBLE_QUOTE, REGEXP_SPACE } from '../../constants/regexp';
import { Language } from '../../types';
import {
  CATEGORY_BOOLEAN, CATEGORY_BRACKET, CATEGORY_KEYWORD, CATEGORY_NUMBER, CATEGORY_OPERATOR,
  CATEGORY_PROPERTY, CATEGORY_SPACE, CATEGORY_STRING, CATEGORY_DELIMITER,
} from '../../constants/categories';


/**
 * Returns the JSON language definition.
 *
 * @link https://www.json.org/json-en.html
 *
 * @return A Language object.
 */
export function json(): Language {
  return {
    id  : 'json',
    name: 'JSON',

    grammar: {
      main: [
        [ CATEGORY_PROPERTY, /".*?[^\\]"(?=:)/ ],
        [ CATEGORY_STRING, REGEXP_DOUBLE_QUOTE ],
        [ CATEGORY_KEYWORD, /\bnull\b/ ],
        [ CATEGORY_NUMBER, /[+-]?(\d+\.?\d*)([eE][+-]?\d+)?/ ],
        [ CATEGORY_BRACKET, /[{}[\]]/ ],
        [ CATEGORY_BOOLEAN, REGEXP_BOOLEAN ],
        [ CATEGORY_OPERATOR, /:/ ],
        [ CATEGORY_DELIMITER, /,/ ],
        [ CATEGORY_SPACE, REGEXP_SPACE ],
      ],
    },
  };
}
