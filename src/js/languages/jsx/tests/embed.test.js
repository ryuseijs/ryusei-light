import {
  CATEGORY_ATTRIBUTE, CATEGORY_BRACKET, CATEGORY_CLASS, CATEGORY_DELIMITER, CATEGORY_FUNCTION, CATEGORY_IDENTIFIER,
  CATEGORY_KEYWORD, CATEGORY_NUMBER, CATEGORY_OPERATOR, CATEGORY_TAG, CATEGORY_TEXT,
} from '../../../constants/categories';


describe( 'jsx', () => {
  test( 'can tokenize embedded js code by `{}`.', () => {
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

  test( 'can tokenize embedded js code that contains `{}`.', () => {
    const jsx = `
      return <Container options={ { position: { x: 100, y: 200 }, rotation: { x: 90, y: 30 } } } />
    `;

    expect( jsx ).toBeTokenized( 'jsx', [
      [ CATEGORY_KEYWORD, 'return' ],
      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_CLASS, 'Container' ],

      [ CATEGORY_ATTRIBUTE, 'options' ],
      [ CATEGORY_DELIMITER, '=' ],
      [ CATEGORY_BRACKET, '{' ],

      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_IDENTIFIER, 'position' ],
      [ CATEGORY_OPERATOR, ':' ],

      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_IDENTIFIER, 'x' ],
      [ CATEGORY_OPERATOR, ':' ],
      [ CATEGORY_NUMBER, '100' ],
      [ CATEGORY_DELIMITER, ',' ],
      [ CATEGORY_IDENTIFIER, 'y' ],
      [ CATEGORY_OPERATOR, ':' ],
      [ CATEGORY_NUMBER, '200' ],
      [ CATEGORY_BRACKET, '}' ],
      [ CATEGORY_DELIMITER, ',' ],

      [ CATEGORY_IDENTIFIER, 'rotation' ],
      [ CATEGORY_OPERATOR, ':' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_IDENTIFIER, 'x' ],
      [ CATEGORY_OPERATOR, ':' ],
      [ CATEGORY_NUMBER, '90' ],
      [ CATEGORY_DELIMITER, ',' ],
      [ CATEGORY_IDENTIFIER, 'y' ],
      [ CATEGORY_OPERATOR, ':' ],
      [ CATEGORY_NUMBER, '30' ],
      [ CATEGORY_BRACKET, '}' ],

      [ CATEGORY_BRACKET, '}' ], // object
      [ CATEGORY_BRACKET, '}' ], // position

      [ CATEGORY_DELIMITER, '/' ],
      [ CATEGORY_BRACKET, '>' ],
    ] );
  } );
} );
