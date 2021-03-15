import { CATEGORY_BRACKET, CATEGORY_OPERATOR, CATEGORY_BOOLEAN } from '../../../constants/categories';


describe( 'javascript', () => {
  test( 'can tokenize an arrow function.', () => {
    expect( `() => true` ).toBeTokenized( 'javascript', [
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_BRACKET, ')' ],
      [ CATEGORY_OPERATOR, '=>' ],
      [ CATEGORY_BOOLEAN, 'true' ],
    ] );
  } );
} );
