import { CATEGORY_TAG, CATEGORY_BRACKET, CATEGORY_SELECTOR, CATEGORY_OPERATOR } from '../../../constants/categories';


describe( 'css', () => {
  test( 'can tokenize selectors', () => {
    expect( 'body {}' ).toBeTokenized( 'css', [
      [ CATEGORY_TAG, 'body' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_BRACKET, '}' ],
    ] );

    expect( '.container {}' ).toBeTokenized( 'css', [
      [ CATEGORY_SELECTOR, '.container' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_BRACKET, '}' ],
    ] );

    expect( '.container .inner {}' ).toBeTokenized( 'css', [
      [ CATEGORY_SELECTOR, '.container' ],
      [ CATEGORY_SELECTOR, '.inner' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_BRACKET, '}' ],
    ] );
  } );

  test( 'can tokenize wildcards', () => {
    expect( '* {}' ).toBeTokenized( 'css', [
      [ CATEGORY_TAG, '*' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_BRACKET, '}' ],
    ] );
  } );

  test( 'can tokenize selectors with descendant combinators.', () => {
    expect( '.container > .button {}' ).toBeTokenized( 'css', [
      [ CATEGORY_SELECTOR, '.container' ],
      [ CATEGORY_OPERATOR, '>' ],
      [ CATEGORY_SELECTOR, '.button' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_BRACKET, '}' ],
    ] );

    expect( '.container + .button {}' ).toBeTokenized( 'css', [
      [ CATEGORY_SELECTOR, '.container' ],
      [ CATEGORY_OPERATOR, '+' ],
      [ CATEGORY_SELECTOR, '.button' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_BRACKET, '}' ],
    ] );

    expect( '.container ~ .button {}' ).toBeTokenized( 'css', [
      [ CATEGORY_SELECTOR, '.container' ],
      [ CATEGORY_OPERATOR, '~' ],
      [ CATEGORY_SELECTOR, '.button' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_BRACKET, '}' ],
    ] );
  } );
} );
