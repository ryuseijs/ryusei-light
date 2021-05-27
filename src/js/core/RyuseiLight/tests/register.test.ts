import { Language, TokenInfo } from '../../../types';
import { RyuseiLight } from '../RyuseiLight';


describe( 'RyuseiLight.register()', () => {
  test( 'can register a language.', () => {
    const lang: Language = {
      id     : 'lang',
      name   : 'Language',
      grammar: { main: [ [ 'lang-a', /a+/ ] ] },
    };

    RyuseiLight.register( lang );

    const tokenized = RyuseiLight.tokenize( 'aaa', 'lang' );
    expect( tokenized[ 0 ] ).toStrictEqual( [ [ 'lang-a', 'aaa', getInfo( 'lang' ) ] ] );
  } );

  test( 'can register languages.', () => {
    const lang1: Language = {
      id     : 'lang1',
      name   : 'Language 1',
      grammar: { main: [ [ 'lang1-a', /a+/ ] ] },
    };

    const lang2: Language = {
      id     : 'lang2',
      name   : 'Language 2',
      grammar: { main: [ [ 'lang2-a', /a+/ ] ] },
    };

    RyuseiLight.register( [ lang1, lang2 ] );

    const tokenized1 = RyuseiLight.tokenize( 'aaa', 'lang1' );
    expect( tokenized1[ 0 ] ).toStrictEqual( [ [ 'lang1-a', 'aaa', getInfo( 'lang1' ) ] ] );

    const tokenized2 = RyuseiLight.tokenize( 'aaa', 'lang2' );
    expect( tokenized2[ 0 ] ).toStrictEqual( [ [ 'lang2-a', 'aaa', getInfo( 'lang2' ) ] ] );
  } );

  test( 'can register aliases.', () => {
    const lang: Language = {
      id     : 'lang3',
      name   : 'Language',
      alias  : [ 'arias1', 'arias2' ],
      grammar: { main: [ [ 'lang3-a', /a+/ ] ] },
    };

    RyuseiLight.register( lang );

    const tokenized1 = RyuseiLight.tokenize( 'aaa', 'arias1' );
    expect( tokenized1[ 0 ] ).toStrictEqual( [ [ 'lang3-a', 'aaa', getInfo( 'lang3' ) ] ] );

    const tokenized2 = RyuseiLight.tokenize( 'aaa', 'arias2' );
    expect( tokenized2[ 0 ] ).toStrictEqual( [ [ 'lang3-a', 'aaa', getInfo( 'lang3' ) ] ] );
  } );
} );

export function getInfo( language: string ): TokenInfo {
  return {
    state: '#main',
    depth: 0,
    language: language,
    split: false,
    head: false,
    tail: false,
    distance: 0,
  };
}
