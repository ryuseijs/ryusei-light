import { text } from './text';


describe( 'text', () => {
  test( 'can get a text from a node.', () => {
    const div = document.createElement( 'div' );
    div.textContent = 'hello!';

    expect( text( div ) ).toBe( 'hello!' );
  } );

  test( 'can set a text to a node.', () => {
    const div = document.createElement( 'div' );
    text( div, 'world!' );

    expect( div.textContent ).toBe( 'world!' );
  } );
} );
