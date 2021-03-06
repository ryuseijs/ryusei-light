import { EventBus } from '../EventBus';


describe( 'EventBus', () => {
  test( 'can register a handler to the bus by #on() and can trigger it by #emit().', () => {
    const event    = new EventBus();
    const callback = jest.fn();

    event.on( 'open', callback );

    event.emit( 'open' );
    expect( callback ).toHaveBeenCalledTimes( 1 );

    event.emit( 'open' );
    expect( callback ).toHaveBeenCalledTimes( 2 );
  } );

  test( 'can emit an event with any number of arguments.', () => {
    const event    = new EventBus();
    const callback = jest.fn();

    event.on( 'open', callback );

    event.emit( 'open', 1, true, null );
    expect( callback ).toHaveBeenCalledWith( 1, true, null );
  } );

  test( 'can discard all handlers by #destroy().', () => {
    const event    = new EventBus();
    const callback = jest.fn();

    event.on( 'open', callback );

    event.emit( 'open' );
    expect( callback ).toHaveBeenCalledTimes( 1 );

    event.destroy();

    event.emit( 'open' );
    expect( callback ).toHaveBeenCalledTimes( 1 );
  } );
} );
