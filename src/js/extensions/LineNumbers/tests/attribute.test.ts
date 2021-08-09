import { RyuseiLight } from '../../../core/RyuseiLight/RyuseiLight';
import { LineNumbers, LINE_NUMBER_CLASS_NAME, ATTRIBUTE_LINE_NUMBERS } from '../LineNumbers';
import { Gutter } from '../../Gutter/Gutter';


describe( 'ActiveLines', () => {
  RyuseiLight.compose( { Gutter, LineNumbers } );

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

  test( 'can append lines to the gutter element.', () => {
    const ryuseilight = new RyuseiLight();
    document.body.firstElementChild.setAttribute( ATTRIBUTE_LINE_NUMBERS, '1' );

    ryuseilight.apply( 'pre' );

    const lineNumbers = document.getElementsByClassName( LINE_NUMBER_CLASS_NAME );

    expect( lineNumbers.length ).toBe( 10 );
    expect( lineNumbers[ 0 ].textContent.trim() ).toBe( '1' );
    expect( lineNumbers[ lineNumbers.length - 1 ].textContent.trim() ).toBe( '10' );
  } );

  test( 'should start the line number specified by the option.', () => {
    const ryuseilight = new RyuseiLight();
    document.body.firstElementChild.setAttribute( ATTRIBUTE_LINE_NUMBERS, '100' );

    ryuseilight.apply( 'pre' );

    const lineNumbers = document.getElementsByClassName( LINE_NUMBER_CLASS_NAME );

    expect( lineNumbers.length ).toBe( 10 );
    expect( lineNumbers[ 0 ].textContent.trim() ).toBe( '100' );
    expect( lineNumbers[ lineNumbers.length - 1 ].textContent.trim() ).toBe( '109' );
  } );
} );
