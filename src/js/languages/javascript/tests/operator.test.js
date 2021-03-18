import { CATEGORY_OPERATOR } from '../../../constants/categories';


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators
describe( 'javascript', () => {
  test( 'can tokenize operators.', () => {
    [
      '+',
      '-',
      '~',
      '!',
      '/',
      '*',
      '%',
      '**',
      '<',
      '>',
      '<=',
      '>=',
      '==',
      '!=',
      '===',
      '!==',
      '<<',
      '>>',
      '>>>',
      '&',
      '|',
      '^',
      '&&',
      '||',
      '??',
      '?',
      '=',
      '*=',
      '**=',
      '/=',
      '%=',
      '+=',
      '-=',
      '<<=',
      '>>=',
      '>>>=',
      '&=',
      '^=',
      '|=',
      '&&=',
      '||=',
      '??=',
      ':',
    ].forEach( operator => {
      expect( operator ).toBeTokenized( 'javascript', [ [ CATEGORY_OPERATOR, operator ] ] );
    } );
  } );
} );


