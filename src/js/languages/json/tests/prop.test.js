import {
  CATEGORY_BOOLEAN,
  CATEGORY_BRACKET,
  CATEGORY_DELIMITER,
  CATEGORY_KEYWORD,
  CATEGORY_OPERATOR,
  CATEGORY_PROPERTY,
  CATEGORY_STRING,
} from '../../../constants/categories';


describe( 'json', () => {
  test( 'can tokenize props.', () => {
    const json = `{
      "name": "@ryuseijs/ryusei-light",
      "version": "0.0.1"
    }`;

    expect( json ).toBeTokenized( 'json', [
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_PROPERTY, '"name"' ],
      [ CATEGORY_OPERATOR, ':' ],
      [ CATEGORY_STRING, '"@ryuseijs/ryusei-light"' ],
      [ CATEGORY_DELIMITER, ',' ],
      [ CATEGORY_PROPERTY, '"version"' ],
      [ CATEGORY_OPERATOR, ':' ],
      [ CATEGORY_STRING, '"0.0.1"' ],
      [ CATEGORY_BRACKET, '}' ],
    ] );
  } );

  test( 'can tokenize null.', () => {
    const json = `{ "name": null }`;

    expect( json ).toBeTokenized( 'json', [
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_PROPERTY, '"name"' ],
      [ CATEGORY_OPERATOR, ':' ],
      [ CATEGORY_KEYWORD, 'null' ],
      [ CATEGORY_BRACKET, '}' ],
    ] );
  } );

  test( 'can tokenize booleans.', () => {
    const json = `{ "success": true, "fail": false }`;

    expect( json ).toBeTokenized( 'json', [
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_PROPERTY, '"success"' ],
      [ CATEGORY_OPERATOR, ':' ],
      [ CATEGORY_BOOLEAN, 'true' ],
      [ CATEGORY_DELIMITER, ',' ],
      [ CATEGORY_PROPERTY, '"fail"' ],
      [ CATEGORY_OPERATOR, ':' ],
      [ CATEGORY_BOOLEAN, 'false' ],
      [ CATEGORY_BRACKET, '}' ],
    ] );
  } );
} );
