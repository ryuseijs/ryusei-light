import { RyuseiLight } from '../../../core/RyuseiLight/RyuseiLight';
import { Gutter, GUTTER_ROW_CLASS_NAME } from '../../Gutter/Gutter';
import { Diff } from '../Diff';


describe( 'Diff', () => {
  RyuseiLight.compose( { Gutter, Diff } );

  test( 'can append + and - in the gutter element', () => {
    document.body.innerHTML = `<pre>
      1
+     2
+     3
      4
-     5
-     6
-     7
      8
      9
      10
    </pre>`;

    const ryuseilight = new RyuseiLight( { diff: true } );
    ryuseilight.apply( 'pre' );

    const rows = document.getElementsByClassName( GUTTER_ROW_CLASS_NAME );

    expect( rows[ 1 ].textContent ).toBe( '+' );
    expect( rows[ 2 ].textContent ).toBe( '+' );

    expect( rows[ 4 ].textContent ).toBe( '-' );
    expect( rows[ 5 ].textContent ).toBe( '-' );
    expect( rows[ 6 ].textContent ).toBe( '-' );
  } );

  test( 'should append specified symbols.', () => {
    document.body.innerHTML = `<pre>
      1
>     2
>     3
      4
<     5
<     6
<     7
      8
      9
      10
    </pre>`;

    const ryuseilight = new RyuseiLight( { diff: { addedSymbol: '>', deletedSymbol: '<' } } );
    ryuseilight.apply( 'pre' );

    const rows = document.getElementsByClassName( GUTTER_ROW_CLASS_NAME );

    expect( rows[ 1 ].textContent ).toBe( '>' );
    expect( rows[ 2 ].textContent ).toBe( '>' );

    expect( rows[ 4 ].textContent ).toBe( '<' );
    expect( rows[ 5 ].textContent ).toBe( '<' );
    expect( rows[ 6 ].textContent ).toBe( '<' );
  } );
} );
