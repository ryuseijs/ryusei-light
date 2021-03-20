import { BODY, CODE, CONTAINER, ROOT } from '../../../constants/classes';
import { PROJECT_CODE_SHORT } from '../../../constants/project';
import { RyuseiLight } from '../../../core/RyuseiLight/RyuseiLight';
import { Overlay } from '../Overlay';


describe( 'Overlay', () => {
  RyuseiLight.compose( { Overlay } );

  let result;

  beforeEach( () => {
    result = [
      `<pre class="${ ROOT } ${ ROOT }--none">`,
      `<div class="${ CONTAINER } has-top-overlay">`,
      `<div class="${ BODY }">`,
      `<div class="${ CODE }">`,

      '</div>', // code
      '</div>', // body
      '</div>', // container
      '</pre>',
    ];
  } );

  test( 'can render the overlay element if the `overlay.topRight` option is true.', () => {
    const ryuseilight = new RyuseiLight( { overlay: { topRight: true } } );
    const className   = `${ PROJECT_CODE_SHORT }__overlay`;
    const html        = ryuseilight.html( '' );

    result.splice( 6, 0,
      `<div class="${ className } ${ className }--top-right">`,
      '</div>'
    );

    expect( html ).toBe( result.join( '' ) );
  } );

  test( 'can render the overlay element if the `overlay.topLeft` option is true.', () => {
    const ryuseilight = new RyuseiLight( { overlay: { topLeft: true } } );
    const className   = `${ PROJECT_CODE_SHORT }__overlay`;
    const html        = ryuseilight.html( '' );

    result.splice( 6, 0,
      `<div class="${ className } ${ className }--top-left">`,
      '</div>'
    );

    expect( html ).toBe( result.join( '' ) );
  } );

  test( 'can render the overlay element if the `tools` option is `topRight`.', () => {
    const ryuseilight = new RyuseiLight( { tools: 'topRight' } );
    const className   = `${ PROJECT_CODE_SHORT }__overlay`;
    const html        = ryuseilight.html( '' );

    result.splice( 6, 0,
      `<div class="${ className } ${ className }--top-right">`,
      `<span class="${ PROJECT_CODE_SHORT }__tools">`,
      '</span>',
      '</div>'
    );

    expect( html ).toBe( result.join( '' ) );
  } );

  test( 'can render the overlay element if the `tools` option is `topLeft`.', () => {
    const ryuseilight = new RyuseiLight( { tools: 'topLeft' } );
    const className   = `${ PROJECT_CODE_SHORT }__overlay`;
    const html        = ryuseilight.html( '' );

    result.splice( 6, 0,
      `<div class="${ className } ${ className }--top-left">`,
      `<span class="${ PROJECT_CODE_SHORT }__tools">`,
      '</span>',
      '</div>'
    );

    expect( html ).toBe( result.join( '' ) );
  } );
} );
