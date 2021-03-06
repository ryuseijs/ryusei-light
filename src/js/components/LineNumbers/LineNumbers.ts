import { Renderer } from '../../core/Renderer/Renderer';
import { PROJECT_CODE_SHORT } from '../../constants/project';
import { attr } from '../../utils';


/**
 * The data attribute name for line numbers.
 * This accepts boolean or number as a value.
 *
 * @since 1.0.0
 */
const ATTRIBUTE_LINE_NUMBERS = `data-${ PROJECT_CODE_SHORT }-line-numbers`;

/**
 * The component for displaying line numbers in a gutter.
 *
 * @since 1.0.0
 */
export function LineNumbers( { root, event, options }: Renderer ): void {
  const data   = root ? attr( root, ATTRIBUTE_LINE_NUMBERS ) : '';
  const number = data === '' ? +options.lineNumbers : +data;

  if ( number || number === 0 ) {
    options.gutter = true;
    const start = Math.floor( number ) - 1;

    event.on( 'gutter:row:opened', ( append, i ) => {
      append( `<span class="${ PROJECT_CODE_SHORT }__line-number">${ i + 1 + start }</span>` );
    } );
  }
}
