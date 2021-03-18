import { RyuseiLight } from '../core/RyuseiLight/RyuseiLight';
import { none, css, javascript, html, xml } from '../languages';

RyuseiLight.register( [ none(), javascript(), html(), css(), xml() ] );

export { RyuseiLight as default } from '../core/RyuseiLight/RyuseiLight';
