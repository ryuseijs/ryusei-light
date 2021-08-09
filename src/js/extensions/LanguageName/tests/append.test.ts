import { PROJECT_CODE_SHORT } from '../../../constants/project';
import { RyuseiLight } from '../../../core/RyuseiLight/RyuseiLight';
import { LanguageName } from '../LanguageName';
import { Overlay } from '../../Overlay/Overlay';
import { typescript, javascript, json } from '../../../languages';


describe( 'LanguageName', () => {
  RyuseiLight.register( [ typescript(), javascript(), json() ] );
  RyuseiLight.compose( { Overlay, LanguageName } );

  beforeEach( () => {
    document.body.innerHTML = '<pre></pre>';
  } );

  test( 'can render a language name.`', () => {
    const ryuseilight = new RyuseiLight( { languageName: true, language: 'typescript' } );
    ryuseilight.apply( 'pre' );

    const name1 = document.querySelector( `.${ PROJECT_CODE_SHORT }__name` );
    expect( name1.textContent ).toBe( 'TypeScript' );

    document.body.innerHTML = '<pre></pre>';

    ryuseilight.apply( 'pre', { language: 'json' } );

    const name2 = document.querySelector( `.${ PROJECT_CODE_SHORT }__name` );
    expect( name2.textContent ).toBe( 'JSON' );
  } );

  test( 'can render a language name on the right side if the `languageName` is `topRight`', () => {
    const ryuseilight = new RyuseiLight( { languageName: 'topRight', language: 'js' } );
    ryuseilight.apply( 'pre' );

    const name    = document.querySelector( `.${ PROJECT_CODE_SHORT }__name` );
    const overlay = name.parentElement;

    expect( overlay.classList.contains( `${ PROJECT_CODE_SHORT }__overlay--top-right` ) ).toBe( true );
  } );

  test( 'can render a language name on the left side if the `copy.position` is `topLeft`', () => {
    const ryuseilight = new RyuseiLight( { languageName: 'topLeft', language: 'js' } );
    ryuseilight.apply( 'pre' );

    const name    = document.querySelector( `.${ PROJECT_CODE_SHORT }__name` );
    const overlay = name.parentElement;

    expect( overlay.classList.contains( `${ PROJECT_CODE_SHORT }__overlay--top-left` ) ).toBe( true );
  } );
} );
