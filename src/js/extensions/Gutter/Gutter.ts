import { Renderer } from '../../core/Renderer/Renderer';
import { PROJECT_CODE_SHORT } from '../../constants/project';
import { CODE } from '../../constants/classes';
import { styles, throttle, isHTMLElement, query } from '../../utils';


/**
 * The throttle duration in milliseconds for resizing gutter rows.
 *
 * @since 0.0.1
 */
const THROTTLE_DURATION = 100;

/**
 * The class name for a gutter element.
 *
 * @since 0.0.1
 */
export const GUTTER_CLASS_NAME = `${ PROJECT_CODE_SHORT }__gutter`;

/**
 * The class name for row element in a gutter.
 *
 * @since 0.0.1
 */
export const GUTTER_ROW_CLASS_NAME = `${ GUTTER_CLASS_NAME }__row`;

/**
 * The component for creating a gutter and its rows.
 * This is usually activated by other extensions through the `gutter` option.
 *
 * @since 0.0.1
 */
export function Gutter( { lines, event, root, options }: Renderer ): void {
  // Wait for initialization of other extensions.
  event.on( 'mounted', () => {
    if ( ! options.gutter ) {
      return;
    }

    event.on( 'open', ( append, classes ) => {
      classes.push( 'has-gutter' );
    } );

    event.on( 'code:open', append => {
      append( `<div class="${ GUTTER_CLASS_NAME }" aria-hidden="true">` );

      for ( let i = 0; i < lines.length; i++ ) {
        const classes = [ GUTTER_ROW_CLASS_NAME ];
        event.emit( 'gutter:row:open', append, classes, i );

        append( `<div class="${ classes.join( ' ' ) }">` );
        event.emit( 'gutter:row:opened', append, i );
        append( `</div>` );
      }

      append( `</div>` );
    } );

    if ( ! root || typeof window === 'undefined' ) {
      return;
    }

    window.addEventListener( 'resize', throttle( resize, THROTTLE_DURATION ) );
    resize();

    event.on( 'destroy', () => {
      window.removeEventListener( 'resize', resize );
    } );

    /**
     * Resizes rows according to line height.
     */
    function resize() {
      const rows = root.getElementsByClassName( GUTTER_ROW_CLASS_NAME );
      const code = query( `.${ CODE }`, root );

      if ( rows.length && code ) {
        for ( let i = 0; i < code.children.length; i++ ) {
          const row  = rows[ i ];
          const line = code.children[ i ];

          if ( isHTMLElement( row ) && row.clientHeight !== line.clientHeight ) {
            styles( row, { height: `${ line.clientHeight }px` } );
          }
        }
      }
    }
  } );
}
