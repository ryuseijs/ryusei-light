import {
  CATEGORY_TAG, CATEGORY_BRACKET, CATEGORY_PROPERTY, CATEGORY_DELIMITER,
  CATEGORY_NUMBER, CATEGORY_TEXT, CATEGORY_FUNCTION,
} from '../../../constants/categories';


describe( 'css', () => {
  test( 'can tokenize props.', () => {
    const css = `
      body {
        color: red;
        font-family: monospaced;
        margin: 1px;
      }
    `;

    expect( css ).toBeTokenized( 'css', [
      [ CATEGORY_TAG, 'body' ],
      [ CATEGORY_BRACKET, '{' ],

      [ CATEGORY_PROPERTY, 'color' ],
      [ CATEGORY_DELIMITER, ':' ],
      [ CATEGORY_TEXT, 'red' ],
      [ CATEGORY_DELIMITER, ';' ],

      [ CATEGORY_PROPERTY, 'font-family' ],
      [ CATEGORY_DELIMITER, ':' ],
      [ CATEGORY_TEXT, 'monospaced' ],
      [ CATEGORY_DELIMITER, ';' ],

      [ CATEGORY_PROPERTY, 'margin' ],
      [ CATEGORY_DELIMITER, ':' ],
      [ CATEGORY_NUMBER, '1' ],
      [ CATEGORY_TEXT, 'px' ],
      [ CATEGORY_DELIMITER, ';' ],

      [ CATEGORY_BRACKET, '}' ],
    ] );
  } );

  test( 'can tokenize props with a prefix.', () => {
    expect( 'body { -webkit-filter: blur( 3px ) }' ).toBeTokenized( 'css', [
      [ CATEGORY_TAG, 'body' ],
      [ CATEGORY_BRACKET, '{' ],

      [ CATEGORY_PROPERTY, '-webkit-filter' ],
      [ CATEGORY_DELIMITER, ':' ],
      [ CATEGORY_FUNCTION, 'blur' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_NUMBER, '3' ],
      [ CATEGORY_TEXT, 'px' ],
      [ CATEGORY_BRACKET, ')' ],

      [ CATEGORY_BRACKET, '}' ],
    ] );
  } );
} );
