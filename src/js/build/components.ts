import { RyuseiLight } from '../core/RyuseiLight/RyuseiLight';
import * as components from '../components';
import { css, html, javascript, none, xml } from '../languages';

RyuseiLight.register( [ none(), javascript(), html(), css(), xml() ] );
RyuseiLight.compose( components );

export { RyuseiLight as default } from '../core/RyuseiLight/RyuseiLight';
