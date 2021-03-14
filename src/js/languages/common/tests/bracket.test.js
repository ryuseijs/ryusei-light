import { CATEGORY_BRACKET } from '../../../constants/categories';


describe( 'common', () => {
  test( 'can tokenize brackets.', () => {
    [
      '{', '}',
      '(', ')',
      '[', ']',
    ].forEach( operator => {
      expect( operator ).toBeTokenized( 'common', [ [ CATEGORY_BRACKET, operator ] ] );
    } );
  } );
} );
