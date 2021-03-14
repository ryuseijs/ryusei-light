import { CATEGORY_KEYWORD } from '../../../constants/categories';


describe( 'common', () => {
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
      'trait',
      'try',
      'while',
    ].forEach( keyword => {
      expect( keyword ).toBeTokenized( 'common', [ [ CATEGORY_KEYWORD, keyword ] ] );
    } );
  } );
} );


