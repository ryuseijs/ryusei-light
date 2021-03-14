import {
  CATEGORY_FUNCTION,
  CATEGORY_BRACKET,
  CATEGORY_KEYWORD,
  CATEGORY_IDENTIFIER,
  CATEGORY_DELIMITER, CATEGORY_CLASS,
} from '../../../constants/categories';


describe( 'common', () => {
  test( 'can tokenize functions.', () => {
    expect( `func()` ).toBeTokenized( 'common', [
      [ CATEGORY_FUNCTION, 'func' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_BRACKET, ')' ],
    ] );

    expect( `func   ()` ).toBeTokenized( 'common', [
      [ CATEGORY_FUNCTION, 'func' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_BRACKET, ')' ],
    ] );
  } );

  test( 'can tokenize member methods.', () => {
    expect( `Array.isArray()` ).toBeTokenized( 'common', [
      [ CATEGORY_CLASS, 'Array' ],
      [ CATEGORY_DELIMITER, '.' ],
      [ CATEGORY_FUNCTION, 'isArray' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_BRACKET, ')' ],
    ] );

    expect( `instance.init()` ).toBeTokenized( 'common', [
      [ CATEGORY_IDENTIFIER, 'instance' ],
      [ CATEGORY_DELIMITER, '.' ],
      [ CATEGORY_FUNCTION, 'init' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_BRACKET, ')' ],
    ] );
  } );

  test( 'can tokenize object shorthands for methods.', () => {
    expect( `{ init() {} }` ).toBeTokenized( 'common', [
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_FUNCTION, 'init' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_BRACKET, ')' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_BRACKET, '}' ],
      [ CATEGORY_BRACKET, '}' ],
    ] );
  } );

  test( 'should not tokenize flow controls leading brackets.', () => {
    expect( `for ()` ).toBeTokenized( 'common', [
      [ CATEGORY_KEYWORD, 'for' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_BRACKET, ')' ],
    ] );

    expect( `while ()` ).toBeTokenized( 'common', [
      [ CATEGORY_KEYWORD, 'while' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_BRACKET, ')' ],
    ] );
  } );
} );
