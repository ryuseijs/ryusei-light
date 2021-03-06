import { MapEntry } from '../types';
import { find } from './find';


describe( 'find', () => {
  test( 'can find a key from entries.', () => {
    const map: MapEntry<string>[] = [
      [ 'comment', '' ],
      [ 'keyword', '' ],
      [ 'string', '' ],
    ];

    expect( find( map, 'comment' ) ).toBe( 0 );
    expect( find( map, 'keyword' ) ).toBe( 1 );
    expect( find( map, 'string' ) ).toBe( 2 );
  } );

  test( 'should return -1 if an entry is not found.', () => {
    const map: MapEntry<string>[] = [
      [ 'comment', '' ],
      [ 'keyword', '' ],
      [ 'string', '' ],
    ];

    expect( find( map, 'space' ) ).toBe( -1 );
  } );
} );
