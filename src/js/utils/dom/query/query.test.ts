import { query } from './query';


describe( 'query', () => {
  beforeEach( () => {
    document.body.innerHTML = `
      <div id="div1">
        <span>1</span>
      </div>
      <div id="div2">
        <span>2</span>
      </div>
      <div id="div3">
        <span>3</span>
      </div>
    `;
  } );

  test( 'can get the first element that matches the specified selector.', () => {
    const div1 = query( 'div' );
    expect( div1.id ).toBe( 'div1' );

    const div3 = query( '#div3' );
    expect( div3.id ).toBe( 'div3' );
  } );

  test( 'can accept a parent element to start find an element from.', () => {
    const div2  = query( '#div2' );
    const span2 = query( 'span', div2 );

    expect( span2.textContent ).toBe( '2' );
  } );

  test( 'should return `null` if nothing matches the selector.', () => {
    expect( query( '#nothing' ) ).toBeNull();
  } );
} );
