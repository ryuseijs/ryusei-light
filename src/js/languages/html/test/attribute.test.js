import {
  CATEGORY_ATTRIBUTE,
  CATEGORY_BRACKET,
  CATEGORY_DELIMITER,
  CATEGORY_TAG,
  CATEGORY_TAG_CLOSE,
  CATEGORY_VALUE,
} from '../../../constants/categories';


describe( 'html', () => {
  test( 'can tokenize attributes.', () => {
    expect( '<div class="container" role="presentation"></div>' ).toBeTokenized( 'html', [
      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_TAG, 'div' ],
      [ CATEGORY_ATTRIBUTE, 'class' ],
      [ CATEGORY_DELIMITER, '=' ],
      [ CATEGORY_VALUE, '"container"' ],
      [ CATEGORY_ATTRIBUTE, 'role' ],
      [ CATEGORY_DELIMITER, '=' ],
      [ CATEGORY_VALUE, '"presentation"' ],
      [ CATEGORY_BRACKET, '>' ],

      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_DELIMITER, '/' ],
      [ CATEGORY_TAG_CLOSE, 'div' ],
      [ CATEGORY_BRACKET, '>' ],
    ] );
  } );

  test( 'can tokenize multiline attributes.', () => {
    const tag = `
      <div
        class="container"
        role="presentation"
      ></div>
    `;

    expect( tag ).toBeTokenized( 'html', [
      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_TAG, 'div' ],
      [ CATEGORY_ATTRIBUTE, 'class' ],
      [ CATEGORY_DELIMITER, '=' ],
      [ CATEGORY_VALUE, '"container"' ],
      [ CATEGORY_ATTRIBUTE, 'role' ],
      [ CATEGORY_DELIMITER, '=' ],
      [ CATEGORY_VALUE, '"presentation"' ],
      [ CATEGORY_BRACKET, '>' ],

      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_DELIMITER, '/' ],
      [ CATEGORY_TAG_CLOSE, 'div' ],
      [ CATEGORY_BRACKET, '>' ],
    ] );
  } );
} );
