import { Renderer } from '../Renderer';


describe( 'Renderer.destroy()', () => {
  test( 'can destroy a renderer.', () => {
    const onDestroy = jest.fn();

    const Component = ( renderer: Renderer ) => {
      renderer.event.on( 'destroy', onDestroy );
    };

    Renderer.compose( { Component } );

    const renderer = new Renderer( [], { id: '', name: '' } );

    renderer.destroy();
    expect( onDestroy ).toHaveBeenCalledTimes( 1 );

    renderer.event.emit( 'destroy' );
    renderer.event.emit( 'destroy' );
    renderer.event.emit( 'destroy' );
    expect( onDestroy ).toHaveBeenCalledTimes( 1 );
  } );
} );
