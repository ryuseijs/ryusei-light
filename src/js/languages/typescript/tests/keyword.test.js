import { CATEGORY_KEYWORD } from '../../../constants/categories';


describe( 'typescript', () => {
  test( 'can tokenize keywords.', () => {
    [
      'declare',
      'keyof',
      'namespace',
      'readonly',
      'type',
      'string',
      'number',
      'boolean',
      'bigint',
      'symbol',
      'object',
      'any',
      'never',
      'unknown',
      'infer',
      'is',
    ].forEach( keyword => {
      expect( keyword ).toBeTokenized( 'typescript', [ [ CATEGORY_KEYWORD, keyword ] ] );
    } );
  } );
} );
