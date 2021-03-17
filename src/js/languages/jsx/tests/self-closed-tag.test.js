import {
  CATEGORY_ATTRIBUTE,
  CATEGORY_BRACKET, CATEGORY_CLASS, CATEGORY_DELIMITER, CATEGORY_KEYWORD,
  CATEGORY_OPERATOR, CATEGORY_STRING, CATEGORY_VALUE,
} from '../../../constants/categories';


describe( 'jsx', () => {
  test( 'can tokenize self closed tags.', () => {
    expect( '<Button isPrimary />' ).toBeTokenized( 'jsx', [
      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_CLASS, 'Button' ],
      [ CATEGORY_ATTRIBUTE, 'isPrimary' ],
      [ CATEGORY_DELIMITER, '/' ],
      [ CATEGORY_BRACKET, '>' ],
    ] );
  } );

  test( 'can tokenize self closed tags with embed code.', () => {
    const jsx = `
      const Component = () => (
        <Button className={ '/>' } type="button" data-temp="/>" data-temp='/>' />
      )
    `;

    expect( jsx ).toBeTokenized( 'jsx', [
      [ CATEGORY_KEYWORD, 'const' ],
      [ CATEGORY_CLASS, 'Component' ],
      [ CATEGORY_OPERATOR, '=' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_BRACKET, ')' ],
      [ CATEGORY_OPERATOR, '=>' ],
      [ CATEGORY_BRACKET, '(' ],

      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_CLASS, 'Button' ],

      [ CATEGORY_ATTRIBUTE, 'className' ],
      [ CATEGORY_DELIMITER, '=' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_STRING, `'/>'` ],
      [ CATEGORY_BRACKET, '}' ],

      [ CATEGORY_ATTRIBUTE, 'type' ],
      [ CATEGORY_DELIMITER, '=' ],
      [ CATEGORY_VALUE, '"button"' ],

      [ CATEGORY_ATTRIBUTE, 'data-temp' ],
      [ CATEGORY_DELIMITER, '=' ],
      [ CATEGORY_VALUE, '"/>"' ],

      [ CATEGORY_ATTRIBUTE, 'data-temp' ],
      [ CATEGORY_DELIMITER, '=' ],
      [ CATEGORY_VALUE, `'/>'` ],

      [ CATEGORY_DELIMITER, '/' ],
      [ CATEGORY_BRACKET, '>' ],

      [ CATEGORY_BRACKET, ')' ],
    ] );
  } );
} );
