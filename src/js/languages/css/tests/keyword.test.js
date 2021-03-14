import { CATEGORY_BRACKET, CATEGORY_KEYWORD, CATEGORY_TAG, CATEGORY_TEXT } from '../../../constants/categories';


describe( 'css', () => {
  test( 'can tokenize keywords.', () => {
    [
      '*{ !important }',
      '*{ initial }',
      '*{ inherit }',
      '*{ unset }',
    ].forEach( keyword => {
      expect( keyword ).toBeTokenized( 'css', [
        [ CATEGORY_TAG, '*' ],
        [ CATEGORY_BRACKET, '{' ],
        [ CATEGORY_KEYWORD, keyword.replace( '*{ ', '' ).replace( ' }', '' ) ],
        [ CATEGORY_BRACKET, '}' ],
      ] );
    } );
  } );

  test( 'should not tokenize "important" without ! as a keyword.', () => {
    expect( '*{ important }' ).toBeTokenized( 'css', [
      [ CATEGORY_TAG, '*' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_TEXT, 'important' ],
      [ CATEGORY_BRACKET, '}' ],
    ] );
  } );
} );


