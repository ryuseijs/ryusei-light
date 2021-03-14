import { Language } from '../../types';
import {
  CATEGORY_ATTRIBUTE, CATEGORY_BRACKET, CATEGORY_CLASS, CATEGORY_SPACE,
  CATEGORY_DELIMITER, CATEGORY_TAG, CATEGORY_VALUE,
} from '../../constants/categories';
import { REGEXP_SPACE } from '../../constants/regexp';
import { assign, before } from '../../utils';
import { javascript } from '../javascript/javascript';


/**
 * Returns the JSX language definition.
 *
 * @return A Language object.
 */
export function jsx(): Language {
  const language = assign( javascript(), {
    id   : 'jsx',
    name : 'JSX',
    alias: [ 'react' ],
    use  : { javascript: javascript() },
  } );

  const { grammar } = language;
  const { main }    = grammar;

  before( main, CATEGORY_CLASS, [ [ '#pickPairedTag' ], [ '#pickSelfClosedTag' ] ] );

  assign( grammar, {
    // This doesn't pick correct paired tags when they are nested, but they are incrementally searched later.
    pickPairedTag: [
      [ '#pairedTag', /<\s*?([\w]+?).*?>.*?<\/\1>/s, '@rest' ],
    ],

    pickSelfClosedTag: [
      [ '#selfClosedTag', /<\s*?([\w]+?).*?\/>/s ],
    ],

    pairedTag: [
      [ '#openTag', /^</, '@rest' ],
      [ '@javascript', /{.*?}/s ],
      [ '#pickPairedTag' ],
      [ '#pickSelfClosedTag' ],
      [ '#tagName', /<\/[\w][^\s]*?>/, '@break' ],
    ],

    selfClosedTag: [
      [ '#openTag', /^</, '@rest' ],
    ],

    openTag: [
      [ '#tagName', /<\s*[^\s/>"'=]+/ ],
      [ '@javascript', /{.*?}/s ],
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
