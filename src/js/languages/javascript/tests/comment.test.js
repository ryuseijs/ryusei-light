import { CATEGORY_COMMENT, CATEGORY_STRING } from '../../../constants/categories';


describe( 'javascript', () => {
  test( 'can tokenize a single line comment.', () => {
    const comment1 = `// comment`;
    expect( comment1 ).toBeTokenized( 'javascript', [ [ CATEGORY_COMMENT, comment1 ] ] );
  } );

  test( 'should not tokenize a next line as a comment.', () => {
    const string1 = `// comment
    123`;

    expect( string1 ).toBeTokenized( 'javascript', [
      [ CATEGORY_COMMENT, '// comment' ],
      [ 'number', '123' ],
    ] );
  } );

  test( 'should not tokenize a comment inside a string.', () => {
    const string1 = `'// comment'`;
    expect( string1 ).toBeTokenized( 'javascript', [ [ CATEGORY_STRING, string1 ] ] );

    const string2 = `"// comment"`;
    expect( string2 ).toBeTokenized( 'javascript', [ [ CATEGORY_STRING, string2 ] ] );
  } );
} );
