import { Language } from '../../../types';
import { RyuseiLight } from '../RyuseiLight';
import { CLASSES } from '../../../constants/classes';
import { PROJECT_CODE_SHORT } from '../../../constants/project';


describe( 'RyuseiLight#html()', () => {
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

  function getResult( id: string, tag = 'code' ): string[] {
    return [
      `<pre class="${ CLASSES.root } ${ CLASSES.root }--${ id }">`,
      `<div class="${ CLASSES.container }">`,
      `<div class="${ CLASSES.body }">`,
      `<div class="${ CLASSES.code }">`,

      `<div class="${ CLASSES.line }">`,
      `<${ tag } class="${ CLASSES.token } ${ PROJECT_CODE_SHORT }__${ id }-a">aaa</${ tag }>`,
      '</div>',

      `<div class="${ CLASSES.line }">`,
      `<${ tag } class="${ CLASSES.token } ${ PROJECT_CODE_SHORT }__${ id }-a">aaa</${ tag }>`,
      '</div>',

      '</div>',
      '</div>',
      '</div>',
      '</pre>',
    ];
  }

  test( 'can return tokenized HTML.', () => {
    const ryuseilight = new RyuseiLight();

    expect( ryuseilight.html( 'aaa\naaa', { language: 'lang1' } ) ).toBe( getResult( 'lang1' ).join( '' ) );
    expect( ryuseilight.html( 'aaa\naaa', { language: 'lang2' } ) ).toBe( getResult( 'lang2' ).join( '' ) );
  } );

  test( 'should respect options provided via the constructor.', () => {
    const ryuseilight = new RyuseiLight( { language: 'lang2', span: true } );

    // Use the default option:
    expect( ryuseilight.html( 'aaa\naaa' ) )
      .toBe( getResult( 'lang2', 'span' ).join( '' ) );

    // Override:
    expect( ryuseilight.html( 'aaa\naaa', { language: 'lang1', span: false } ) )
      .toBe( getResult( 'lang1' ).join( '' ) );
  } );
} );
