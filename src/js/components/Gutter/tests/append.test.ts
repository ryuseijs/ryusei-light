import { RyuseiLight } from '../../../core/RyuseiLight/RyuseiLight';
import { Gutter, GUTTER_CLASS_NAME } from '../Gutter';


describe( 'Gutter', () => {
  RyuseiLight.compose( { Gutter } );

  beforeEach( () => {
    document.body.innerHTML = `<pre>
      console.log( 1 );
      console.log( 2 );
      console.log( 3 );
    </pre>`;
  } );

  test( 'can append a gutter element.', () => {
    const ryuseilight = new RyuseiLight( { gutter: true } );
    ryuseilight.apply( 'pre' );

    const gutter = document.querySelector( `.${ GUTTER_CLASS_NAME }` );
    expect( gutter instanceof HTMLElement ).toBe( true );
  } );

  test( 'can append rows in the gutter.', () => {
    const ryuseilight = new RyuseiLight( { gutter: true } );
    ryuseilight.apply( 'pre' );

    const gutter = document.querySelector( `.${ GUTTER_CLASS_NAME }` );
    expect( gutter.children.length ).toBe( 3 );
  } );
} );
