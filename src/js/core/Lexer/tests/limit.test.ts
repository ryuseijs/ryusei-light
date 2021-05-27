import { Language } from '../../../types';
import { Lexer } from '../Lexer';
import { getInfo } from './fixtues';


describe( 'Lexer#tokenize()', () => {
  let lang: Language;

  beforeEach( () => {
    lang = { id: 'test', name: 'Test', grammar: { main: [] } };
  } );

  test( 'can limit the number of lines.', () => {
    lang.grammar.main = [
      [ 'a', /a+/ ],
    ];

    const lexer = new Lexer( lang );

    const tokenized1 = lexer.tokenize( 'aaa\naaa\naaa\naaa', 1 );
    expect( tokenized1 ).toStrictEqual( [
      [ [ 'a', 'aaa', getInfo( '#main', 0 ) ] ],
    ] );

    const tokenized2 = lexer.tokenize( 'aaa\naaa\naaa\naaa', 2 );
    expect( tokenized2 ).toStrictEqual( [
      [ [ 'a', 'aaa', getInfo( '#main', 0 ) ] ],
      [ [ 'a', 'aaa', getInfo( '#main', 0 ) ] ],
    ] );
  } );

  test( 'should abort tokenization even if the depth is not 0.', () => {
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

    const lexer = new Lexer( lang );

    const tokenized1 = lexer.tokenize( '(aaa\nbbb)\naaa\nbbb\n(aaa\nbbb)', 1 );
    expect( tokenized1 ).toStrictEqual( [
      [
        [ 'paren', '(', getInfo( '#paren', 1 ) ],
        [ 'parenA', 'aaa', getInfo( '#paren', 1 ) ],
      ],
    ] );

    const tokenized2 = lexer.tokenize( '(aaa\nbbb)\naaa\nbbb\n(aaa\nbbb)', 5 );
    expect( tokenized2 ).toStrictEqual( [
      [
        [ 'paren', '(', getInfo( '#paren', 1 ) ],
        [ 'parenA', 'aaa', getInfo( '#paren', 1 ) ],
      ],
      [
        [ 'parenB', 'bbb', getInfo( '#paren', 1 ) ],
        [ 'paren', ')', getInfo( '#paren', 1 ) ],
      ],
      [
        [ 'a', 'aaa', getInfo( '#main', 0 ) ],
      ],
      [
        [ 'b', 'bbb', getInfo( '#main', 0 ) ],
      ],
      [
        [ 'paren', '(', getInfo( '#paren', 1 ) ],
        [ 'parenA', 'aaa', getInfo( '#paren', 1 ) ],
      ],
    ] );
  } );
} );
