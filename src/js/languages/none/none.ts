import { Language } from '../../types';


/**
 * Returns the None language definition.
 *
 * @return A Language object.
 */
export function none(): Language {
  return {
    id     : 'none',
    name   : '',
    grammar: { main: [] },
  };
}
