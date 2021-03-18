import {
  CATEGORY_BRACKET, CATEGORY_OPERATOR, CATEGORY_BOOLEAN,
  CATEGORY_FUNCTION, CATEGORY_CLASS, CATEGORY_DELIMITER, CATEGORY_IDENTIFIER, CATEGORY_KEYWORD,
} from '../../../constants/categories';


describe( 'javascript', () => {
  test( 'can tokenize functions.', () => {
    expect( `func()` ).toBeTokenized( 'javascript', [
      [ CATEGORY_FUNCTION, 'func' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_BRACKET, ')' ],
    ] );

    expect( `func   ()` ).toBeTokenized( 'javascript', [
      [ CATEGORY_FUNCTION, 'func' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_BRACKET, ')' ],
    ] );
  } );

  // https://stackoverflow.com/questions/2008279/validate-a-javascript-function-name
  test( 'can tokenize functions that contains ASCII characters.', () => {
    expect( `関数()` ).toBeTokenized( 'javascript', [
      [ CATEGORY_FUNCTION, '関数' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_BRACKET, ')' ],
    ] );

    expect( `über()` ).toBeTokenized( 'javascript', [
      [ CATEGORY_FUNCTION, 'über' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_BRACKET, ')' ],
    ] );
  } );

  test( 'can tokenize member methods.', () => {
    expect( `Array.isArray()` ).toBeTokenized( 'javascript', [
      [ CATEGORY_CLASS, 'Array' ],
      [ CATEGORY_DELIMITER, '.' ],
      [ CATEGORY_FUNCTION, 'isArray' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_BRACKET, ')' ],
    ] );

    expect( `instance.init()` ).toBeTokenized( 'javascript', [
      [ CATEGORY_IDENTIFIER, 'instance' ],
      [ CATEGORY_DELIMITER, '.' ],
      [ CATEGORY_FUNCTION, 'init' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_BRACKET, ')' ],
    ] );
  } );

  test( 'can tokenize object shorthands for methods.', () => {
    expect( `{ init() {} }` ).toBeTokenized( 'javascript', [
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
    expect( `for ()` ).toBeTokenized( 'javascript', [
      [ CATEGORY_KEYWORD, 'for' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_BRACKET, ')' ],
    ] );

    expect( `while ()` ).toBeTokenized( 'javascript', [
      [ CATEGORY_KEYWORD, 'while' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_BRACKET, ')' ],
    ] );
  } );

  test( 'can tokenize an arrow function.', () => {
    expect( `() => true` ).toBeTokenized( 'javascript', [
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_BRACKET, ')' ],
      [ CATEGORY_OPERATOR, '=>' ],
      [ CATEGORY_BOOLEAN, 'true' ],
    ] );
  } );
} );
