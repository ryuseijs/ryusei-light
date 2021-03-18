import { CATEGORY_COMMENT } from '../../../constants/categories';


describe( 'javascript', () => {
  test( 'can tokenize multiline comments.', () => {
    const comment1 = `/* comment */`;
    expect( comment1 ).toBeTokenized( 'javascript', [ [ CATEGORY_COMMENT, comment1 ] ] );

    const comment2 = `
      /*
         comment
       */
    `;

    expect( comment2 ).toBeTokenized( 'javascript', [
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

    expect( comment3 ).toBeTokenized( 'javascript', [
      [ CATEGORY_COMMENT, '/**' ],
      [ CATEGORY_COMMENT, '       * comment' ],
      [ CATEGORY_COMMENT, '       * comment' ],
      [ CATEGORY_COMMENT, '       */' ],
    ] );
  } );

  test( 'can tokenize comments with escaped representation.', () => {
    const comment1 = `/* comment \\/ *\\/ */`;
    expect( comment1 ).toBeTokenized( 'javascript', [ [ CATEGORY_COMMENT, comment1 ] ] );

    const comment2 = `
      /**
       * comment
       * \\/ *\\/
       */
    `;

    expect( comment2 ).toBeTokenized( 'javascript', [
      [ CATEGORY_COMMENT, '/**' ],
      [ CATEGORY_COMMENT, '       * comment' ],
      [ CATEGORY_COMMENT, '       * \\/ *\\/' ],
      [ CATEGORY_COMMENT, '       */' ],
    ] );
  } );

  test( 'should not tokenize a comment inside a string.', () => {
    const string1 = `'/* comment */'`;
    expect( string1 ).toBeTokenized( 'javascript', [ [ 'string', string1 ] ] );

    const string2 = `"/* comment */"`;
    expect( string2 ).toBeTokenized( 'javascript', [ [ 'string', string2 ] ] );
  } );
} );
