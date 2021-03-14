import { CATEGORY_COMMENT } from '../../../constants/categories';


describe( 'css', () => {
  test( 'can tokenize multiline comments.', () => {
    const comment1 = `/* comment */`;
    expect( comment1 ).toBeTokenized( 'css', [ [ CATEGORY_COMMENT, comment1 ] ] );

    const comment2 = `
      /*
         comment
       */
    `;

    expect( comment2 ).toBeTokenized( 'css', [
      [ CATEGORY_COMMENT, '/*' ],
      [ CATEGORY_COMMENT, '         comment' ],
      [ CATEGORY_COMMENT, '       */' ],
    ] );

    const comment3 = `
      /**
       * comment
       * comment
       */
    `;

    expect( comment3 ).toBeTokenized( 'css', [
      [ CATEGORY_COMMENT, '/**' ],
      [ CATEGORY_COMMENT, '       * comment' ],
      [ CATEGORY_COMMENT, '       * comment' ],
      [ CATEGORY_COMMENT, '       */' ],
    ] );
  } );
} );
