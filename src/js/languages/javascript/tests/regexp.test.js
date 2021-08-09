import { CATEGORY_COMMENT, CATEGORY_REGEXP, CATEGORY_STRING } from '../../../constants/categories';


describe( 'javascript', () => {
  test( 'can tokenize regexps.', () => {
    [
      '/^.*?[\\n\\s]/gmsi',
      '/\\s+.+(?=[\\s/>])/gs',
      '/((?![*+?])(?:[^\\r\\n\\[/\\\\]|\\\\.|\\[(?:[^\\r\\n\\]\\\\]|\\\\.)*\\])+)\\/((?:g(?:im?|mi?)?|i(?:gm?|mg?)?|m(?:gi?|ig?)?)?)/',
    ].forEach( regexp => {
      expect( regexp ).toBeTokenized( 'javascript', [ [ CATEGORY_REGEXP, regexp ] ] );
    } );
  } );

  test( 'should not tokenize a string or a comment as a regexp.', () => {
    const string = '"/a/gx"';
    expect( string ).toBeTokenized( 'javascript', [ [ CATEGORY_STRING, string ] ] );

    const comment = '// /a/gx';
    expect( comment ).toBeTokenized( 'javascript', [ [ CATEGORY_COMMENT, comment ] ] );
  } );
} );
