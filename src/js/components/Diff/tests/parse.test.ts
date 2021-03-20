import { RyuseiLight } from '../../../core/RyuseiLight/RyuseiLight';
import { Diff, CLASS_ADDED, CLASS_DELETED } from '../Diff';


describe( 'Diff', () => {
  RyuseiLight.compose( { Diff } );

  test( 'can add added/deleted classes to lines with +/-.', () => {
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

    const added   = document.getElementsByClassName( CLASS_ADDED );
    const removed = document.getElementsByClassName( CLASS_DELETED );

    expect( added.length ).toBe( 2 );
    expect( added[ 0 ].textContent.trim() ).toBe( '2' );
    expect( added[ 1 ].textContent.trim() ).toBe( '3' );

    expect( removed.length ).toBe( 3 );
    expect( removed[ 0 ].textContent.trim() ).toBe( '5' );
    expect( removed[ 1 ].textContent.trim() ).toBe( '6' );
    expect( removed[ 2 ].textContent.trim() ).toBe( '7' );
  } );

  test( 'should respect specified symbols.', () => {
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

    const added   = document.getElementsByClassName( CLASS_ADDED );
    const removed = document.getElementsByClassName( CLASS_DELETED );

    expect( added.length ).toBe( 2 );
    expect( added[ 0 ].textContent.trim() ).toBe( '2' );
    expect( added[ 1 ].textContent.trim() ).toBe( '3' );

    expect( removed.length ).toBe( 3 );
    expect( removed[ 0 ].textContent.trim() ).toBe( '5' );
    expect( removed[ 1 ].textContent.trim() ).toBe( '6' );
    expect( removed[ 2 ].textContent.trim() ).toBe( '7' );
  } );

  test( 'should remove symbols if required.', () => {
    document.body.innerHTML = `<pre>
      1
+     2
+     3
      4
    </pre>`;

    const ryuseilight = new RyuseiLight( { diff: { removeSymbols: true } } );
    ryuseilight.apply( 'pre' );

    const added = document.getElementsByClassName( CLASS_ADDED );

    expect( added.length ).toBe( 2 );
    expect( added[ 0 ].textContent ).toBe( '     2' );
    expect( added[ 1 ].textContent ).toBe( '     3' );
  } );
} );
