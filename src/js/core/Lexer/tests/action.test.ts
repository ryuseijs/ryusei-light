import { Language } from '../../../types';
import { Lexer } from '../Lexer';


describe( 'Lexer#tokenize()', () => {
  let lang: Language;

  beforeEach( () => {
    lang = { id: 'test', name: 'Test', grammar: { main: [] } };
  } );

  test( 'can tokenize a text by sub tokenizers until `@break` if `@rest` action is specified.', () => {
    lang.grammar.main = [
      [ '#paren', /\(/, '@rest' ],
      [ 'a', /a+/ ],
      [ 'b', /b+/ ],
    ];

    lang.grammar.paren = [
      [ 'paren', /\(/ ],
      [ 'parenA', /a+/ ],
      [ 'parenB', /b+/ ],
      [ 'paren', /\)/, '@break' ],
    ];

    const lexer     = new Lexer( lang );
    const tokenized = lexer.tokenize( '(aaabbb)aaabbb(aaabbb)' );

    expect( tokenized[ 0 ] ).toStrictEqual( [
      [ 'paren', '(' ],
      [ 'parenA', 'aaa' ],
      [ 'parenB', 'bbb' ],
      [ 'paren', ')' ],

      [ 'a', 'aaa' ],
      [ 'b', 'bbb' ],

      [ 'paren', '(' ],
      [ 'parenA', 'aaa' ],
      [ 'parenB', 'bbb' ],
      [ 'paren', ')' ],
    ] );
  } );

  test( 'can handle nested paired characters with @rest and @break.', () => {
    lang.grammar.main = [
      [ '#paren', /\(/, '@rest' ],
      [ 'a', /a+/ ],
    ];

    lang.grammar.paren = [
      [ 'paren', /^\(/ ],
      [ '#paren', /\(/, '@rest' ], // Recursively call #paren
      [ 'paren', /\)/, '@break' ],
      [ 'parenA', /a+/ ],
    ];

    const lexer     = new Lexer( lang );
    const tokenized = lexer.tokenize( 'aaa((aaa)((aaa)))aaa(aaa)aaa' );

    expect( tokenized[ 0 ] ).toStrictEqual( [
      [ 'a', 'aaa' ],
      [ 'paren', '(' ],
      [ 'paren', '(' ],
      [ 'parenA', 'aaa' ],
      [ 'paren', ')' ],
      [ 'paren', '(' ],
      [ 'paren', '(' ],
      [ 'parenA', 'aaa' ],
      [ 'paren', ')' ],
      [ 'paren', ')' ],
      [ 'paren', ')' ],

      [ 'a', 'aaa' ],

      [ 'paren', '(' ],
      [ 'parenA', 'aaa' ],
      [ 'paren', ')' ],

      [ 'a', 'aaa' ],
    ] );
  } );

  test( 'can handle nested paired characters with ignoring invalid patterns.', () => {
    // Ignore parens inside a string.
    lang.grammar.main = [
      [ '#paren', /\(/, '@rest' ],
      [ 'string', /".+?"/ ],
      [ 'a', /a+/ ],
    ];

    lang.grammar.paren = [
      [ 'paren', /^\(/ ],
      [ '#paren', /\(/, '@rest' ],
      [ 'paren', /\)/, '@break' ],
      [ 'string', /".+"/ ],
      [ 'parenA', /a+/ ],
    ];

    const lexer     = new Lexer( lang );
    const tokenized = lexer.tokenize( '"(("aaa(aaa(aaa"))"))aaa' );

    expect( tokenized[ 0 ] ).toStrictEqual( [
      [ 'string', '"(("' ],
      [ 'a', 'aaa' ],

      [ 'paren', '(' ],
      [ 'parenA', 'aaa' ],
      [ 'paren', '(' ],
      [ 'parenA', 'aaa' ],
      [ 'string', '"))"' ],
      [ 'paren', ')' ],
      [ 'paren', ')' ],

      [ 'a', 'aaa' ],
    ] );
  } );

  test( 'can go back previous state by `@back` without tokenization.', () => {
    lang.grammar.main = [
      [ '#paren', /\(/, '@rest' ],
    ];

    lang.grammar.paren = [
      [ 'paren', /^\(/ ],
      [ '#innerParen', /\(/, '@rest' ],
      [ 'paren', /\)/, '@break' ],
    ];

    lang.grammar.innerParen = [
      [ 'paren', /^\(/ ],
      [ 'paren', /\)/, '@back' ], // This won't be a paren.
    ];

    const lexer     = new Lexer( lang );
    const tokenized = lexer.tokenize( '(())' );

    expect( tokenized[ 0 ] ).toStrictEqual( [
      [ 'paren', '(' ],
      [ 'paren', '(' ],
      [ 'paren', ')' ],
      [ 'text', ')' ],
    ] );
  } );
} );
