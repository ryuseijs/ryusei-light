import { Language } from '../../../types';
import { Lexer } from '../Lexer';


describe( 'Lexer#init()', () => {
  let lang: Language;

  beforeEach( () => {
    lang = { id: 'test', name: 'Test', grammar: { main: [] } };
  } );

  test( 'can add a sticky flag to all regexp objects.', () => {
    lang.grammar.main = [
      [ 'rule1', /a/ ],
      [ 'rule2', /b/ ],
      [ 'rule3', /c/ ],
    ];

    lang.grammar.sub = [
      [ 'rule4', /d/s ],
      [ 'rule5', /e/i ],
      [ 'rule6', /f/is ],
    ];

    new Lexer( lang );

    lang.grammar.main.forEach( ( [ , regexp ] ) => {
      expect( regexp.flags.includes( 'y' ) ).toBe( true );
    } );

    const { sub } = lang.grammar;
    expect( sub[ 0 ][ 1 ].flags ).toBe( 'sy' );
    expect( sub[ 1 ][ 1 ].flags ).toBe( 'iy' );
    expect( sub[ 2 ][ 1 ].flags ).toBe( 'isy' );
  } );

  test( 'can merge tokenizers specified by #.', () => {
    lang.grammar.main = [
      [ 'rule1', /a/ ],
      [ 'rule2', /b/ ],
      [ 'rule3', /c/ ],
      [ '#sub' ],
    ];

    lang.grammar.sub = [
      [ 'rule4', /d/ ],
      [ 'rule5', /e/ ],
      [ 'rule6', /f/ ],
    ];

    new Lexer( lang );

    const { main, sub } = lang.grammar;
    expect( main.length ).toBe( 6 );

    expect( main[ 3 ] ).toBe( sub[ 0 ] );
    expect( main[ 4 ] ).toBe( sub[ 1 ] );
    expect( main[ 5 ] ).toBe( sub[ 2 ] );
  } );

  test( 'can init languages registered by the `use` property.', () => {
    const lang1: Language = {
      id     : 'test1',
      name   : 'Test1',
      grammar: {
        main: [
          [ 'rule1', /a/ ],
          [ 'rule2', /b/ ],
          [ 'rule3', /c/ ],
        ],
      },
    };

    const lang2: Language = {
      id     : 'test2',
      name   : 'Test2',
      grammar: {
        main: [
          [ 'rule4', /d/ ],
          [ 'rule5', /e/ ],
          [ 'rule6', /f/ ],
        ],
      },
    };

    lang.use = { lang1, lang2 };

    new Lexer( lang );

    lang1.grammar.main.forEach( ( [ , regexp ] ) => {
      expect( regexp.flags.includes( 'y' ) ).toBe( true );
    } );

    lang2.grammar.main.forEach( ( [ , regexp ] ) => {
      expect( regexp.flags.includes( 'y' ) ).toBe( true );
    } );
  } );
} );
