import { PROJECT_CODE_SHORT } from '../../constants/project';
import { Renderer } from '../../core/Renderer/Renderer';


/**
 * The component for rendering overlay elements.
 *
 * @since 0.0.1
 */
export function Overlay( { event, options }: Renderer ) {
  event.on( 'mounted', () => {
    const className = `${ PROJECT_CODE_SHORT }__overlay`;
    const { overlay = {} } = options;

    if ( overlay.topRight || options.tools ) {
      event.on( 'close', append => {
        append( `<div class="${ className } ${ className }--top-right">` );
        event.emit( 'overlay:topRight', append );

        if ( options.tools ) {
          append( `<div class="${ PROJECT_CODE_SHORT }__tools">` );
          event.emit( 'overlay:tools', append );
          append( `</div>` );
        }

        append( `</div>` );
      } );
    }

    if ( overlay.topLeft ) {
      event.on( 'close', append => {
        append( `<div class="${ className } ${ className }--top-left">` );
        event.emit( 'overlay:topLeft', append );
        append( `</div>` );
      } );
    }

    if ( overlay.topRight || overlay.topLeft ) {
      event.on( 'open', ( append, classes ) => {
        classes.push( 'has-top-overlay' );
      } );
    }
  } );
}
