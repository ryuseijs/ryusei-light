import { CLASSES } from '../../../constants/classes';
import { PROJECT_CODE_SHORT } from '../../../constants/project';
import { Language } from '../../../types';
import { RyuseiLight } from '../RyuseiLight';


describe( 'RyuseiLight#apply()', () => {
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

  beforeEach( () => {
    document.body.innerHTML = '<pre id="pre1">aaa</pre><pre id="pre2">aaa</pre>';
  } );

  function getResult( id: string, tag = 'code' ): string[] {
    return [
      `<div class="${ CLASSES.container }">`,
      `<div class="${ CLASSES.body }">`,
      `<div class="${ CLASSES.code }">`,

      `<div class="${ CLASSES.line }">`,
      `<${ tag } class="${ CLASSES.token } ${ PROJECT_CODE_SHORT }__${ id }-a">aaa</${ tag }>`,
      '</div>',

      '</div>',
      '</div>',
      '</div>',
    ];
  }

  test( 'can highlight a provided element.', () => {
    const pre1 = document.querySelector( '#pre1' );

    const ryuseiLight = new RyuseiLight();
    ryuseiLight.apply( pre1, { language: 'lang1' } );

    expect( pre1.innerHTML ).toBe( getResult( 'lang1' ).join( '' ) );
  } );

  test( 'can highlight all elements that matches a provided selector.', () => {
    const pre1 = document.querySelector( '#pre1' );
    const pre2 = document.querySelector( '#pre2' );

    const ryuseiLight = new RyuseiLight();
    ryuseiLight.apply( 'pre', { language: 'lang1' } );

    expect( pre1.innerHTML ).toBe( getResult( 'lang1' ).join( '' ) );
    expect( pre2.innerHTML ).toBe( getResult( 'lang1' ).join( '' ) );
  } );

  test( 'should not highlight elements that does not match a selector.', () => {
    const pre1 = document.querySelector( '#pre1' );
    const pre2 = document.querySelector( '#pre2' );

    const ryuseiLight = new RyuseiLight();
    ryuseiLight.apply( '#pre1', { language: 'lang1' } );

    expect( pre1.innerHTML ).toBe( getResult( 'lang1' ).join( '' ) );
    expect( pre2.innerHTML ).toBe( 'aaa' );
  } );

  test( 'should respect options provided via the constructor.', () => {
    const pre1 = document.querySelector( '#pre1' );
    const pre2 = document.querySelector( '#pre2' );

    const ryuseiLight = new RyuseiLight( { language: 'lang2' } );
    ryuseiLight.apply( pre1 );

    // Use a span tag only for the #pre2.
    ryuseiLight.apply( pre2, { span: true } );

    expect( pre1.innerHTML ).toBe( getResult( 'lang2' ).join( '' ) );
    expect( pre2.innerHTML ).toBe( getResult( 'lang2', 'span' ).join( '' ) );
  } );
} );
