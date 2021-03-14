import { CATEGORY_OPERATOR } from '../../../constants/categories';


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators
describe( 'common', () => {
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
      expect( operator ).toBeTokenized( 'common', [ [ CATEGORY_OPERATOR, operator ] ] );
    } );
  } );
} );


