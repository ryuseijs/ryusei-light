import { CATEGORY_STRING } from '../../../constants/categories';


describe( 'javascript', () => {
  test( 'can tokenize single quote strings.', () => {
    expect( `'single quote string'` ).toBeTokenized( 'javascript', [
      [ CATEGORY_STRING, `'single quote string'` ],
    ] );

    expect( `'single "quote" string'` ).toBeTokenized( 'javascript', [
      [ CATEGORY_STRING, `'single "quote" string'` ],
    ] );
  } );

  test( 'can tokenize single quote strings with escaped quotes.', () => {
    expect( `'escaped single \\' \\' \\'quote string'` ).toBeTokenized( 'javascript', [
      [ CATEGORY_STRING, `'escaped single \\' \\' \\'quote string'` ],
    ] );
  } );

  test( 'can tokenize double quote strings.', () => {
    expect( `"double quote string"` ).toBeTokenized( 'javascript', [
      [ CATEGORY_STRING, `"double quote string"` ],
    ] );

    expect( `"double 'quote' string"` ).toBeTokenized( 'javascript', [
      [ CATEGORY_STRING, `"double 'quote' string"` ],
    ] );
  } );

  test( 'can tokenize single quote strings with escaped quotes.', () => {
    expect( `"escaped double \\" \\" \\"quote string"` ).toBeTokenized( 'javascript', [
      [ CATEGORY_STRING, `"escaped double \\" \\" \\"quote string"` ],
    ] );
  } );
} );
