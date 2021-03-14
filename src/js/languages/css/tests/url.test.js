import {
  CATEGORY_BRACKET, CATEGORY_DELIMITER, CATEGORY_FUNCTION, CATEGORY_ATRULE,
  CATEGORY_STRING, CATEGORY_PROPERTY, CATEGORY_TAG,
} from '../../../constants/categories';


describe( 'css', () => {
  test( 'can tokenize url with an atrule.', () => {
    expect( '@import url( "style.css" );' ).toBeTokenized( 'css', [
      [ CATEGORY_ATRULE, '@import' ],
      [ CATEGORY_FUNCTION, 'url' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_STRING, '"style.css"' ],
      [ CATEGORY_BRACKET, ')' ],
      [ CATEGORY_DELIMITER, ';' ],
    ] );

    expect( '@import url(style.css);' ).toBeTokenized( 'css', [
      [ CATEGORY_ATRULE, '@import' ],
      [ CATEGORY_FUNCTION, 'url' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_STRING, 'style.css' ],
      [ CATEGORY_BRACKET, ')' ],
      [ CATEGORY_DELIMITER, ';' ],
    ] );
  } );

  test( 'can tokenize url as a value.', () => {
    expect( '* { background: url( "bg.png" ) }' ).toBeTokenized( 'css', [
      [ CATEGORY_TAG, '*' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_PROPERTY, 'background' ],
      [ CATEGORY_DELIMITER, ':' ],
      [ CATEGORY_FUNCTION, 'url' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_STRING, '"bg.png"' ],
      [ CATEGORY_BRACKET, ')' ],
      [ CATEGORY_BRACKET, '}' ],
    ] );
  } );
} );
