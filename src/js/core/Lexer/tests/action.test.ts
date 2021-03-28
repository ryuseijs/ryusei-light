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
      [ 'paren', '(', 1 ],
      [ 'parenA', 'aaa', 1 ],
      [ 'parenB', 'bbb', 1 ],
      [ 'paren', ')', 1 ],

      [ 'a', 'aaa', 0 ],
      [ 'b', 'bbb', 0 ],

      [ 'paren', '(', 1 ],
      [ 'parenA', 'aaa', 1 ],
      [ 'parenB', 'bbb', 1 ],
      [ 'paren', ')', 1 ],
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
      [ 'a', 'aaa', 0 ],
      [ 'paren', '(', 1 ],
      [ 'paren', '(', 2 ],
      [ 'parenA', 'aaa', 2 ],
      [ 'paren', ')', 2 ],
      [ 'paren', '(', 2 ],
      [ 'paren', '(', 3 ],
      [ 'parenA', 'aaa', 3 ],
      [ 'paren', ')', 3 ],
      [ 'paren', ')', 2 ],
      [ 'paren', ')', 1 ],

      [ 'a', 'aaa', 0 ],

      [ 'paren', '(', 1 ],
      [ 'parenA', 'aaa', 1 ],
      [ 'paren', ')', 1 ],

      [ 'a', 'aaa', 0 ],
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
      [ 'string', '"(("', 0 ],
      [ 'a', 'aaa', 0 ],

      [ 'paren', '(', 1 ],
      [ 'parenA', 'aaa', 1 ],
      [ 'paren', '(', 2 ],
      [ 'parenA', 'aaa', 2 ],
      [ 'string', '"))"', 2 ],
      [ 'paren', ')', 2 ],
      [ 'paren', ')', 1 ],

      [ 'a', 'aaa', 0 ],
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
      [ 'paren', '(', 1 ],
      [ 'paren', '(', 2 ],
      [ 'paren', ')', 2 ],
      [ 'text', ')', 1 ],
    ] );
  } );
} );
