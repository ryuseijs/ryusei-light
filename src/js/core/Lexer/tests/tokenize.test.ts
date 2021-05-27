import { Language } from '../../../types';
import { Lexer } from '../Lexer';
import { getInfo } from './fixtues';


describe( 'Lexer#tokenize()', () => {
  let lang: Language;
  const mainInfo = getInfo( '#main', 0 );

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
      [ 'a', 'a', mainInfo ],
      [ 'b', 'b', mainInfo ],
      [ 'c', 'c', mainInfo ],
      [ 'a', 'a', mainInfo ],
      [ 'a', 'a', mainInfo ],
      [ 'b', 'b', mainInfo ],
      [ 'b', 'b', mainInfo ],
      [ 'c', 'c', mainInfo ],
      [ 'c', 'c', mainInfo ],
    ] );
  } );

  test( 'can tokenize a text with splitting it into different arrays by each line break.', () => {
    lang.grammar.main = [
      [ 'a', /a+/ ],
    ];

    const lexer     = new Lexer( lang );
    const tokenized = lexer.tokenize( 'aaa\naaa\naaa\naaa' );

    expect( tokenized ).toStrictEqual( [
      [ [ 'a', 'aaa', mainInfo ] ],
      [ [ 'a', 'aaa', mainInfo ] ],
      [ [ 'a', 'aaa', mainInfo ] ],
      [ [ 'a', 'aaa', mainInfo ] ],
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
      [ 'a', 'aaa', mainInfo ],
    ] );
  } );

  test( 'should treat unknown strings as `text`.', () => {
    lang.grammar.main = [
      [ 'a', /a+/ ],
    ];

    const lexer     = new Lexer( lang );
    const tokenized = lexer.tokenize( 'aaabbbaaaccc' );

    expect( tokenized[ 0 ] ).toStrictEqual( [
      [ 'a', 'aaa', mainInfo ],
      [ 'text', 'bbb', { depth: 0, language: 'test', state: '#main' } ],
      [ 'a', 'aaa', mainInfo ],
      [ 'text', 'ccc', { depth: 0, language: 'test', state: '#main' } ],
    ] );
  } );

  test( 'should respect a `i` flag.', () => {
    lang.grammar.main = [
      [ 'a', /a+/i ],
    ];

    const lexer     = new Lexer( lang );
    const tokenized = lexer.tokenize( 'aaaAAAaaaAAA' );

    expect( tokenized[ 0 ] ).toStrictEqual( [
      [ 'a', 'aaaAAAaaaAAA', mainInfo ],
    ] );
  } );

  test( 'should respect a `s` flag.', () => {
    lang.grammar.main = [
      [ 'dotAll', /\[.*]/s ],
    ];

    const lexer     = new Lexer( lang );
    const tokenized = lexer.tokenize( '[aaa\naaa\naaa]' );

    expect( tokenized[ 0 ][ 0 ] ).toStrictEqual( [ 'dotAll', '[aaa', {
      state: '#main',
      depth: 0,
      language: 'test',
      split: true,
      head: true,
      tail: false,
      distance: 0,
    } ] );

    expect( tokenized[ 1 ][ 0 ] ).toStrictEqual( [ 'dotAll', 'aaa', {
      state: '#main',
      depth: 0,
      language: 'test',
      split: true,
      head: false,
      tail: false,
      distance: 1,
    } ] );

    expect( tokenized[ 2 ][ 0 ] ).toStrictEqual( [ 'dotAll', 'aaa]', {
      state: '#main',
      depth: 0,
      language: 'test',
      split: true,
      head: false,
      tail: true,
      distance: 2,
    } ] );
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
      [ 'paren', '(', getInfo( '#paren', 1 ) ],
      [ 'parenA', 'aaa', getInfo( '#paren', 1 ) ],
      [ 'parenB', 'bbb', getInfo( '#paren', 1 ) ],
      [ 'paren', ')', getInfo( '#paren', 1 ) ],
      [ 'a', 'aaa', mainInfo ],
      [ 'b', 'bbb', mainInfo ],
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
      [ 'bracket', '{', getInfo( '#bracket', 1 ) ],
      [ 'paren', '(', getInfo( '#paren', 2 ) ],
      [ 'parenA', 'aaa', getInfo( '#paren', 2 ) ],
      [ 'parenB', 'bbb', getInfo( '#paren', 2 ) ],
      [ 'paren', ')', getInfo( '#paren', 2 ) ],
      [ 'bracketA', 'aaa', getInfo( '#bracket', 1 ) ],
      [ 'bracketB', 'bbb', getInfo( '#bracket', 1 ) ],
      [ 'bracket', '}', getInfo( '#bracket', 1 ) ],
      [ 'paren', '(', getInfo( '#paren', 1 ) ],
      [ 'parenA', 'aaa', getInfo( '#paren', 1 ) ],
      [ 'parenB', 'bbb', getInfo( '#paren', 1 ) ],
      [ 'paren', ')', getInfo( '#paren', 1 ) ],
      [ 'a', 'aaa', mainInfo ],
      [ 'b', 'bbb', mainInfo ],
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
      [ 'paren', '(', getInfo( '#paren', 1 ) ],
      [ 'a', 'aaa', getInfo( '#paren', 1 ) ],
      [ 'b', 'bbb', getInfo( '#paren', 1 ) ],
      [ 'paren', ')', getInfo( '#paren', 1 ) ],
      [ 'a', 'aaa', mainInfo ],
      [ 'b', 'bbb', mainInfo ],
    ] );
  } );
} );
