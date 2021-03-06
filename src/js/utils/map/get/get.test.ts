import { MapEntry } from '../types';
import { get } from './get';


describe( 'get', () => {
  test( 'can get an entry by a key.', () => {
    const map: MapEntry<string>[] = [
      [ 'comment', '' ],
      [ 'keyword', '' ],
      [ 'string', '' ],
    ];

    expect( get( map, 'keyword' ) ).toEqual( [ 'keyword', '' ] );
  } );

  test( 'should return undefined if no entry is found.', () => {
    const map: MapEntry<string>[] = [
      [ 'comment', '' ],
      [ 'keyword', '' ],
      [ 'string', '' ],
    ];

    expect( get( map, 'operator' ) ).toBeUndefined();
  } );
} );
