import { Renderer } from '../../core/Renderer/Renderer';
import { PROJECT_CODE_SHORT } from '../../constants/project';


/**
 * The component for rendering a language name.
 *
 * @since 1.0.0
 */
export function LanguageName( { event, info, options }: Renderer ) {
  const { name } = info;

  if ( options.languageName && name ) {
    const position = options.languageName === 'topLeft' ? 'topLeft' : 'topRight';
    options.overlay = options.overlay || {};
    options.overlay[ position ] = true;

    event.on( `overlay:${ position }`, append => {
      append( `<span class="${ PROJECT_CODE_SHORT }__name">${ info.name }</span>` );
    } );
  }
}
