import { Renderer } from '../../core/Renderer/Renderer';
import { LINE_BREAK } from '../../constants/characters';
import { ACTIVE } from '../../constants/classes';
import { PROJECT_CODE_SHORT } from '../../constants/project';
import { addClass, append, assign, create, isObject, query, styles } from '../../utils';


/**
 * Default options for the Copy component.
 *
 * @since 0.0.1
 */
const DEFAULT_OPTIONS = {
  html      : 'Copy',
  activeHtml: 'Done',
  duration  : 1000,
  ariaLabel : 'Copy code to clipboard',
};

/**
 * The component for creating a copy button and handling click.
 *
 * @since 0.0.1
 */
export function Copy( { lines, event, options }: Renderer ): void {
  if ( options.copy ) {
    const copyOptions = assign( {}, DEFAULT_OPTIONS, isObject( options.copy ) ? options.copy : {} );
    const buttonClass = `${ PROJECT_CODE_SHORT }__copy`;
    const labelClass  = `${ PROJECT_CODE_SHORT }__button__label`;

    options.tools = true;

    event.on( `overlay:tools`, append => {
      append( `<button type="button" class="rl__button ${ buttonClass }" aria-label="Copy code to clipboard">` );
      append( `<span class="${ labelClass } ${ labelClass }--inactive">${ copyOptions.html }</span>` );
      append( `<span class="${ labelClass } ${ labelClass }--active">${ copyOptions.activeHtml }</span>` );
      append( `</button>` );
    } );

    event.on( 'applied', root => {
      const button = query<HTMLButtonElement>( `.${ buttonClass }`, root );
      const code   = lines.map( line => line.map( token => token[ 1 ] ).join( '' ) ).join( LINE_BREAK );

      if ( button ) {
        const onClick = () => { copy( code, button, copyOptions.duration ) };
        button.addEventListener( 'click', onClick );

        event.on( 'destroy', () => {
          button.removeEventListener( 'click', onClick );
        } );
      }
    } );
  }
}

/**
 * Attempts to copy the provided code by the Clipboard API.
 *
 * @param code     - A code to copy.
 * @param button   - A button element.
 * @param duration - Duration for the button activation.
 */
function copy( code: string, button: HTMLButtonElement, duration: number ): void {
  const onSuccess = () => {
    if ( duration ) {
      toggleClass( button, duration );
    }
  };

  if ( navigator.clipboard ) {
    navigator.clipboard.writeText( code )
      .then( onSuccess )
      .catch( () => execCopy( code, onSuccess ) );
  } else {
    execCopy( code, onSuccess );
  }
}

/**
 * Attempts to copy the provided code by the `document.execCommand()` for old browsers.
 * Note that this method is deprecated.
 *
 * @param code      - Code to copy.
 * @param onSuccess - Called after the copy is done.
 */
function execCopy( code: string, onSuccess: () => void ): void {
  const textarea = create( 'textarea' );
  textarea.textContent = code;

  styles( textarea, { position: 'absolute', left: '-99999px' } );
  append( document.body, textarea );

  textarea.focus();
  textarea.select();

  let failed;

  try {
    document.execCommand( 'copy' );
  } catch ( e ) {
    alert( 'Failed to copy.' );
    failed = true;
  }

  document.body.removeChild( textarea );

  if ( ! failed ) {
    onSuccess();
  }
}

/**
 * Toggles the active class of the button.
 *
 * @param button   - A button element.
 * @param duration - Duration for the button activation.
 */
function toggleClass( button: HTMLButtonElement, duration: number ): void {
  addClass( button, ACTIVE );

  const prop = '_rlTimer';

  if ( button[ prop ] ) {
    clearTimeout( button[ prop ] );
  }

  button[ prop ] = setTimeout( () => {
    button.classList.remove( ACTIVE );
  }, duration );
}
