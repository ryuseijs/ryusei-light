import { LINE_BREAK } from '../../../constants/characters';
import { RyuseiLight } from '../../../core/RyuseiLight/RyuseiLight';
import { Diff, CLASS_ADDED, CLASS_DELETED } from '../Diff';
import { LineNumbers, LINE_NUMBER_CLASS_NAME } from '../../LineNumbers/LineNumbers';
import { Gutter, GUTTER_ROW_CLASS_NAME } from '../../Gutter/Gutter';


describe( 'Diff', () => {
  RyuseiLight.compose( { Diff, Gutter, LineNumbers } );

  test( 'can add added/deleted classes to line numbers.', () => {
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

    const ryuseilight = new RyuseiLight( { diff: true, lineNumbers: true } );
    ryuseilight.apply( 'pre' );

    const added = document.querySelectorAll(
      `.${ GUTTER_ROW_CLASS_NAME }.${ CLASS_ADDED } .${ LINE_NUMBER_CLASS_NAME }`
    );

    const removed = document.querySelectorAll(
      `.${ GUTTER_ROW_CLASS_NAME }.${ CLASS_DELETED } .${ LINE_NUMBER_CLASS_NAME }`
    );

    expect( added.length ).toBe( 2 );
    expect( added[ 0 ].textContent ).toBe( '2' );
    expect( added[ 1 ].textContent ).toBe( '3' );

    // Line numbers of removed lines should be empty (LINE_BREAK).
    expect( removed.length ).toBe( 3 );
    expect( removed[ 0 ].textContent ).toBe( LINE_BREAK );
    expect( removed[ 1 ].textContent ).toBe( LINE_BREAK );
    expect( removed[ 2 ].textContent ).toBe( LINE_BREAK );
  } );
} );
