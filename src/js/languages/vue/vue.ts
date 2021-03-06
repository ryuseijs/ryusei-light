import { Language } from '../../types';
import { assign } from '../../utils';
import { html } from '../html/html';


/**
 * Returns the VUE language definition.
 *
 * @return A Language object.
 */
export function vue(): Language {
  const language = assign( html(), { id: 'vue', name: 'Vue', alias: [] } );

  // Vue uses Mustache syntax for writing code inside tags.
  language.grammar.main.push( [ '@javascript', /{{[\s\S]*?}}/ ] );

  return language;
}
