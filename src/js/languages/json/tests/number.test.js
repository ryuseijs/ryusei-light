import {
  CATEGORY_BRACKET,
  CATEGORY_NUMBER,
  CATEGORY_OPERATOR,
  CATEGORY_PROPERTY,
  CATEGORY_TEXT,
} from '../../../constants/categories';


describe( 'json', () => {
  test( 'can tokenize numbers.', () => {
    [
      1,
      -1,
      1.23,
      -1.23,
      1e10,
      1e+10,
      1E+10,
      1e-10,
      1E-10,
      1.2e10,
      1.2e+10,
      1.2E+10,
      1.2e-10,
      1.2E-10,
    ].forEach( number => {
      expect( `{ "number": ${ number } }` ).toBeTokenized( 'json', [
        [ CATEGORY_BRACKET, '{' ],
        [ CATEGORY_PROPERTY, '"number"' ],
        [ CATEGORY_OPERATOR, ':' ],
        [ CATEGORY_NUMBER, String( number ) ],
        [ CATEGORY_BRACKET, '}' ],
      ] );
    } );
  } );

  test( 'should not tokenize invalid numbers.', () => {
    [
      ".23",
    ].forEach( number => {
      expect( `{ "number": ${ number } }` ).toBeTokenized( 'json', [
        [ CATEGORY_BRACKET, '{' ],
        [ CATEGORY_PROPERTY, '"number"' ],
        [ CATEGORY_OPERATOR, ':' ],
        [ CATEGORY_TEXT, '.' ],
        [ CATEGORY_NUMBER, '23' ],
        [ CATEGORY_BRACKET, '}' ],
      ] );
    } );
  } );
} );
