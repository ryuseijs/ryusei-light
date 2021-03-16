import { Language } from '../../types';
import { assign } from '../../utils';
import { jsx } from '../jsx/jsx';
import { typescript } from '../typescript/typescript';


/**
 * Returns the TSX language definition.
 *
 * @return A Language object.
 */
export function tsx(): Language {
  return assign( jsx( { base: typescript } ), {
    id   : 'tsx',
    name : 'TSX',
  } );
}
