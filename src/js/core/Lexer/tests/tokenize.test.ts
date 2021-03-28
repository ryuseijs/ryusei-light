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
      [ 'a', 'a', 0 ],
      [ 'b', 'b', 0 ],
      [ 'c', 'c', 0 ],
      [ 'a', 'a', 0 ],
      [ 'a', 'a', 0 ],
      [ 'b', 'b', 0 ],
      [ 'b', 'b', 0 ],
      [ 'c', 'c', 0 ],
      [ 'c', 'c', 0 ],
    ] );
  } );

  test( 'can tokenize a text with splitting it into different arrays by each line break.', () => {
    lang.grammar.main = [
      [ 'a', /a+/ ],
    ];

    const lexer     = new Lexer( lang );
    const tokenized = lexer.tokenize( 'aaa\naaa\naaa\naaa' );

    expect( tokenized ).toStrictEqual( [
      [ [ 'a', 'aaa', 0 ] ],
      [ [ 'a', 'aaa', 0 ] ],
      [ [ 'a', 'aaa', 0 ] ],
      [ [ 'a', 'aaa', 0 ] ],
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
      [ 'a', 'aaa', 0 ],
    ] );
  } );

  test( 'should treat unknown strings as `text`.', () => {
    lang.grammar.main = [
      [ 'a', /a+/ ],
    ];

    const lexer     = new Lexer( lang );
    const tokenized = lexer.tokenize( 'aaabbbaaaccc' );

    expect( tokenized[ 0 ] ).toStrictEqual( [
      [ 'a', 'aaa', 0 ],
      [ 'text', 'bbb', 0 ],
      [ 'a', 'aaa', 0 ],
      [ 'text', 'ccc', 0 ],
    ] );
  } );

  test( 'should respect a `i` flag.', () => {
    lang.grammar.main = [
      [ 'a', /a+/i ],
    ];

    const lexer     = new Lexer( lang );
    const tokenized = lexer.tokenize( 'aaaAAAaaaAAA' );

    expect( tokenized[ 0 ] ).toStrictEqual( [
      [ 'a', 'aaaAAAaaaAAA', 0 ],
    ] );
  } );

  test( 'should respect a `s` flag.', () => {
    lang.grammar.main = [
      [ 'dotAll', /\[.*]/s ],
    ];

    const lexer     = new Lexer( lang );
    const tokenized = lexer.tokenize( '[aaa\naaa\naaa]' );

    expect( tokenized[ 0 ][ 0 ] ).toStrictEqual( [ 'dotAll', '[aaa', 0 ] );
    expect( tokenized[ 1 ][ 0 ] ).toStrictEqual( [ 'dotAll', 'aaa', 0 ] );
    expect( tokenized[ 2 ][ 0 ] ).toStrictEqual( [ 'dotAll', 'aaa]', 0 ] );
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
      [ 'paren', '(', 0 ],
      [ 'parenA', 'aaa', 0 ],
      [ 'parenB', 'bbb', 0 ],
      [ 'paren', ')', 0 ],
      [ 'a', 'aaa', 0 ],
      [ 'b', 'bbb', 0 ],
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
      [ 'bracket', '{', 0 ],
      [ 'paren', '(', 0 ],
      [ 'parenA', 'aaa', 0 ],
      [ 'parenB', 'bbb', 0 ],
      [ 'paren', ')', 0 ],
      [ 'bracketA', 'aaa', 0 ],
      [ 'bracketB', 'bbb', 0 ],
      [ 'bracket', '}', 0 ],
      [ 'paren', '(', 0 ],
      [ 'parenA', 'aaa', 0 ],
      [ 'parenB', 'bbb', 0 ],
      [ 'paren', ')', 0 ],
      [ 'a', 'aaa', 0 ],
      [ 'b', 'bbb', 0 ],
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
      [ 'paren', '(', 0 ],
      [ 'a', 'aaa', 0 ],
      [ 'b', 'bbb', 0 ],
      [ 'paren', ')', 0 ],
      [ 'a', 'aaa', 0 ],
      [ 'b', 'bbb', 0 ],
    ] );
  } );
} );
