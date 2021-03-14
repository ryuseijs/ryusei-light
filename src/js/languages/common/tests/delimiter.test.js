import { CATEGORY_DELIMITER } from '../../../constants/categories';


describe( 'common', () => {
  test( 'can tokenize delimiters.', () => {
    [
      ';',
      '.',
      ',',
    ].forEach( operator => {
      expect( operator ).toBeTokenized( 'common', [ [ CATEGORY_DELIMITER, operator ] ] );
    } );
  } );
} );


