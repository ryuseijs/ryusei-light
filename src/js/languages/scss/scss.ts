import { Language } from '../../types';
import {
  CATEGORY_BRACKET, CATEGORY_COMMENT, CATEGORY_FUNCTION, CATEGORY_OPERATOR, CATEGORY_PROPERTY,
  CATEGORY_SELECTOR, CATEGORY_SPACE, CATEGORY_STRING, CATEGORY_DELIMITER,
  CATEGORY_TAG, CATEGORY_VARIABLE,
} from '../../constants/categories';
import { REGEXP_MULTILINE_COMMENT, REGEXP_SLASH_COMMENT, REGEXP_SPACE } from '../../constants/regexp';
import { assign, before } from '../../utils';
import { css } from '../css/css';


/**
 * Returns the SCSS language definition.
 *
 * @return A Language object.
 */
export function scss(): Language {
  const language = assign( css(), {
    id  : 'scss',
    name: 'SCSS',
  } );

  const { grammar } = language;

  assign( grammar, {
    findBlock: [
      [ '#block', /(#{[^;]*?}|[^\s])(#{[^;]*?}|[^;{}])*[^#]{.*?}/s, '@rest' ],
    ],

    findAtrule: [
      [ '#atrule', /@\w.+?(;|(?=[^#]{))/s ],
    ],

    findSelector: [
      [ '#selector', /[^\s{};/].*?[^#](?={)/s ],
    ],

    findInterp: [
      [ '#interp', /#{/, '@rest' ],
    ],

    common: [
      [ '#string' ],
      [ CATEGORY_COMMENT, REGEXP_MULTILINE_COMMENT ],
      [ CATEGORY_COMMENT, REGEXP_SLASH_COMMENT ],
      [ CATEGORY_SPACE, REGEXP_SPACE ],
    ],

    string: [
      [ '#singleQuote', /'/, '@rest' ],
      [ '#doubleQuote', /"/, '@rest' ],
    ],

    singleQuote: [
      [ CATEGORY_STRING, /^'/ ],
      [ '#findInterp' ],
      [ CATEGORY_STRING, /(\\'|#[^{]|[^'#])+/ ],
      [ CATEGORY_STRING, /'/, '@break' ],
    ],

    doubleQuote: [
      [ CATEGORY_STRING, /^"/ ],
      [ '#findInterp' ],
      [ CATEGORY_STRING, /(\\"|#[^{]|[^"#])+/ ],
      [ CATEGORY_STRING, /"/, '@break' ],
    ],

    selector: [
      [ '#common' ],
      [ '#findInterp' ],
      [ CATEGORY_OPERATOR, /[>+~]/ ],
      [ CATEGORY_BRACKET, /[[\]()]/ ],
      [ CATEGORY_DELIMITER, /=/ ],
      [ CATEGORY_SELECTOR, /::?\S+(?=#{)/ ],
      [ CATEGORY_SELECTOR, /[\W\d]\S+(?=#{)/ ],
      [ CATEGORY_TAG, /\b[a-zA-Z]+\b|\*/ ],
      [ CATEGORY_SELECTOR, /\S+/ ],
    ],

    url: [
      [ '#common' ],
      [ '#findInterp' ],
      [ CATEGORY_FUNCTION, /^url/ ],
      [ CATEGORY_BRACKET, /\(/ ],
      [ CATEGORY_STRING, /[^)]+(?=#{)/ ],
      [ CATEGORY_STRING, /[^)]+/ ],
      [ CATEGORY_BRACKET, /\)/, '@break' ],
    ],

    interp: [
      [ CATEGORY_BRACKET, /#{/ ],
      [ CATEGORY_BRACKET, /}/, '@break' ],
      [ '#common' ],
      [ '#props' ],
    ],
  } );

  grammar.inner.unshift( [ '#findInterp' ] );

  before( grammar.atrule, '#url', [ [ '#findInterp' ] ] );
  before( grammar.props, CATEGORY_PROPERTY, [
    [ '#findInterp' ],
    [ CATEGORY_VARIABLE, /\$[\w-_]+/ ],
  ] );

  return language;
}
