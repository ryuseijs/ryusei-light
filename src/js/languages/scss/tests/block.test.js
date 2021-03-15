import {
  CATEGORY_KEYWORD,
  CATEGORY_BRACKET,
  CATEGORY_DELIMITER,
  CATEGORY_NUMBER,
  CATEGORY_PROPERTY,
  CATEGORY_TAG,
  CATEGORY_ATRULE,
  CATEGORY_TEXT,
} from '../../../constants/categories';


describe( 'scss', () => {
  test( 'can find blocks.', () => {
    const scss = `
      *{}
      * {}
      body{padding: 0 !important}
      body { padding: 0 !important }
      @media screen and (max-width: 1000px) {
        body {
          padding: 3rem;
        }
      }
    `;

    expect( scss ).toBeTokenized( 'scss', [
      [ CATEGORY_TAG, '*' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_BRACKET, '}' ],

      [ CATEGORY_TAG, '*' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_BRACKET, '}' ],

      [ CATEGORY_TAG, 'body' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_PROPERTY, 'padding' ],
      [ CATEGORY_DELIMITER, ':' ],
      [ CATEGORY_NUMBER, '0' ],
      [ CATEGORY_KEYWORD, '!important' ],
      [ CATEGORY_BRACKET, '}' ],

      [ CATEGORY_TAG, 'body' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_PROPERTY, 'padding' ],
      [ CATEGORY_DELIMITER, ':' ],
      [ CATEGORY_NUMBER, '0' ],
      [ CATEGORY_KEYWORD, '!important' ],
      [ CATEGORY_BRACKET, '}' ],

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
} );
