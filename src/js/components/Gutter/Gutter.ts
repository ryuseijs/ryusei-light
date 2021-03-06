import { Renderer } from '../../core/Renderer/Renderer';
import { PROJECT_CODE_SHORT } from '../../constants/project';
import { CLASSES } from '../../constants/classes';
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
const GUTTER_CLASS_NAME = `${ PROJECT_CODE_SHORT }__gutter`;

/**
 * The class name for row element in a gutter.
 *
 * @since 0.0.1
 */
const GUTTER_ROW_CLASS_NAME = `${ GUTTER_CLASS_NAME }__row`;

/**
 * The component for creating a gutter and its rows.
 * This is usually activated by other components through the `gutter` option.
 *
 * @since 0.0.1
 */
export function Gutter( { lines, event, root, options }: Renderer ): void {
  // Wait for initialization of other components.
  event.on( 'mounted', () => {
    if ( ! options.gutter ) {
      return;
    }

    event.on( 'open', ( append, classes ) => {
      classes.push( 'has-gutter' );
    } );

    event.on( 'body:opened', append => {
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
      const gutter = query( `.${ GUTTER_CLASS_NAME }`, root );
      const code   = query( `.${ CLASSES.code }`, root );

      if ( gutter && code ) {
        for ( let i = 0; i < code.children.length; i++ ) {
          const row  = gutter.children[ i ];
          const line = code.children[ i ];

          if ( isHTMLElement( row ) && row.clientHeight !== line.clientHeight ) {
            styles( row, { height: `${ line.clientHeight }px` } );
          }
        }
      }
    }
  } );
}
