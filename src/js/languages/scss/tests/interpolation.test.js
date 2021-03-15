import {
  CATEGORY_ATRULE, CATEGORY_BRACKET, CATEGORY_DELIMITER, CATEGORY_FUNCTION, CATEGORY_NUMBER,
  CATEGORY_PROPERTY, CATEGORY_SELECTOR, CATEGORY_STRING, CATEGORY_TAG,
  CATEGORY_TEXT, CATEGORY_VARIABLE,
} from '../../../constants/categories';


describe( 'scss', () => {
  test( 'can tokenize interpolation in a string.', () => {
    expect( `'something #{ $variable } something'` ).toBeTokenized( 'scss', [
      [ CATEGORY_STRING, '\'' ],
      [ CATEGORY_STRING, 'something ' ],
      [ CATEGORY_DELIMITER, '#{' ],
      [ CATEGORY_VARIABLE, '$variable' ],
      [ CATEGORY_DELIMITER, '}' ],
      [ CATEGORY_STRING, ' something' ],
      [ CATEGORY_STRING, '\'' ],
    ] );

    expect( `"something #{ $variable } something"` ).toBeTokenized( 'scss', [
      [ CATEGORY_STRING, '"' ],
      [ CATEGORY_STRING, 'something ' ],
      [ CATEGORY_DELIMITER, '#{' ],
      [ CATEGORY_VARIABLE, '$variable' ],
      [ CATEGORY_DELIMITER, '}' ],
      [ CATEGORY_STRING, ' something' ],
      [ CATEGORY_STRING, '"' ],
    ] );
  } );

  test( 'can tokenize interpolation in a url.', () => {
    expect( `@import url( '#{ $prefix }.scss' );` ).toBeTokenized( 'scss', [
      [ CATEGORY_ATRULE, '@import' ],
      [ CATEGORY_FUNCTION, 'url' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_STRING, '\'' ],
      [ CATEGORY_DELIMITER, '#{' ],
      [ CATEGORY_VARIABLE, '$prefix' ],
      [ CATEGORY_DELIMITER, '}' ],
      [ CATEGORY_STRING, '.scss' ],
      [ CATEGORY_STRING, '\'' ],
      [ CATEGORY_BRACKET, ')' ],
      [ CATEGORY_DELIMITER, ';' ],
    ] );

    // Without string notation
    expect( `@import url( #{ $prefix }.scss );` ).toBeTokenized( 'scss', [
      [ CATEGORY_ATRULE, '@import' ],
      [ CATEGORY_FUNCTION, 'url' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_DELIMITER, '#{' ],
      [ CATEGORY_VARIABLE, '$prefix' ],
      [ CATEGORY_DELIMITER, '}' ],
      [ CATEGORY_STRING, '.scss ' ],
      [ CATEGORY_BRACKET, ')' ],
      [ CATEGORY_DELIMITER, ';' ],
    ] );
  } );

  test( 'can tokenize interpolation in a function.', () => {
    expect( `body { width: calc( 100vw - #{ $offset } ) }` ).toBeTokenized( 'scss', [
      [ CATEGORY_TAG, 'body' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_PROPERTY, 'width' ],
      [ CATEGORY_DELIMITER, ':' ],
      [ CATEGORY_FUNCTION, 'calc' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_NUMBER, '100' ],
      [ CATEGORY_TEXT, 'vw' ],
      [ CATEGORY_TEXT, '-' ],
      [ CATEGORY_DELIMITER, '#{' ],
      [ CATEGORY_VARIABLE, '$offset' ],
      [ CATEGORY_DELIMITER, '}' ],
      [ CATEGORY_BRACKET, ')' ],
      [ CATEGORY_BRACKET, '}' ]
    ] );
  } );

  test( 'can tokenize interpolation in a selector.', () => {
    const selector = `
      #{ $parent } {
        &__#{ $child } {
          color: red;
        }
      }
    `;

    expect( selector ).toBeTokenized( 'scss', [
      [ CATEGORY_DELIMITER, '#{' ],
      [ CATEGORY_VARIABLE, '$parent' ],
      [ CATEGORY_DELIMITER, '}' ],
      [ CATEGORY_BRACKET, '{' ],

      [ CATEGORY_SELECTOR, '&__' ],
      [ CATEGORY_DELIMITER, '#{' ],
      [ CATEGORY_VARIABLE, '$child' ],
      [ CATEGORY_DELIMITER, '}' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_PROPERTY, 'color' ],
      [ CATEGORY_DELIMITER, ':' ],
      [ CATEGORY_TEXT, 'red' ],
      [ CATEGORY_DELIMITER, ';' ],
      [ CATEGORY_BRACKET, '}' ],

      [ CATEGORY_BRACKET, '}' ]
    ] );
  } );
} );
