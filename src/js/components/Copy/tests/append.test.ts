import { PROJECT_CODE_SHORT } from '../../../constants/project';
import { RyuseiLight } from '../../../core/RyuseiLight/RyuseiLight';
import { Overlay } from '../../Overlay/Overlay';
import { Copy } from '../Copy';
import { DEFAULT_OPTIONS } from '../Copy';


describe( 'Copy', () => {
  RyuseiLight.compose( { Overlay, Copy } );

  beforeEach( () => {
    document.body.innerHTML = '<pre></pre>';
  } );

  test( 'can render a copy button if the `copy` option is true.', () => {
    const ryuseilight = new RyuseiLight( { copy: true } );
    ryuseilight.apply( 'pre' );

    const copy = document.querySelector( `.${ PROJECT_CODE_SHORT }__copy` );

    expect( copy instanceof HTMLButtonElement ).toBe( true );
    expect( copy.getAttribute( 'aria-label' ) ).toBe( DEFAULT_OPTIONS.ariaLabel );

    expect( copy.children[ 0 ].innerHTML ).toBe( DEFAULT_OPTIONS.html );
    expect( copy.children[ 1 ].innerHTML ).toBe( DEFAULT_OPTIONS.activeHtml );
  } );

  test( 'can render a copy button on the right side if the `copy.position` is `topRight`', () => {
    const ryuseilight = new RyuseiLight( { copy: { position: 'topRight' } } );
    ryuseilight.apply( 'pre' );

    const copy    = document.querySelector( `.${ PROJECT_CODE_SHORT }__copy` );
    const overlay = copy.parentElement.parentElement;

    expect( overlay.classList.contains( `${ PROJECT_CODE_SHORT }__overlay--top-right` ) ).toBe( true );
  } );

  test( 'can render a copy button on the left side if the `copy.position` is `topLeft`', () => {
    const ryuseilight = new RyuseiLight( { copy: { position: 'topLeft' } } );
    ryuseilight.apply( 'pre' );

    const copy    = document.querySelector( `.${ PROJECT_CODE_SHORT }__copy` );
    const overlay = copy.parentElement.parentElement;

    expect( overlay.classList.contains( `${ PROJECT_CODE_SHORT }__overlay--top-left` ) ).toBe( true );
  } );
} );
