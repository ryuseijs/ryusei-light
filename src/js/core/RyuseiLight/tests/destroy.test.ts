import { Renderer } from '../../Renderer/Renderer';
import { RyuseiLight } from '../RyuseiLight';


describe( 'RyuseiLight.destroy()', () => {
  beforeEach( () => {
    document.body.innerHTML = '<pre>aaa</pre>';
  } );

  test( 'can destroy renderers.', () => {
    const onDestroy = jest.fn();

    const Component = ( renderer: Renderer ) => {
      renderer.event.on( 'destroy', onDestroy );
    };

    RyuseiLight.compose( { Component } );

    const ryuseilight = new RyuseiLight();

    ryuseilight.apply( 'pre' );

    ryuseilight.destroy();
    expect( onDestroy ).toHaveBeenCalledTimes( 1 );

    ryuseilight.destroy();
    ryuseilight.destroy();
    ryuseilight.destroy();
    expect( onDestroy ).toHaveBeenCalledTimes( 1 );
  } );
} );
