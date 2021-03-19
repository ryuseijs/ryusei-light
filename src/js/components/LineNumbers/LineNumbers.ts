import { LINE_BREAK } from '../../constants/characters';
import { Renderer } from '../../core/Renderer/Renderer';
import { PROJECT_CODE_SHORT } from '../../constants/project';
import { attr } from '../../utils';


/**
 * The data attribute name for line numbers.
 * This accepts boolean or number as a value.
 *
 * @since 0.0.1
 */
const ATTRIBUTE_LINE_NUMBERS = `data-${ PROJECT_CODE_SHORT }-line-numbers`;

/**
 * The component for displaying line numbers in a gutter.
 *
 * @since 0.0.1
 */
export function LineNumbers( { root, event, options }: Renderer ): void {
  const data   = root ? attr( root, ATTRIBUTE_LINE_NUMBERS ) : '';
  const number = data === '' ? +options.lineNumbers : +data;

  if ( number || number === 0 ) {
    options.gutter = true;
    let offset = Math.floor( number ) - 1;

    event.on( 'gutter:row:opened', ( append, i ) => {
      const classes = [ `${ PROJECT_CODE_SHORT }__line-number` ];
      const data    = { skip: false, content: i + 1 + offset };

      event.emit( 'lineNumber:open', append, classes, i, data );

      if ( data.skip ) {
        data.content = LINE_BREAK;
        offset--;
      }

      append( `<span class="${ classes.join( ' ' ) }">${ data.content }</span>` );
    } );
  }
}
