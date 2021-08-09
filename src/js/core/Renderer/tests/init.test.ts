import { Token } from '../../../types';
import { Renderer } from '../Renderer';


describe( 'Renderer#init()', () => {
  const info = { id: '', name: '' };

  test( 'can remove the last empty line.', () => {
    const tokens :Token[][] = [
      [ [ '', '' ] ],
      [ [ '', '' ] ],
      [ [ '', '' ] ],
    ];

    new Renderer( tokens, info );

    expect( tokens.length ).toBe( 2 );
  } );

  test( 'should not remove the last line if it is not empty.', () => {
    const tokens :Token[][] = [
      [ [ '', '' ] ],
      [ [ '', '' ] ],
      [ [ 'string', 'string' ] ],
    ];

    new Renderer( tokens, info );

    expect( tokens.length ).toBe( 3 );
  } );

  test( 'can init extensions and emit the `mounted` event.', () => {
    const mounted = jest.fn();

    const Extension = ( renderer: Renderer ) => {
      renderer.event.on( 'mounted', mounted );
    };

    Renderer.compose( { Extension } );

    new Renderer( [], info );
    expect( mounted ).toHaveBeenCalled();
  } );
} );
