import { Language } from '../../../types';
import { Lexer } from '../Lexer';


describe( 'Lexer#tokenize()', () => {
  let lang: Language;

  beforeEach( () => {
    lang = { id: 'test', name: 'Test', grammar: { main: [] } };
  } );

  test( 'can tokenize a text by a language.', () => {
    lang.grammar.main = [
      [ 'a', /a/ ],
      [ 'b', /b/ ],
      [ 'c', /c/ ],
    ];

    const lexer     = new Lexer( lang );
    const tokenized = lexer.tokenize( 'abcaabbcc' );

    expect( tokenized[ 0 ] ).toStrictEqual( [
      [ 'a', 'a' ],
      [ 'b', 'b' ],
      [ 'c', 'c' ],
      [ 'a', 'a' ],
      [ 'a', 'a' ],
      [ 'b', 'b' ],
      [ 'b', 'b' ],
      [ 'c', 'c' ],
      [ 'c', 'c' ],
    ] );
  } );

  test( 'can tokenize a text with splitting it into different arrays by each line break.', () => {
    lang.grammar.main = [
      [ 'a', /a+/ ],
    ];

    const lexer     = new Lexer( lang );
    const tokenized = lexer.tokenize( 'aaa\naaa\naaa\naaa' );

    expect( tokenized ).toStrictEqual( [
      [ [ 'a', 'aaa' ] ],
      [ [ 'a', 'aaa' ] ],
      [ [ 'a', 'aaa' ] ],
      [ [ 'a', 'aaa' ] ],
    ] );
  } );

  test( 'should use the first matched tokenizer.', () => {
    lang.grammar.main = [
      [ 'a', /a+/ ],
      [ 'anotherA', /a+/ ],
    ];

    const lexer     = new Lexer( lang );
    const tokenized = lexer.tokenize( 'aaa' );

    expect( tokenized[ 0 ] ).toStrictEqual( [
      [ 'a', 'aaa' ],
    ] );
  } );

  test( 'should treat unknown strings as `text`.', () => {
    lang.grammar.main = [
      [ 'a', /a+/ ],
    ];

    const lexer     = new Lexer( lang );
    const tokenized = lexer.tokenize( 'aaabbbaaaccc' );

    expect( tokenized[ 0 ] ).toStrictEqual( [
      [ 'a', 'aaa' ],
      [ 'text', 'bbb' ],
      [ 'a', 'aaa' ],
      [ 'text', 'ccc' ],
    ] );
  } );

  test( 'should respect a `i` flag.', () => {
    lang.grammar.main = [
      [ 'a', /a+/i ],
    ];

    const lexer     = new Lexer( lang );
    const tokenized = lexer.tokenize( 'aaaAAAaaaAAA' );

    expect( tokenized[ 0 ] ).toStrictEqual( [
      [ 'a', 'aaaAAAaaaAAA' ],
    ] );
  } );

  test( 'should respect a `s` flag.', () => {
    lang.grammar.main = [
      [ 'dotAll', /\[.*]/s ],
    ];

    const lexer     = new Lexer( lang );
    const tokenized = lexer.tokenize( '[aaa\naaa\naaa]' );

    expect( tokenized[ 0 ][ 0 ] ).toStrictEqual( [ 'dotAll', '[aaa' ] );
    expect( tokenized[ 1 ][ 0 ] ).toStrictEqual( [ 'dotAll', 'aaa' ] );
    expect( tokenized[ 2 ][ 0 ] ).toStrictEqual( [ 'dotAll', 'aaa]' ] );
  } );

  test( 'should tokenize a matched string by sub tokenizers if required.', () => {
    lang.grammar.main = [
      [ '#paren', /\(.*\)/ ],
      [ 'a', /a+/ ],
      [ 'b', /b+/ ],
    ];

    lang.grammar.paren = [
      [ 'paren', /[()]/ ],
      [ 'parenA', /a+/ ],
      [ 'parenB', /b+/ ],
    ];

    const lexer     = new Lexer( lang );
    const tokenized = lexer.tokenize( '(aaabbb)aaabbb' );

    expect( tokenized[ 0 ] ).toStrictEqual( [
      [ 'paren', '(' ],
      [ 'parenA', 'aaa' ],
      [ 'parenB', 'bbb' ],
      [ 'paren', ')' ],
      [ 'a', 'aaa' ],
      [ 'b', 'bbb' ],
    ] );
  } );

  test( 'can handle multiple sub tokenizers.', () => {
    lang.grammar.main = [
      [ '#bracket', /{.*}/ ],
      [ '#paren', /\(.*\)/ ],
      [ 'a', /a+/ ],
      [ 'b', /b+/ ],
    ];

    lang.grammar.bracket = [
      [ 'bracket', /[{}]/ ],
      [ '#paren', /\(.*\)/ ],
      [ 'bracketA', /a+/ ],
      [ 'bracketB', /b+/ ],
    ];

    lang.grammar.paren = [
      [ 'paren', /[()]/ ],
      [ 'parenA', /a+/ ],
      [ 'parenB', /b+/ ],
    ];

    const lexer     = new Lexer( lang );
    const tokenized = lexer.tokenize( '{(aaabbb)aaabbb}(aaabbb)aaabbb' );

    expect( tokenized[ 0 ] ).toStrictEqual( [
      [ 'bracket', '{' ],
      [ 'paren', '(' ],
      [ 'parenA', 'aaa' ],
      [ 'parenB', 'bbb' ],
      [ 'paren', ')' ],
      [ 'bracketA', 'aaa' ],
      [ 'bracketB', 'bbb' ],
      [ 'bracket', '}' ],
      [ 'paren', '(' ],
      [ 'parenA', 'aaa' ],
      [ 'parenB', 'bbb' ],
      [ 'paren', ')' ],
      [ 'a', 'aaa' ],
      [ 'b', 'bbb' ],
    ] );
  } );

  test( 'can apply included tokenizers.', () => {
    lang.grammar.main = [
      [ '#paren', /\(.*\)/ ],
      [ '#chars' ],
    ];

    lang.grammar.paren = [
      [ 'paren', /[()]/ ],
      [ '#chars' ],
    ];

    lang.grammar.chars = [
      [ 'a', /a+/ ],
      [ 'b', /b+/ ],
    ];

    const lexer     = new Lexer( lang );
    const tokenized = lexer.tokenize( '(aaabbb)aaabbb' );

    expect( tokenized[ 0 ] ).toStrictEqual( [
      [ 'paren', '(' ],
      [ 'a', 'aaa' ],
      [ 'b', 'bbb' ],
      [ 'paren', ')' ],
      [ 'a', 'aaa' ],
      [ 'b', 'bbb' ],
    ] );
  } );
} );
