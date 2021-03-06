import { Renderer } from '../Renderer';


describe( 'Renderer.compose()', () => {
  test( 'can compose components.', () => {
    const Component = ( renderer: Renderer ) => {
      expect( renderer.info.id ).toBe( 'langId' );
      expect( renderer.info.name ).toBe( 'langName' );
    };

    Renderer.compose( { Component } );

    new Renderer( [], { id: 'langId', name: 'langName' } );
  } );
} );
