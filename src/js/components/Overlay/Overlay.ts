import { PROJECT_CODE_SHORT } from '../../constants/project';
import { Renderer } from '../../core/Renderer/Renderer';
import { EventBus } from '../../event/EventBus';


/**
 * The component for rendering overlay and tools elements.
 *
 * @since 0.0.1
 */
export function Overlay( { event, options }: Renderer ) {
  event.on( 'mounted', () => {
    const { overlay = {} } = options;
    const { tools } = options;
    let { topRight, topLeft } = overlay;

    topRight = topRight || tools === 'topRight';
    topLeft  = topLeft || tools === 'topLeft';

    [ topRight, topLeft ].forEach( ( active, index ) => {
      if ( active ) {
        if ( tools ) {
          appendTools( event, index === 1 );
        }

        appendOverlay( event, index === 1 )
      }
    } );

    if ( topRight || topLeft ) {
      event.on( 'open', ( append, classes ) => {
        classes.push( 'has-top-overlay' );
      } );
    }
  } );
}

/**
 * Appends HTML for the overlay.
 *
 * @private
 *
 * @param event - The EventBus object.
 * @param left  - Optional. Set `true` for the left overlay.
 */
function appendOverlay( event: EventBus, left?: boolean ) {
  const className = `${ PROJECT_CODE_SHORT }__overlay`;

  event.on( 'close', append => {
    append( `<div class="${ className } ${ className }--top-${ left ? 'left' : 'right' }">` );
    event.emit( `overlay:top${ left ? 'Left' : 'Right' }`, append );
    append( `</div>` );
  } );
}

/**
 * Appends HTML for tools.
 *
 * @private
 *
 * @param event - The EventBus object.
 * @param left  - Optional. Set `true` for the left tools.
 */
function appendTools( event: EventBus, left?: boolean ): void {
  const position = left ? 'Left' : 'Right';

  event.on( `overlay:top${ position }`, append => {
    append( `<span class="${ PROJECT_CODE_SHORT }__tools">` );
    event.emit( `tools:top${ position }`, append );
    append( `</span>` );
  } );
}
