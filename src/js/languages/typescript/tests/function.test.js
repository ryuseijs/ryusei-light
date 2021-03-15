import {
  CATEGORY_FUNCTION,
  CATEGORY_IDENTIFIER,
  CATEGORY_KEYWORD,
  CATEGORY_OPERATOR,
  CATEGORY_BRACKET,
  CATEGORY_CLASS,
} from '../../../constants/categories';


describe( 'typescript', () => {
  test( 'can tokenize a function with typing.', () => {
    expect( 'function apply<T extends object>( value: T ) {}' ).toBeTokenized( 'typescript', [
      [ CATEGORY_KEYWORD, 'function' ],
      [ CATEGORY_FUNCTION, 'apply' ],
      [ CATEGORY_OPERATOR, '<' ],
      [ CATEGORY_CLASS, 'T' ],
      [ CATEGORY_KEYWORD, 'extends' ],
      [ CATEGORY_KEYWORD, 'object' ],
      [ CATEGORY_OPERATOR, '>' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_IDENTIFIER, 'value' ],
      [ CATEGORY_OPERATOR, ':' ],
      [ CATEGORY_CLASS, 'T' ],
      [ CATEGORY_BRACKET, ')' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_BRACKET, '}' ],
    ] );
  } );

  test( 'can tokenize arrow a function with typing.', () => {
    expect( '<T extends object> ( value: T ) => {}' ).toBeTokenized( 'typescript', [
      [ CATEGORY_OPERATOR, '<' ],
      [ CATEGORY_CLASS, 'T' ],
      [ CATEGORY_KEYWORD, 'extends' ],
      [ CATEGORY_KEYWORD, 'object' ],
      [ CATEGORY_OPERATOR, '>' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_IDENTIFIER, 'value' ],
      [ CATEGORY_OPERATOR, ':' ],
      [ CATEGORY_CLASS, 'T' ],
      [ CATEGORY_BRACKET, ')' ],
      [ CATEGORY_OPERATOR, '=>' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_BRACKET, '}' ],
    ] );
  } );

  test( 'can tokenize a method with typing.', () => {
    const ts = `
      {
        apply<T extends object>( value: T ) {}
      }
    `;

    expect( ts ).toBeTokenized( 'typescript', [
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_FUNCTION, 'apply' ],
      [ CATEGORY_OPERATOR, '<' ],
      [ CATEGORY_CLASS, 'T' ],
      [ CATEGORY_KEYWORD, 'extends' ],
      [ CATEGORY_KEYWORD, 'object' ],
      [ CATEGORY_OPERATOR, '>' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_IDENTIFIER, 'value' ],
      [ CATEGORY_OPERATOR, ':' ],
      [ CATEGORY_CLASS, 'T' ],
      [ CATEGORY_BRACKET, ')' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_BRACKET, '}' ],
      [ CATEGORY_BRACKET, '}' ]
    ] );
  } );
} );
