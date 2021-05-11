import {
  CATEGORY_BRACKET,
  CATEGORY_DELIMITER,
  CATEGORY_FUNCTION,
  CATEGORY_IDENTIFIER,
  CATEGORY_STRING,
  CATEGORY_TAG,
  CATEGORY_TAG_CLOSE,
} from '../../../constants/categories';


describe( 'html', () => {
  test( 'can tokenize JavaScript in style tags.', () => {
    const script = `
      <script>
        console.log( 'hi!' );
      </script>
    `;

    expect( script ).toBeTokenized( 'html', [
      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_TAG, 'script' ],
      [ CATEGORY_BRACKET, '>' ],

      [ CATEGORY_IDENTIFIER, 'console' ],
      [ CATEGORY_DELIMITER, '.' ],
      [ CATEGORY_FUNCTION, 'log' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_STRING, "'hi!'" ],
      [ CATEGORY_BRACKET, ')' ],
      [ CATEGORY_DELIMITER, ';' ],

      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_DELIMITER, '/' ],
      [ CATEGORY_TAG_CLOSE, 'script' ],
      [ CATEGORY_BRACKET, '>' ],
    ] );
  } );
} );
