import { MapEntry } from '../types';
import { before } from './before';


describe( 'before', () => {
  test( 'can insert entries before the specified key.', () => {
    const map: MapEntry<string>[] = [
      [ 'comment', '' ],
      [ 'keyword', '' ],
      [ 'string', '' ],
    ];

    before( map, 'string', [ [ 'operator', '' ], [ 'symbol', '' ] ] );

    expect( map ).toStrictEqual( [
      [ 'comment', '' ],
      [ 'keyword', '' ],
      [ 'operator', '' ],
      [ 'symbol', '' ],
      [ 'string', '' ],
    ] );
  } );

  test( 'should push the entry if the specified key is not found.', () => {
    const map: MapEntry<string>[] = [
      [ 'comment', '' ],
      [ 'keyword', '' ],
      [ 'string', '' ],
    ];

    before( map, 'invalid', [ [ 'operator', '' ], [ 'symbol', '' ] ] );

    expect( map ).toStrictEqual( [
      [ 'comment', '' ],
      [ 'keyword', '' ],
      [ 'string', '' ],
      [ 'operator', '' ],
      [ 'symbol', '' ],
    ] );
  } );
} );
