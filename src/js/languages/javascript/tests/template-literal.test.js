import {
  CATEGORY_DELIMITER,
  CATEGORY_STRING,
  CATEGORY_IDENTIFIER, CATEGORY_CLASS, CATEGORY_FUNCTION, CATEGORY_BRACKET,
} from '../../../constants/categories';


describe( 'javascript', () => {
  test( 'can tokenize template literals.', () => {
    expect( '`template`' ).toBeTokenized( 'javascript', [
      [ CATEGORY_STRING, '`' ],
      [ CATEGORY_STRING, 'template' ],
      [ CATEGORY_STRING, '`' ],
    ] );

    const multiline = `\`line1
      line2
      line3\``;

    expect( multiline ).toBeTokenized( 'javascript', [
      [ CATEGORY_STRING, '`' ],
      [ CATEGORY_STRING, 'line1' ],
      [ CATEGORY_STRING, '      line2' ],
      [ CATEGORY_STRING, '      line3' ],
      [ CATEGORY_STRING, '`' ],
    ] );
  } );

  test( 'can tokenize template literals with escaped backticks.', () => {
    expect( '`template \\` \\` `' ).toBeTokenized( 'javascript', [
      [ CATEGORY_STRING, '`' ],
      [ CATEGORY_STRING, 'template \\` \\` ' ],
      [ CATEGORY_STRING, '`' ],
    ] );
  } );

  test( 'can tokenize template literals with expressions.', () => {
    expect( '`template${ Array.isArray( expression ) }`' ).toBeTokenized( 'javascript', [
      [ CATEGORY_STRING, '`' ],
      [ CATEGORY_STRING, 'template' ],
      [ CATEGORY_DELIMITER, '${' ],
      [ CATEGORY_CLASS, 'Array' ],
      [ CATEGORY_DELIMITER, '.' ],
      [ CATEGORY_FUNCTION, 'isArray' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_IDENTIFIER, 'expression' ],
      [ CATEGORY_BRACKET, ')' ],
      [ CATEGORY_DELIMITER, '}' ],
      [ CATEGORY_STRING, '`' ],
    ] );
  } );

  test( 'can tokenize nested template literals.', () => {
    expect( '`template${ `nested${ expression }` }`' ).toBeTokenized( 'javascript', [
      [ CATEGORY_STRING, '`' ],
      [ CATEGORY_STRING, 'template' ],
      [ CATEGORY_DELIMITER, '${' ],
      [ CATEGORY_STRING, '`' ],
      [ CATEGORY_STRING, 'nested' ],
      [ CATEGORY_DELIMITER, '${' ],
      [ CATEGORY_IDENTIFIER, 'expression' ],
      [ CATEGORY_DELIMITER, '}' ],
      [ CATEGORY_STRING, '`' ],
      [ CATEGORY_DELIMITER, '}' ],
      [ CATEGORY_STRING, '`' ],
    ] );
  } );
} );
