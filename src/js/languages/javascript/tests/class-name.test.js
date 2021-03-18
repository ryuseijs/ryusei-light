import { CATEGORY_IDENTIFIER, CATEGORY_CLASS } from '../../../constants/categories';


describe( 'javascript', () => {
  test( 'can tokenize identifiers that start with a uppercase char as a class name.', () => {
    [ 'Array', 'MyClass' ].forEach( identifier => {
      expect( identifier ).toBeTokenized( 'javascript', [ [ CATEGORY_CLASS, identifier ] ] );
    } );
  } );

  test( 'should not tokenize identifiers that does not start with a uppercase char as a class name.', () => {
    [ 'array', 'variable' ].forEach( identifier => {
      expect( identifier ).toBeTokenized( 'javascript', [ [ CATEGORY_IDENTIFIER, identifier ] ] );
    } );
  } );
} );
