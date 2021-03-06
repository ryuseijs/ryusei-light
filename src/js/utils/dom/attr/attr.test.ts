import { attr } from './attr';


describe( 'attr', () => {
  beforeEach( () => {
    document.body.innerHTML = '<div id="1" data-id="1" style="width: 100px"></div>';
  } );

  test( 'can get attributes from an element.', () => {
    const div = document.getElementById( '1' );

    expect( attr( div, 'id' ) ).toBe( '1' );
    expect( attr( div, 'style' ) ).toBe( 'width: 100px' );
    expect( attr( div, 'data-id' ) ).toBe( '1' );
  } );

  test( 'can set attributes to an element.', () => {
    const div = document.getElementById( '1' );

    attr( div, { id: '2', 'data-id': 2, 'role': 'button' } );

    expect( div.getAttribute( 'id' ) ).toBe( '2' );
    expect( div.getAttribute( 'data-id' ) ).toBe( '2' );
    expect( div.getAttribute( 'role' ) ).toBe( 'button' );
  } );
} );
