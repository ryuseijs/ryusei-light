import { RyuseiLight } from '../../../core/RyuseiLight/RyuseiLight';
import { Caption, ATTRIBUTE_CAPTION } from '../Caption';


describe( 'Caption', () => {
  RyuseiLight.compose( { Caption } );

  beforeEach( () => {
    document.body.innerHTML = '<pre></pre>';
  } );

  test( 'can warp code by a figure element.', () => {
    const ryuseilight = new RyuseiLight( { caption: 'Caption' } );
    ryuseilight.apply( 'pre' );

    const pre = document.querySelector( 'pre' );
    expect( pre.firstElementChild.tagName.toLowerCase() ).toBe( 'figure' );
  } );

  test( 'can append a figcaption with a provided caption.', () => {
    const ryuseilight = new RyuseiLight( { caption: 'Caption' } );
    ryuseilight.apply( 'pre' );

    const figure     = document.querySelector( 'figure' );
    const figcaption = figure.firstElementChild;

    expect( figcaption.tagName.toLowerCase() ).toBe( 'figcaption' );
    expect( figcaption.textContent ).toBe( 'Caption' );
  } );

  test( 'can append a figcaption on the bottom of the figure element.', () => {
    const ryuseilight = new RyuseiLight( { caption: { position: 'bottom', html: 'Bottom Caption' } } );
    ryuseilight.apply( 'pre' );

    const figure     = document.querySelector( 'figure' );
    const figcaption = figure.lastElementChild;

    expect( figcaption.tagName.toLowerCase() ).toBe( 'figcaption' );
    expect( figcaption.textContent ).toBe( 'Bottom Caption' );
  } );

  test( 'should use a data attribute value as a caption if specified.', () => {
    document.body.innerHTML = `<pre ${ ATTRIBUTE_CAPTION }="Attribute"></pre>`;

    const ryuseilight = new RyuseiLight();
    ryuseilight.apply( 'pre' );

    const figcaption = document.querySelector( 'figcaption' );
    expect( figcaption.textContent ).toBe( 'Attribute' );
  } );
} );
