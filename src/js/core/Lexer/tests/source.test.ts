import { Language } from '../../../types';
import { Lexer } from '../Lexer';
import { getInfo } from './fixtues';


describe( 'Lexer', () => {
  test( 'can replace tokenizer sources by source properties in a language object.', () => {
    const lang: Language = {
      id  : 'test',
      name: 'Test',

      source: {
        sourceA: /aaa/,
        sourceB: /bbb/,
      },

      grammar: {
        main: [
          [ 'ab', /%sourceA%sourceB/ ],
          [ 'a', /%sourceA/ ],
          [ 'b', /%sourceB/ ],
        ],
      },
    };

    const lexer     = new Lexer( lang );
    const tokenized = lexer.tokenize( 'aaabbbbbbaaa' );

    expect( tokenized[ 0 ] ).toStrictEqual( [
      [ 'ab', 'aaabbb', getInfo( '#main', 0 ) ],
      [ 'b', 'bbb', getInfo( '#main', 0 ) ],
      [ 'a', 'aaa', getInfo( '#main', 0 ) ],
    ] );
  } );
} );
