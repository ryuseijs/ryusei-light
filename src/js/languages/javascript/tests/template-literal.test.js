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
    expect( '`template${ Array.isArray( expression ) }`' ).toBeTokenizedWithDepth( 'javascript', [
      [ CATEGORY_STRING, '`', 1 ],
      [ CATEGORY_STRING, 'template', 1 ],
      [ CATEGORY_DELIMITER, '${', 2 ],
      [ CATEGORY_CLASS, 'Array', 2 ],
      [ CATEGORY_DELIMITER, '.', 2 ],
      [ CATEGORY_FUNCTION, 'isArray', 2 ],
      [ CATEGORY_BRACKET, '(', 2 ],
      [ CATEGORY_IDENTIFIER, 'expression', 2 ],
      [ CATEGORY_BRACKET, ')', 2 ],
      [ CATEGORY_DELIMITER, '}', 2 ],
      [ CATEGORY_STRING, '`', 1 ],
    ] );
  } );

  test( 'can tokenize nested template literals.', () => {
    expect( '`template${ `nested${ expression }` }`' ).toBeTokenizedWithDepth( 'javascript', [
      [ CATEGORY_STRING, '`', 1 ],
      [ CATEGORY_STRING, 'template', 1 ],
      [ CATEGORY_DELIMITER, '${', 2 ],
      [ CATEGORY_STRING, '`', 3 ],
      [ CATEGORY_STRING, 'nested', 3 ],
      [ CATEGORY_DELIMITER, '${', 4 ],
      [ CATEGORY_IDENTIFIER, 'expression', 4 ],
      [ CATEGORY_DELIMITER, '}', 4 ],
      [ CATEGORY_STRING, '`', 3 ],
      [ CATEGORY_DELIMITER, '}', 2 ],
      [ CATEGORY_STRING, '`', 1 ],
    ] );
  } );
} );
