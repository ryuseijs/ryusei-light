import { CATEGORY_STRING } from '../../../constants/categories';


describe( 'css', () => {
  test( 'can tokenize strings.', () => {
    expect( '"Times New Roman"' ).toBeTokenized( 'css', [
      [ CATEGORY_STRING, '"Times New Roman"' ],
    ] );

    expect( "'Times New Roman'" ).toBeTokenized( 'css', [
      [ CATEGORY_STRING, "'Times New Roman'" ],
    ] );
  } );

  test( 'can tokenize multiline strings.', () => {
    const string1 = `'multi \\
    line'`;

    expect( string1 ).toBeTokenized( 'css', [
      [ CATEGORY_STRING, `'multi \\` ],
      [ CATEGORY_STRING, `    line'` ],
    ] );

    const string2 = `"multi \\
    line"`;

    expect( string2 ).toBeTokenized( 'css', [
      [ CATEGORY_STRING, `"multi \\` ],
      [ CATEGORY_STRING, `    line"` ],
    ] );
  } );
} );
