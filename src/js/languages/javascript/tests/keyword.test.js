import { CATEGORY_KEYWORD } from '../../../constants/categories';


describe( 'javascript', () => {
  test( 'can tokenize keywords.', () => {
    [
      'as',
      'async',
      'await',
      'case',
      'catch',
      'const',
      'debugger',
      'default',
      'delete',
      'enum',
      'export',
      'from',
      'import',
      'let',
      'package',
      'private',
      'protected',
      'public',
      'super',
      'switch',
      'static',
      'this',
      'typeof',
      'undefined',
      'var',
      'void',
      'with',
      'yield',
    ].forEach( keyword => {
      expect( keyword ).toBeTokenized( 'javascript', [ [ CATEGORY_KEYWORD, keyword ] ] );
    } );
  } );
} );
