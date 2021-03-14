import {
  CATEGORY_BRACKET, CATEGORY_DELIMITER, CATEGORY_FUNCTION, CATEGORY_ATRULE, CATEGORY_STRING,
  CATEGORY_PROPERTY, CATEGORY_NUMBER, CATEGORY_TEXT, CATEGORY_TAG,
} from '../../../constants/categories';


describe( 'css', () => {
  test( 'can tokenize atrules.', () => {
    expect( '@charset "utf-8";' ).toBeTokenized( 'css', [
      [ CATEGORY_ATRULE, '@charset' ],
      [ CATEGORY_STRING, '"utf-8"' ],
      [ CATEGORY_DELIMITER, ';' ],
    ] );

    expect( '@import url( "style.css" ) body;' ).toBeTokenized( 'css', [
      [ CATEGORY_ATRULE, '@import' ],
      [ CATEGORY_FUNCTION, 'url' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_STRING, '"style.css"' ],
      [ CATEGORY_BRACKET, ')' ],
      [ CATEGORY_ATRULE, 'body' ],
      [ CATEGORY_DELIMITER, ';' ],
    ] );
  } );

  test( 'can tokenize atrules with contents.', () => {
    const atrule = `
      @media screen and (max-width: 1000px) {
        body {
          padding: 3rem;
        }
      }
    `;

    expect( atrule ).toBeTokenized( 'css', [
      [ CATEGORY_ATRULE, '@media' ],
      [ CATEGORY_ATRULE, 'screen' ],
      [ CATEGORY_ATRULE, 'and' ],

      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_PROPERTY, 'max-width' ],
      [ CATEGORY_DELIMITER, ':' ],
      [ CATEGORY_NUMBER, '1000' ],
      [ CATEGORY_TEXT, 'px' ],
      [ CATEGORY_BRACKET, ')' ],

      [ CATEGORY_BRACKET, '{' ],

      [ CATEGORY_TAG, 'body' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_PROPERTY, 'padding' ],
      [ CATEGORY_DELIMITER, ':' ],
      [ CATEGORY_NUMBER, '3' ],
      [ CATEGORY_TEXT, 'rem' ],
      [ CATEGORY_DELIMITER, ';' ],
      [ CATEGORY_BRACKET, '}' ],

      [ CATEGORY_BRACKET, '}' ],
    ] );
  } );

  test( 'can tokenize nested atrules.', () => {
    const atrule = `
      @supports (display: grid) {
        @media screen and (max-width: 1000px) {
          body {
            padding: 3rem;
          }
        }
      }
    `;

    expect( atrule ).toBeTokenized( 'css', [
      [ CATEGORY_ATRULE, '@supports' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_PROPERTY, 'display' ],
      [ CATEGORY_DELIMITER, ':' ],
      [ CATEGORY_TEXT, 'grid' ],
      [ CATEGORY_BRACKET, ')' ],
      [ CATEGORY_BRACKET, '{' ],

      [ CATEGORY_ATRULE, '@media' ],
      [ CATEGORY_ATRULE, 'screen' ],
      [ CATEGORY_ATRULE, 'and' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_PROPERTY, 'max-width' ],
      [ CATEGORY_DELIMITER, ':' ],
      [ CATEGORY_NUMBER, '1000' ],
      [ CATEGORY_TEXT, 'px' ],
      [ CATEGORY_BRACKET, ')' ],
      [ CATEGORY_BRACKET, '{' ],

      [ CATEGORY_TAG, 'body' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_PROPERTY, 'padding' ],
      [ CATEGORY_DELIMITER, ':' ],
      [ CATEGORY_NUMBER, '3' ],
      [ CATEGORY_TEXT, 'rem' ],
      [ CATEGORY_DELIMITER, ';' ],
      [ CATEGORY_BRACKET, '}' ],

      [ CATEGORY_BRACKET, '}' ],

      [ CATEGORY_BRACKET, '}' ],
    ] );
  } );
} );
