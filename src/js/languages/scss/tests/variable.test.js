import {
  CATEGORY_BRACKET, CATEGORY_DELIMITER, CATEGORY_PROPERTY, CATEGORY_SELECTOR,
  CATEGORY_TAG, CATEGORY_TEXT, CATEGORY_VARIABLE,
} from '../../../constants/categories';


describe( 'scss', () => {
  test( 'can tokenize a variable as a value.', () => {
    expect( '*{ margin: $variable }' ).toBeTokenized( 'scss', [
      [ CATEGORY_TAG, '*' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_PROPERTY, 'margin' ],
      [ CATEGORY_DELIMITER, ':' ],
      [ CATEGORY_VARIABLE, '$variable' ],
      [ CATEGORY_BRACKET, '}' ],
    ] );
  } );

  test( 'can tokenize a variable as a prop.', () => {
    expect( '*{ $variable: red }' ).toBeTokenized( 'scss', [
      [ CATEGORY_TAG, '*' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_VARIABLE, '$variable' ],
      [ CATEGORY_DELIMITER, ':' ],
      [ CATEGORY_TEXT, 'red' ],
      [ CATEGORY_BRACKET, '}' ],
    ] );
  } );

  test( 'can tokenize a variable as a selector.', () => {
    expect( '#{ $variable }{ color: red }' ).toBeTokenized( 'scss', [
      [ CATEGORY_DELIMITER, '#{' ],
      [ CATEGORY_VARIABLE, '$variable' ],
      [ CATEGORY_DELIMITER, '}' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_PROPERTY, 'color' ],
      [ CATEGORY_DELIMITER, ':' ],
      [ CATEGORY_TEXT, 'red' ],
      [ CATEGORY_BRACKET, '}' ],
    ] );

    expect( '.something__#{ $variable }{ color: red }' ).toBeTokenized( 'scss', [
      [ CATEGORY_SELECTOR, '.something__' ],
      [ CATEGORY_DELIMITER, '#{' ],
      [ CATEGORY_VARIABLE, '$variable' ],
      [ CATEGORY_DELIMITER, '}' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_PROPERTY, 'color' ],
      [ CATEGORY_DELIMITER, ':' ],
      [ CATEGORY_TEXT, 'red' ],
      [ CATEGORY_BRACKET, '}' ],
    ] );

    expect( '#{ $variable }__something__#{ $variable }{ color: red }' ).toBeTokenized( 'scss', [
      [ CATEGORY_DELIMITER, '#{' ],
      [ CATEGORY_VARIABLE, '$variable' ],
      [ CATEGORY_DELIMITER, '}' ],
      [ CATEGORY_SELECTOR, '__something__' ],
      [ CATEGORY_DELIMITER, '#{' ],
      [ CATEGORY_VARIABLE, '$variable' ],
      [ CATEGORY_DELIMITER, '}' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_PROPERTY, 'color' ],
      [ CATEGORY_DELIMITER, ':' ],
      [ CATEGORY_TEXT, 'red' ],
      [ CATEGORY_BRACKET, '}' ],
    ] );
  } );
} );
