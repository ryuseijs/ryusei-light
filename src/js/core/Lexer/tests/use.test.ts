import { Language } from '../../../types';
import { Lexer } from '../Lexer';


describe( 'Lexer#tokenize()', () => {
  let lang: Language;

  beforeEach( () => {
    lang = { id: 'test', name: 'Test', grammar: { main: [] } };
  } );

  test( 'can tokenize a text by an imported language.', () => {
    const lang1: Language = {
      id     : 'lang1',
      name   : 'Language 1',
      grammar: {
        main: [
          [ 'a1', /a+/ ],
          [ 'b1', /b+/ ],
        ],
      },
    };

    const lang2: Language = {
      id     : 'lang2',
      name   : 'Language 2',
      grammar: {
        main: [
          [ 'a2', /a+/ ],
          [ 'b2', /b+/ ],
        ],
      },
    };

    lang.use = { lang1, lang2 };

    lang.grammar.main = [
      [ 'a', /a+/ ],
      [ 'b', /b+/ ],
      [ '#bracket', /{.*}/ ],
      [ '#paren', /\(.*\)/ ],
    ];

    // Apply the lang1 to a text inside brackets.
    lang.grammar.bracket = [
      [ 'bracket', /[{}]/ ],
      [ '@lang1', /[^{}]+/ ],
    ];

    // Apply the lang2 to a text inside paren.
    lang.grammar.paren = [
      [ 'paren', /[()]/ ],
      [ '@lang2', /[^()]+/ ],
    ];

    const lexer     = new Lexer( lang );
    const tokenized = lexer.tokenize( '{aaabbb}aaabbb(aaabbb)' );

    expect( tokenized[ 0 ] ).toStrictEqual( [
      [ 'bracket', '{', 1 ],
      [ 'a1', 'aaa', 2 ],
      [ 'b1', 'bbb', 2 ],
      [ 'bracket', '}', 1 ],

      [ 'a', 'aaa', 0 ],
      [ 'b', 'bbb', 0 ],

      [ 'paren', '(', 1 ],
      [ 'a2', 'aaa', 2 ],
      [ 'b2', 'bbb', 2 ],
      [ 'paren', ')', 1 ],
    ] );
  } );
} );
