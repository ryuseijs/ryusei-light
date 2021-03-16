import { Language } from '../../types';
import { assign } from '../../utils';
import { html, HtmlOptions } from '../html/html';


/**
 * The Vue language options.
 *
 * @since 0.0.12
 */
interface VueOptions extends HtmlOptions {}

/**
 * Returns the VUE language definition.
 *
 * @return A Language object.
 */
export function vue( options: VueOptions = {} ): Language {
  const language = assign( html( options ), { id: 'vue', name: 'Vue', alias: [] } );

  // Vue uses Mustache syntax for writing code inside tags.
  language.grammar.main.push( [ '@script', /{{[\s\S]*?}}/ ] );

  return language;
}
