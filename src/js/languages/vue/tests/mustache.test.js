import {
  CATEGORY_BRACKET, CATEGORY_DELIMITER, CATEGORY_IDENTIFIER, CATEGORY_OPERATOR,
  CATEGORY_STRING, CATEGORY_TAG, CATEGORY_TEXT,
} from '../../../constants/categories';


describe( 'vue', () => {
  test( 'can tokenize a mustache syntax.', () => {
    const vue = `
      <div>
        Message: {{ ok ? 'YES' : 'NO' }}
      </div>
    `;

    expect( vue ).toBeTokenized( 'vue', [
      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_TAG, 'div' ],
      [ CATEGORY_BRACKET, '>' ],
      [ CATEGORY_TEXT, 'Message:' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_IDENTIFIER, 'ok' ],
      [ CATEGORY_OPERATOR, '?' ],
      [ CATEGORY_STRING, '\'YES\'' ],
      [ CATEGORY_OPERATOR, ':' ],
      [ CATEGORY_STRING, '\'NO\'' ],
      [ CATEGORY_BRACKET, '}' ],
      [ CATEGORY_BRACKET, '}' ],
      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_DELIMITER, '/' ],
      [ CATEGORY_TAG, 'div' ],
      [ CATEGORY_BRACKET, '>' ],
    ] );
  } );
} );
