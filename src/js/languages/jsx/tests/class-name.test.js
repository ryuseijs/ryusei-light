import {
  CATEGORY_BRACKET, CATEGORY_CLASS, CATEGORY_DELIMITER,
} from '../../../constants/categories';


describe( 'jsx', () => {
  test( 'can tokenize a tag name as a class if it stats with an uppercase character.', () => {
    const jsx = `<Component></Component>`;

    expect( jsx ).toBeTokenized( 'jsx', [
      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_CLASS, 'Component' ],
      [ CATEGORY_BRACKET, '>' ],

      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_DELIMITER, '/' ],
      [ CATEGORY_CLASS, 'Component' ],
      [ CATEGORY_BRACKET, '>' ],
    ] );
  } );
} );
