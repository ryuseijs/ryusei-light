import {
  CATEGORY_ATTRIBUTE,
  CATEGORY_BRACKET,
  CATEGORY_DELIMITER,
  CATEGORY_TAG,
  CATEGORY_TAG_CLOSE,
  CATEGORY_VALUE,
} from '../../../constants/categories';


describe( 'svg', () => {
  test( 'can tokenize tags.', () => {
    const xml = `
      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
       <path d="m15 31 21-21m-32 10 11 11" stroke="#000" stroke-linecap="round" stroke-width="6"/>
      </svg>
    `;

    expect( xml ).toBeTokenized( 'xml', [
      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_TAG, 'svg' ],
      [ CATEGORY_ATTRIBUTE, 'viewBox' ],
      [ CATEGORY_DELIMITER, '=' ],
      [ CATEGORY_VALUE, '"0 0 40 40"' ],
      [ CATEGORY_ATTRIBUTE, 'xmlns' ],
      [ CATEGORY_DELIMITER, '=' ],
      [ CATEGORY_VALUE, '"http://www.w3.org/2000/svg"' ],
      [ CATEGORY_BRACKET, '>' ],

      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_TAG, 'path' ],
      [ CATEGORY_ATTRIBUTE, 'd' ],
      [ CATEGORY_DELIMITER, '=' ],
      [ CATEGORY_VALUE, '"m15 31 21-21m-32 10 11 11"' ],
      [ CATEGORY_ATTRIBUTE, 'stroke' ],
      [ CATEGORY_DELIMITER, '=' ],
      [ CATEGORY_VALUE, '"#000"' ],
      [ CATEGORY_ATTRIBUTE, 'stroke-linecap' ],
      [ CATEGORY_DELIMITER, '=' ],
      [ CATEGORY_VALUE, '"round"' ],
      [ CATEGORY_ATTRIBUTE, 'stroke-width' ],
      [ CATEGORY_DELIMITER, '=' ],
      [ CATEGORY_VALUE, '"6"' ],
      [ CATEGORY_DELIMITER, '/' ],
      [ CATEGORY_BRACKET, '>' ],

      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_DELIMITER, '/' ],
      [ CATEGORY_TAG_CLOSE, 'svg' ],
      [ CATEGORY_BRACKET, '>' ],
    ] );
  } );
} );
