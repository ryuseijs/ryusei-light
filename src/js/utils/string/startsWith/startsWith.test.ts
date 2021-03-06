import { startsWith } from './startsWith';


describe( 'startsWith', () => {
  test( 'can check if the string starts with the provided character.', () => {
    expect( startsWith( 'abc', 'a' ) ).toBe( true );
    expect( startsWith( 'abc', 'b' ) ).toBe( false );
  } );
} );
