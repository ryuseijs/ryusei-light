import { Language } from '../../types';
import { assign } from '../../utils';
import { xml } from '../xml/xml';


/**
 * Returns the XML language definition.
 *
 * @return A Language object.
 */
export function svg(): Language {
  return assign( xml(), {
    id   : 'svg',
    name : 'SVG',
    alias: [],
  } );
}
