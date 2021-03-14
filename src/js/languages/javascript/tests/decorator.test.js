import {
  CATEGORY_DECORATOR,
  CATEGORY_BRACKET,
  CATEGORY_STRING,
  CATEGORY_KEYWORD,
  CATEGORY_CLASS, CATEGORY_FUNCTION,
} from '../../../constants/categories';


describe( 'javascript', () => {
  test( 'can tokenize decorators.', () => {
    expect( '@decorator' ).toBeTokenized( 'javascript', [ [ CATEGORY_DECORATOR, '@decorator' ] ] );

    expect( `@decorator( 'param' )` ).toBeTokenized( 'javascript', [
      [ CATEGORY_DECORATOR, '@decorator' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_STRING, `'param'` ],
      [ CATEGORY_BRACKET, ')' ],
    ] );
  } );

  test( 'can tokenize decorators in a class.', () => {
    const input = `
      class MyClass {
        @decorator
        init() {}
      }
    `;

    expect( input ).toBeTokenized( 'javascript', [
      [ CATEGORY_KEYWORD, 'class' ],
      [ CATEGORY_CLASS, 'MyClass' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_DECORATOR, '@decorator' ],
      [ CATEGORY_FUNCTION, 'init' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_BRACKET, ')' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_BRACKET, '}' ],
      [ CATEGORY_BRACKET, '}' ],
    ] );
  } );
} );
