import { RyuseiLight } from '../../../core/RyuseiLight/RyuseiLight';
import { Gutter, GUTTER_ROW_CLASS_NAME } from '../Gutter';
import { LINE } from '../../../constants/classes';


describe( 'Gutter', () => {
  RyuseiLight.compose( { Gutter } );

  beforeEach( () => {
    document.body.innerHTML = `<pre>
      console.log( 1 );
      console.log( 2 );
      console.log( 3 );
    </pre>`;
  } );

  test( 'can resize height of rows.', done => {
    const ryuseilight = new RyuseiLight( { gutter: true } );
    ryuseilight.apply( 'pre' );

    const lines = document.getElementsByClassName( LINE );
    const rows  = document.getElementsByClassName( GUTTER_ROW_CLASS_NAME );

    Object.defineProperty( lines[ 0 ], 'clientHeight', { value: 100 } );
    Object.defineProperty( lines[ 1 ], 'clientHeight', { value: 300 } );

    window.dispatchEvent( new Event( 'resize' ) );

    setTimeout( () => {
      if ( rows[ 0 ] instanceof HTMLElement ) {
        expect( rows[ 0 ].style.height ).toBe( '100px' );
      } else {
        fail();
      }

      if ( rows[ 1 ] instanceof HTMLElement ) {
        expect( rows[ 1 ].style.height ).toBe( '300px' );
      } else {
        fail();
      }

      if ( rows[ 2 ] instanceof HTMLElement ) {
        expect( rows[ 2 ].style.height ).toBe( '' );
      } else {
        fail();
      }

      done();
    }, 1000 );
  } );
} );
