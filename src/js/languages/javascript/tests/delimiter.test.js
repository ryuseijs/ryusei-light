import { CATEGORY_DELIMITER } from '../../../constants/categories';


describe( 'javascript', () => {
  test( 'can tokenize delimiters.', () => {
    [
      ';',
      '.',
      ',',
    ].forEach( operator => {
      expect( operator ).toBeTokenized( 'javascript', [ [ CATEGORY_DELIMITER, operator ] ] );
    } );
  } );
} );


