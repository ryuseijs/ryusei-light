import { getFlags } from './getFlags';


describe( 'flags', () => {
  test( 'can return flags of a RegExp object.', () => {
    expect( getFlags( /x/g ) ).toBe( 'g' );
    expect( getFlags( /x/i ) ).toBe( 'i' );
    expect( getFlags( /x/m ) ).toBe( 'm' );
    expect( getFlags( /x/s ) ).toBe( 's' );
    expect( getFlags( /x/y ) ).toBe( 'y' );
    expect( getFlags( /x/gmy ) ).toBe( 'gmy' );
    expect( getFlags( /x/ms ) ).toBe( 'ms' );
  } );

  test( 'should return an empty string if a RegExp does not have any flags.', () => {
    expect( getFlags( /x/ ) ).toBe( '' );
  } );
} );
