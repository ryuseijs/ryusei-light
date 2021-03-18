import { CATEGORY_BRACKET } from '../../../constants/categories';


describe( 'javascript', () => {
  test( 'can tokenize brackets.', () => {
    [
      '{', '}',
      '(', ')',
      '[', ']',
    ].forEach( bracket => {
      expect( bracket ).toBeTokenized( 'javascript', [ [ CATEGORY_BRACKET, bracket ] ] );
    } );
  } );
} );
