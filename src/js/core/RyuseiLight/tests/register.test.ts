import { Language } from '../../../types';
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
    expect( tokenized[ 0 ] ).toStrictEqual( [ [ 'lang-a', 'aaa', 0 ] ] );
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
    expect( tokenized1[ 0 ] ).toStrictEqual( [ [ 'lang1-a', 'aaa', 0 ] ] );

    const tokenized2 = RyuseiLight.tokenize( 'aaa', 'lang2' );
    expect( tokenized2[ 0 ] ).toStrictEqual( [ [ 'lang2-a', 'aaa', 0 ] ] );
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
    expect( tokenized1[ 0 ] ).toStrictEqual( [ [ 'lang3-a', 'aaa', 0 ] ] );

    const tokenized2 = RyuseiLight.tokenize( 'aaa', 'arias2' );
    expect( tokenized2[ 0 ] ).toStrictEqual( [ [ 'lang3-a', 'aaa', 0 ] ] );
  } );
} );
