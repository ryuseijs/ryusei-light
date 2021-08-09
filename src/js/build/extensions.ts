import { RyuseiLight } from '../core/RyuseiLight/RyuseiLight';
import * as Extensions from '../extensions';
import { css, html, javascript, none, xml } from '../languages';

RyuseiLight.register( [ none(), javascript(), html(), css(), xml() ] );
RyuseiLight.compose( Extensions );

export { RyuseiLight as default } from '../core/RyuseiLight/RyuseiLight';
