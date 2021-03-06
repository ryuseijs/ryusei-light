import { PROJECT_CODE_SHORT } from '../../constants/project';
import { Renderer } from '../../core/Renderer/Renderer';
import { attr } from '../../utils';


/**
 * The data attribute name for a title.
 *
 * @since 1.0.0
 */
const ATTRIBUTE_TITLE = `data-${ PROJECT_CODE_SHORT }-title`;

/**
 * The component for rendering a title in a header.
 *
 * @since 1.0.0
 */
export function Title( { event, root, options }: Renderer ) {
  const title = ( root && attr( root, ATTRIBUTE_TITLE ) ) || options.title;

  if ( title ) {
    event.on( 'open', append => {
      append( `<div class="${ PROJECT_CODE_SHORT }__header">` );
      append( `<span class="${ PROJECT_CODE_SHORT }__title">${ title }</span>` );
      append( `</div>` );
    } );
  }
}
