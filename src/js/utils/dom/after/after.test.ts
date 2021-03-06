import { after } from './after';


describe( 'after', () => {
  beforeEach( () => {
    document.body.innerHTML = '<div id="container"></div>';
  } );

  test( 'can insert an element after the reference element.', () => {
    const container    = document.getElementById( 'container' );
    const newContainer = document.createElement( 'div' );

    after( container, newContainer );

    expect( container.nextElementSibling ).toBe( newContainer );
  } );

  test( 'can insert elements after the reference element.', () => {
    const container     = document.getElementById( 'container' );
    const newContainer1 = document.createElement( 'div' );
    const newContainer2 = document.createElement( 'div' );
    const newContainer3 = document.createElement( 'div' );

    after( container, newContainer1, newContainer2, newContainer3 );

    expect( container.nextElementSibling ).toBe( newContainer1 );
    expect( newContainer1.nextElementSibling ).toBe( newContainer2 );
    expect( newContainer2.nextElementSibling ).toBe( newContainer3 );
  } );
} );
