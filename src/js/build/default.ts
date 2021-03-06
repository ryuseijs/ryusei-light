import { RyuseiLight } from '../core/RyuseiLight/RyuseiLight';
import { none, common, css, javascript, html, xml } from '../languages';

RyuseiLight.register( [ none(), common(), javascript(), html(), css(), xml() ] );

export { RyuseiLight as default } from '../core/RyuseiLight/RyuseiLight';
