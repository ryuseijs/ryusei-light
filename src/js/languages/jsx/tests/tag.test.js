import {
  CATEGORY_ATTRIBUTE,
  CATEGORY_BRACKET, CATEGORY_CLASS, CATEGORY_DELIMITER, CATEGORY_IDENTIFIER, CATEGORY_KEYWORD,
  CATEGORY_OPERATOR, CATEGORY_TAG, CATEGORY_TEXT, CATEGORY_VALUE,
} from '../../../constants/categories';


describe( 'jsx', () => {
  test( 'can tokenize paired tags.', () => {
    const jsx = `
      function Layout( { children, isHome } ) {
        return (
          <div className={ isHome ? styles.home : styles.layout }>
            { children }
          </div>
        );
      }
    `;

    expect( jsx ).toBeTokenized( 'jsx', [
      [ CATEGORY_KEYWORD, 'function' ],
      [ CATEGORY_CLASS, 'Layout' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_IDENTIFIER, 'children' ],
      [ CATEGORY_DELIMITER, ',' ],
      [ CATEGORY_IDENTIFIER, 'isHome' ],
      [ CATEGORY_BRACKET, '}' ],
      [ CATEGORY_BRACKET, ')' ],
      [ CATEGORY_BRACKET, '{' ],

      [ CATEGORY_KEYWORD, 'return' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_TAG, 'div' ],
      [ CATEGORY_ATTRIBUTE, 'className' ],
      [ CATEGORY_DELIMITER, '=' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_IDENTIFIER, 'isHome' ],
      [ CATEGORY_OPERATOR, '?' ],
      [ CATEGORY_IDENTIFIER, 'styles' ],
      [ CATEGORY_DELIMITER, '.' ],
      [ CATEGORY_IDENTIFIER, 'home' ],
      [ CATEGORY_OPERATOR, ':' ],
      [ CATEGORY_IDENTIFIER, 'styles' ],
      [ CATEGORY_DELIMITER, '.' ],
      [ CATEGORY_IDENTIFIER, 'layout' ],
      [ CATEGORY_BRACKET, '}' ],
      [ CATEGORY_BRACKET, '>' ],

      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_IDENTIFIER, 'children' ],
      [ CATEGORY_BRACKET, '}' ],

      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_DELIMITER, '/' ],
      [ CATEGORY_TAG, 'div' ],
      [ CATEGORY_BRACKET, '>' ],

      [ CATEGORY_BRACKET, ')' ],
      [ CATEGORY_DELIMITER, ';' ],
      [ CATEGORY_BRACKET, '}' ],
    ] );
  } );

  test( 'can tokenize self closed tags', () => {
    const jsx = `
      const line = <hr className="line" />;
    `;

    expect( jsx ).toBeTokenized( 'jsx', [
      [ CATEGORY_KEYWORD, 'const' ],
      [ CATEGORY_IDENTIFIER, 'line' ],
      [ CATEGORY_OPERATOR, '=' ],

      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_TAG, 'hr' ],
      [ CATEGORY_ATTRIBUTE, 'className' ],
      [ CATEGORY_DELIMITER, '=' ],
      [ CATEGORY_VALUE, '"line"' ],
      [ CATEGORY_DELIMITER, '/' ],
      [ CATEGORY_BRACKET, '>' ],
      [ CATEGORY_DELIMITER, ';' ],
    ] );
  } );

  test( 'can tokenize a tag fragment.', () => {
    const jsx = `
      return (
        <>
          <span>a</span>
          <span>b</span>
        </>
      );
    `;

    expect( jsx ).toBeTokenized( 'jsx', [
      [ CATEGORY_KEYWORD, 'return' ],
      [ CATEGORY_BRACKET, '(' ],

      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_BRACKET, '>' ],

      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_TAG, 'span' ],
      [ CATEGORY_BRACKET, '>' ],
      [ CATEGORY_TEXT, 'a' ],
      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_DELIMITER, '/' ],
      [ CATEGORY_TAG, 'span' ],
      [ CATEGORY_BRACKET, '>' ],

      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_TAG, 'span' ],
      [ CATEGORY_BRACKET, '>' ],
      [ CATEGORY_TEXT, 'b' ],
      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_DELIMITER, '/' ],
      [ CATEGORY_TAG, 'span' ],
      [ CATEGORY_BRACKET, '>' ],

      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_DELIMITER, '/' ],
      [ CATEGORY_BRACKET, '>' ],

      [ CATEGORY_BRACKET, ')' ],
      [ CATEGORY_DELIMITER, ';' ],
    ] );
  } );
} );
