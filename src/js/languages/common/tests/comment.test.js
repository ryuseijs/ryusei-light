import { CATEGORY_COMMENT, CATEGORY_STRING } from '../../../constants/categories';


describe( 'common', () => {
  test( 'can tokenize single line comments.', () => {
    const comment1 = `// comment`;
    expect( comment1 ).toBeTokenized( 'common', [ [ CATEGORY_COMMENT, comment1 ] ] );
  } );

  test( 'should not tokenize a next line as a comment.', () => {
    const string1 = `// comment
    123`;

    expect( string1 ).toBeTokenized( 'common', [
      [ CATEGORY_COMMENT, '// comment' ],
      [ 'number', '123' ],
    ] );
  } );

  test( 'should not tokenize a comment inside a string.', () => {
    const string1 = `'// comment'`;
    expect( string1 ).toBeTokenized( 'common', [ [ CATEGORY_STRING, string1 ] ] );

    const string2 = `"// comment"`;
    expect( string2 ).toBeTokenized( 'common', [ [ CATEGORY_STRING, string2 ] ] );
  } );
} );
