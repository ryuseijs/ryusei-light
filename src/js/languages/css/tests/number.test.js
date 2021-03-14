import { CATEGORY_BRACKET, CATEGORY_NUMBER, CATEGORY_TAG } from '../../../constants/categories';


describe( 'css', () => {
  test( 'can tokenize numbers.', () => {
    expect( '* { 0 1 1.23 .23 +1.23 -1.23 }' ).toBeTokenized( 'css', [
      [ CATEGORY_TAG, '*' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_NUMBER, '0' ],
      [ CATEGORY_NUMBER, '1' ],
      [ CATEGORY_NUMBER, '1.23' ],
      [ CATEGORY_NUMBER, '.23' ],
      [ CATEGORY_NUMBER, '+1.23' ],
      [ CATEGORY_NUMBER, '-1.23' ],
      [ CATEGORY_BRACKET, '}' ],
    ] );
  } );

  test( 'can tokenize colors.', () => {
    expect( '* { #0033FF #0033ff #333 #CCC #ccc }' ).toBeTokenized( 'css', [
      [ CATEGORY_TAG, '*' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_NUMBER, '#0033FF' ],
      [ CATEGORY_NUMBER, '#0033ff' ],
      [ CATEGORY_NUMBER, '#333' ],
      [ CATEGORY_NUMBER, '#CCC' ],
      [ CATEGORY_NUMBER, '#ccc' ],
      [ CATEGORY_BRACKET, '}' ],
    ] );
  } );
} );
