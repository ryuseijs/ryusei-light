import {
  CATEGORY_BRACKET, CATEGORY_CLASS, CATEGORY_DELIMITER, CATEGORY_FUNCTION, CATEGORY_IDENTIFIER,
  CATEGORY_KEYWORD, CATEGORY_OPERATOR,
} from '../../../constants/categories';


describe( 'typescript', () => {
  test( 'can tokenize interface.', () => {
    const ts = `
      interface CustomDivElement extends HTMLDivElement {
        selectionStart: number,
        selectionEnd: number,
        setSelection( number, number ): void;
      }
    `;

    expect( ts ).toBeTokenized( 'typescript', [
      [ CATEGORY_KEYWORD, 'interface' ],
      [ CATEGORY_CLASS, 'CustomDivElement' ],
      [ CATEGORY_KEYWORD, 'extends' ],
      [ CATEGORY_CLASS, 'HTMLDivElement' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_IDENTIFIER, 'selectionStart' ],
      [ CATEGORY_OPERATOR, ':' ],
      [ CATEGORY_KEYWORD, 'number' ],
      [ CATEGORY_DELIMITER, ',' ],
      [ CATEGORY_IDENTIFIER, 'selectionEnd' ],
      [ CATEGORY_OPERATOR, ':' ],
      [ CATEGORY_KEYWORD, 'number' ],
      [ CATEGORY_DELIMITER, ',' ],
      [ CATEGORY_FUNCTION, 'setSelection' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_KEYWORD, 'number' ],
      [ CATEGORY_DELIMITER, ',' ],
      [ CATEGORY_KEYWORD, 'number' ],
      [ CATEGORY_BRACKET, ')' ],
      [ CATEGORY_OPERATOR, ':' ],
      [ CATEGORY_KEYWORD, 'void' ],
      [ CATEGORY_DELIMITER, ';' ],
      [ CATEGORY_BRACKET, '}' ],
    ] );
  } );

  test( 'can tokenize a namespace.', () => {
    const ts = `
      namespace Lexer {
        export interface Grammar {
          main: Tokenizers[];
          [ key: string ]: Tokenizers[];
        }
      }
    `;

    expect( ts ).toBeTokenized( 'typescript', [
      [ CATEGORY_KEYWORD, 'namespace' ],
      [ CATEGORY_CLASS, 'Lexer' ],
      [ CATEGORY_BRACKET, '{' ],

      [ CATEGORY_KEYWORD, 'export' ],
      [ CATEGORY_KEYWORD, 'interface' ],
      [ CATEGORY_CLASS, 'Grammar' ],
      [ CATEGORY_BRACKET, '{' ],

      [ CATEGORY_IDENTIFIER, 'main' ],
      [ CATEGORY_OPERATOR, ':' ],
      [ CATEGORY_CLASS, 'Tokenizers' ],
      [ CATEGORY_BRACKET, '[' ],
      [ CATEGORY_BRACKET, ']' ],
      [ CATEGORY_DELIMITER, ';' ],

      [ CATEGORY_BRACKET, '[' ],
      [ CATEGORY_IDENTIFIER, 'key' ],
      [ CATEGORY_OPERATOR, ':' ],
      [ CATEGORY_KEYWORD, 'string' ],
      [ CATEGORY_BRACKET, ']' ],
      [ CATEGORY_OPERATOR, ':' ],
      [ CATEGORY_CLASS, 'Tokenizers' ],
      [ CATEGORY_BRACKET, '[' ],
      [ CATEGORY_BRACKET, ']' ],
      [ CATEGORY_DELIMITER, ';' ],

      [ CATEGORY_BRACKET, '}' ],
      [ CATEGORY_BRACKET, '}' ],
    ] );
  } );

  test( 'can tokenize a function with a type guard.', () => {
    const ts = `
      function isArray<T>( subject: T[] ): subject is T[] {
        return Array.isArray( subject );
      }
    `;

    expect( ts ).toBeTokenized( 'typescript', [
      [ CATEGORY_KEYWORD, 'function' ],
      [ CATEGORY_IDENTIFIER, 'isArray' ],
      [ CATEGORY_OPERATOR, '<' ],
      [ CATEGORY_CLASS, 'T' ],
      [ CATEGORY_OPERATOR, '>' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_IDENTIFIER, 'subject' ],
      [ CATEGORY_OPERATOR, ':' ],
      [ CATEGORY_CLASS, 'T' ],
      [ CATEGORY_BRACKET, '[' ],
      [ CATEGORY_BRACKET, ']' ],
      [ CATEGORY_BRACKET, ')' ],
      [ CATEGORY_OPERATOR, ':' ],
      [ CATEGORY_IDENTIFIER, 'subject' ],
      [ CATEGORY_KEYWORD, 'is' ],
      [ CATEGORY_CLASS, 'T' ],
      [ CATEGORY_BRACKET, '[' ],
      [ CATEGORY_BRACKET, ']' ],
      [ CATEGORY_BRACKET, '{' ],

      [ CATEGORY_KEYWORD, 'return' ],
      [ CATEGORY_CLASS, 'Array' ],
      [ CATEGORY_DELIMITER, '.' ],
      [ CATEGORY_FUNCTION, 'isArray' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_IDENTIFIER, 'subject' ],
      [ CATEGORY_BRACKET, ')' ],
      [ CATEGORY_DELIMITER, ';' ],

      [ CATEGORY_BRACKET, '}' ],
    ] );
  } );
} );
