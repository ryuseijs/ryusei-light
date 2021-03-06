import { MapEntry } from '../types';
import { omit } from './omit';


describe( 'omit', () => {
  test( 'can omit an entry by a key.', () => {
    const map: MapEntry<string>[] = [
      [ 'comment', '' ],
      [ 'keyword', '' ],
      [ 'string', '' ],
    ];

    omit( map, 'keyword' );

    expect( map ).toStrictEqual( [
      [ 'comment', '' ],
      [ 'string', '' ],
    ] );
  } );

  test( 'can omit entries by keys.', () => {
    const map: MapEntry<string>[] = [
      [ 'comment', '' ],
      [ 'keyword', '' ],
      [ 'string', '' ],
    ];

    omit( map, [ 'keyword', 'string' ] );

    expect( map ).toStrictEqual( [ [ 'comment', '' ] ] );
  } );

  test( 'should do nothing if a key is not found.', () => {
    const map: MapEntry<string>[] = [
      [ 'comment', '' ],
      [ 'keyword', '' ],
      [ 'string', '' ],
    ];

    omit( map, [ 'operator', 'symbol' ] );

    expect( map ).toStrictEqual( [
      [ 'comment', '' ],
      [ 'keyword', '' ],
      [ 'string', '' ],
    ] );
  } );
} );
