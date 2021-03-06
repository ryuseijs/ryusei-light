import { RyuseiLight } from '../core/RyuseiLight/RyuseiLight';
import * as languages  from '../languages';
import * as components from '../components';
import { forOwn } from '../utils';

forOwn( languages, language => {
  RyuseiLight.register( language() );
} );

RyuseiLight.compose( components );

export { RyuseiLight as default } from '../core/RyuseiLight/RyuseiLight';
