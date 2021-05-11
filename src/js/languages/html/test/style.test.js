import {
  CATEGORY_BRACKET,
  CATEGORY_DELIMITER, CATEGORY_PROPERTY, CATEGORY_STRING,
  CATEGORY_TAG, CATEGORY_TAG_CLOSE, CATEGORY_TEXT,
} from '../../../constants/categories';


describe( 'html', () => {
  test( 'can tokenize CSS in style tags.', () => {
    const style = `
      <style>
        body {
          color: red;
          font-family: 'Times New Roman', sans-serif;
        }
      </style>
    `;

    expect( style ).toBeTokenized( 'html', [
      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_TAG, 'style' ],
      [ CATEGORY_BRACKET, '>' ],

      [ CATEGORY_TAG, 'body' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_PROPERTY, 'color' ],
      [ CATEGORY_DELIMITER, ':' ],
      [ CATEGORY_TEXT, 'red' ],
      [ CATEGORY_DELIMITER, ';' ],
      [ CATEGORY_PROPERTY, 'font-family' ],
      [ CATEGORY_DELIMITER, ':' ],
      [ CATEGORY_STRING, "'Times New Roman'" ],
      [ CATEGORY_DELIMITER, ',' ],
      [ CATEGORY_TEXT, 'sans-serif' ],
      [ CATEGORY_DELIMITER, ';' ],
      [ CATEGORY_BRACKET, '}' ],

      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_DELIMITER, '/' ],
      [ CATEGORY_TAG_CLOSE, 'style' ],
      [ CATEGORY_BRACKET, '>' ],
    ] );
  } );
} );
