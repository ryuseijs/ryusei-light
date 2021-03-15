import {
  CATEGORY_ATTRIBUTE, CATEGORY_BRACKET, CATEGORY_DELIMITER, CATEGORY_FUNCTION, CATEGORY_IDENTIFIER,
  CATEGORY_KEYWORD, CATEGORY_OPERATOR, CATEGORY_TAG, CATEGORY_TEXT,
} from '../../../constants/categories';


describe( 'jsx', () => {
  test( 'can tokenize embedded js code.', () => {
    const jsx = `
      const element = (
        <h1>
          Heading: { escape( value ) }
        </h1>
      );
    `;

    expect( jsx ).toBeTokenized( 'jsx', [
      [ CATEGORY_KEYWORD, 'const' ],
      [ CATEGORY_IDENTIFIER, 'element' ],
      [ CATEGORY_OPERATOR, '=' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_TAG, 'h1' ],
      [ CATEGORY_BRACKET, '>' ],
      [ CATEGORY_TEXT, 'Heading:' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_FUNCTION, 'escape' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_IDENTIFIER, 'value' ],
      [ CATEGORY_BRACKET, ')' ],
      [ CATEGORY_BRACKET, '}' ],

      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_DELIMITER, '/' ],
      [ CATEGORY_TAG, 'h1' ],
      [ CATEGORY_BRACKET, '>' ],
      [ CATEGORY_BRACKET, ')' ],
      [ CATEGORY_DELIMITER, ';' ],
    ] );
  } );

  test( 'can tokenize embedded js code as an attribute.', () => {
    const jsx = `
      const element = <img src={ user.avatar } />
    `;

    expect( jsx ).toBeTokenized( 'jsx', [
      [ CATEGORY_KEYWORD, 'const' ],
      [ CATEGORY_IDENTIFIER, 'element' ],
      [ CATEGORY_OPERATOR, '=' ],
      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_TAG, 'img' ],
      [ CATEGORY_ATTRIBUTE, 'src' ],
      [ CATEGORY_DELIMITER, '=' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_IDENTIFIER, 'user' ],
      [ CATEGORY_DELIMITER, '.' ],
      [ CATEGORY_IDENTIFIER, 'avatar' ],
      [ CATEGORY_BRACKET, '}' ],

      [ CATEGORY_DELIMITER, '/' ],
      [ CATEGORY_BRACKET, '>' ],
    ] );
  } );
} );
