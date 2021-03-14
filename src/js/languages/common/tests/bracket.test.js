import { CATEGORY_BRACKET } from '../../../constants/categories';


describe( 'common', () => {
  test( 'can tokenize brackets.', () => {
    [
      '{', '}',
      '(', ')',
      '[', ']',
    ].forEach( bracket => {
      expect( bracket ).toBeTokenized( 'common', [ [ CATEGORY_BRACKET, bracket ] ] );
    } );
  } );
} );
