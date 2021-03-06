import { Language } from '../../types';
import { CATEGORY_PROLOG } from '../../constants/categories';
import { assign } from '../../utils';
import { html } from '../html/html';


/**
 * Returns the XML language definition.
 *
 * @return A Language object.
 */
export function xml(): Language {
  const language = assign( html(), {
    id   : 'xml',
    name : 'XML',
    alias: [],
  } );

  language.grammar.main.unshift( [ CATEGORY_PROLOG, /<\?.*?\?>/s ] );

  return language;
}
