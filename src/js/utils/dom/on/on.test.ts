import { on } from './on';


describe( 'on', () => {
  test( 'can attach a handler to the specific event of the window object.', () => {
    const callback = jest.fn();

    on( window, 'resize', callback );

    expect( callback ).not.toHaveBeenCalled();

    window.dispatchEvent( new Event( 'resize' ) );
    expect( callback ).toHaveBeenCalledTimes( 1 );

    window.dispatchEvent( new Event( 'resize' ) );
    expect( callback ).toHaveBeenCalledTimes( 2 );
  } );

  test( 'can attach a handler to the specific event of an element', () => {
    const callback = jest.fn();
    const div      = document.createElement( 'div' );

    on( div, 'click', callback );

    expect( callback ).not.toHaveBeenCalled();

    div.dispatchEvent( new Event( 'click' ) );
    expect( callback ).toHaveBeenCalledTimes( 1 );

    div.dispatchEvent( new Event( 'click' ) );
    expect( callback ).toHaveBeenCalledTimes( 2 );
  } );
} );
