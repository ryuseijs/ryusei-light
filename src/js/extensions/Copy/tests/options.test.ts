import { PROJECT_CODE_SHORT } from '../../../constants/project';
import { RyuseiLight } from '../../../core/RyuseiLight/RyuseiLight';
import { Overlay } from '../../Overlay/Overlay';
import { Copy } from '../Copy';


describe( 'Copy options', () => {
  RyuseiLight.compose( { Overlay, Copy } );

  beforeEach( () => {
    document.body.innerHTML = '<pre></pre>';
  } );

  test( 'can change the button labels.', () => {
    const ryuseilight = new RyuseiLight( {
      copy: {
        html      : 'Copy Code Sample',
        activeHtml: 'Copied!',
      },
    } );

    ryuseilight.apply( 'pre' );

    const copy = document.querySelector( `.${ PROJECT_CODE_SHORT }__copy` );

    expect( copy.children[ 0 ].innerHTML ).toBe( 'Copy Code Sample' );
    expect( copy.children[ 1 ].innerHTML ).toBe( 'Copied!' );
  } );

  test( 'can change the button aria-label.', () => {
    const ryuseilight = new RyuseiLight( { copy: { ariaLabel: 'Copy Code Sample' } } );
    ryuseilight.apply( 'pre' );

    const copy = document.querySelector( `.${ PROJECT_CODE_SHORT }__copy` );
    expect( copy.getAttribute( 'aria-label' ) ).toBe( 'Copy Code Sample' );
  } );
} );
