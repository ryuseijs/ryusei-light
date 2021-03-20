import { PROJECT_CODE_SHORT } from '../../constants/project';
import { Renderer } from '../../core/Renderer/Renderer';
import { assign, attr, isObject, isString } from '../../utils';


/**
 * The data attribute name for a caption.
 *
 * @since 0.0.22
 */
const ATTRIBUTE_CAPTION = `data-${ PROJECT_CODE_SHORT }-caption`;

/**
 * The component for wrapping a code snipped by a figure tag and appending a figcaption.
 *
 * @since 0.0.22
 */
export function Caption( { event, root, options }: Renderer ) {
  const attrCaption = root && attr( root, ATTRIBUTE_CAPTION );

  if ( ! attrCaption && ! options.caption ) {
    return;
  }

  const captionOptions = options.caption;
  const { position, html } = assign( {}, isObject( captionOptions ) ? captionOptions : null );
  const caption = attrCaption || html || ( isString( captionOptions ) ? captionOptions : '' );

  if ( caption ) {
    const bottom = position === 'bottom';

    event.on( 'open', append => {
      append( `<figure class="${ PROJECT_CODE_SHORT }__figure">` );

      if ( ! bottom ) {
        appendCaption( append, caption );
      }
    } );

    event.on( 'closed', append => {
      if ( bottom ) {
        appendCaption( append, caption );
      }

      append( '</figure>' );
    } );
  }
}

/**
 * Append a figcaption element with a provided caption.
 *
 * @param append  - The append function.
 * @param caption - A caption.
 * @param bottom  - Optional. Set `true` for a bottom caption.
 */
function appendCaption( append: ( html: string ) => void, caption: string, bottom?: boolean ): void {
  const className = `${ PROJECT_CODE_SHORT }__figcaption`;

  append( `<figcaption class="${ className } ${ className + ( bottom ? '--bottom' : '--top' ) }">` );
  append( `<span>${ caption }</span>` );
  append( `</figcaption>` );
}
