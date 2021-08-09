import { RyuseiLight } from '../core/RyuseiLight/RyuseiLight';
import * as languages  from '../languages';
import * as Extensions from '../extensions';
import { forOwn } from '../utils';

forOwn( languages, language => {
  RyuseiLight.register( language() );
} );

RyuseiLight.compose( Extensions );

export { RyuseiLight as default } from '../core/RyuseiLight/RyuseiLight';
