import { CATEGORY_KEYWORD } from '../../../constants/categories';


describe( 'javascript', () => {
  test( 'can tokenize keywords.', () => {
    [
      'break',
      'catch',
      'class',
      'continue',
      'do',
      'else',
      'extends',
      'finally',
      'for',
      'function',
      'if',
      'implements',
      'in',
      'instanceof',
      'interface',
      'new',
      'null',
      'return',
      'throw',
      'try',
      'while',

      'as',
      'async',
      'await',
      'case',
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
