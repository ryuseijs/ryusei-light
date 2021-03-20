import { LINE } from '../../../constants/classes';
import { RyuseiLight } from '../../../core/RyuseiLight/RyuseiLight';
import { ActiveLines } from '../ActiveLines';


describe( 'ActiveLines', () => {
  RyuseiLight.compose( { ActiveLines } );

  beforeEach( () => {
    document.body.innerHTML = `<pre>
      1
      2
      3
      4
      5
      6
      7
      8
      9
      10
    </pre>`;
  } );

  test( 'can highlight lines specified by options.', () => {
    const ryuseilight = new RyuseiLight( { activeLines: [ 5, 9 ] } );
    ryuseilight.apply( 'pre' );

    const activeLines = document.querySelectorAll( `.${ LINE }.is-active` );

    expect( activeLines.length ).toBe( 2 );
    expect( activeLines[ 0 ].textContent.trim() ).toBe( '5' );
    expect( activeLines[ 1 ].textContent.trim() ).toBe( '9' );
  } );

  test( 'can highlight lines specified by options as a range.', () => {
    const ryuseilight = new RyuseiLight( { activeLines: [ [ 5, 9 ] ] } );
    ryuseilight.apply( 'pre' );

    const activeLines = document.querySelectorAll( `.${ LINE }.is-active` );

    expect( activeLines.length ).toBe( 5 );
    expect( activeLines[ 0 ].textContent.trim() ).toBe( '5' );
    expect( activeLines[ activeLines.length - 1 ].textContent.trim() ).toBe( '9' );
  } );

  test( 'can highlight lines specified by options as a number and range.', () => {
    const ryuseilight = new RyuseiLight( { activeLines: [ 3, [ 5, 9 ] ] } );
    ryuseilight.apply( 'pre' );

    const activeLines = document.querySelectorAll( `.${ LINE }.is-active` );

    expect( activeLines.length ).toBe( 6 );
    expect( activeLines[ 0 ].textContent.trim() ).toBe( '3' );
    expect( activeLines[ 1 ].textContent.trim() ).toBe( '5' );
    expect( activeLines[ activeLines.length - 1 ].textContent.trim() ).toBe( '9' );
  } );
} );
