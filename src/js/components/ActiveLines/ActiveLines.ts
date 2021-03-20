import { PROJECT_CODE_SHORT } from '../../constants/project';
import { Renderer } from '../../core/Renderer/Renderer';
import { ACTIVE } from '../../constants/classes';
import { attr, error, isArray } from '../../utils';


/**
 * The data attribute name for active lines.
 * The value must be an array in JSON format, such as "[ 2, [ 5, 10 ] ]"
 *
 * @private
 * @since 0.0.1
 */
export const ATTRIBUTE_ACTIVE_LINES = `data-${ PROJECT_CODE_SHORT }-active-lines`;

/**
 * The component for highlighting lines.
 *
 * @since 0.0.1
 */
export function ActiveLines( { event, root, options }: Renderer ): void {
  const lines = ( root && parseData( root ) ) || options.activeLines;

  if ( isArray( lines ) ) {
    const activeLines = normalize( lines );

    event.on( 'gutter:row:open', ( html, classes, index ) => {
      if ( activeLines[ index ] ) {
        classes.push( activeLines[ index ] );
      }
    } );

    event.on( 'line:open', ( html, classes, index ) => {
      if ( activeLines[ index ] ) {
        classes.push( activeLines[ index ] );
      }
    } );
  }
}

/**
 * Attempts to get definition of active lines from a data attribute.
 *
 * @param elm - A root element.
 *
 * @return An array with line numbers if available, or otherwise `undefined`.
 */
function parseData( elm: HTMLElement ): Array<number | [ number, number ]> | void {
  const data = attr( elm, ATTRIBUTE_ACTIVE_LINES );

  if ( data ) {
    try {
      return JSON.parse( data );
    } catch ( e ) {
      error( e.message );
    }
  }
}

/**
 * Normalizes the definition of lines to activate.
 *
 * @param lines - An array with line numbers.
 *
 * @return An array with normalized line numbers.
 */
function normalize( lines: Array<number | [ number, number ]> ): string[] {
  const numbers = [];

  lines.forEach( range => {
    if ( ! isArray( range ) ) {
      range = [ range, range ];
    }

    const start = ( +range[ 0 ] || 1 ) - 1;
    const end   = ( +range[ 1 ] || 1 ) - 1;

    for ( let i = start; i <= end; i++ ) {
      numbers[ i ] = ACTIVE;
    }
  } );

  return numbers;
}
