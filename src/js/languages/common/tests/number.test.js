import { CATEGORY_NUMBER } from '../../../constants/categories';


describe( 'common', () => {
  test( 'can tokenize numbers.', () => {
    [
      '0',
      '1',
      '1.23',
      '.23',
      '+1.23',
      '-1.23',
      '1e10',
      '1e+10',
      '1e-10',
      '1E10',
      '1E+10',
      '1E-10',
      '1.2e10',
      '1.2e+10',
      '1.2e-10',
      '1.2E10',
      '1.2E+10',
      '1.2E-10',
    ].forEach( number => {
      expect( number ).toBeTokenized( 'common', [ [ CATEGORY_NUMBER, number ] ] );
    } );
  } );
} );


