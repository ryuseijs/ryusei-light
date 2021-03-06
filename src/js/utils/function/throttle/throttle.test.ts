import { throttle } from './throttle';


describe( 'throttle', () => {
  test( 'can control how often the callback function should be executed by the specified interval.', done => {
    const callback  = jest.fn();
    const interval  = 1000;
    const throttled = throttle( callback, interval );

    throttled();
    throttled();
    throttled();
    throttled();

    expect( callback ).toHaveBeenCalledTimes( 0 );

    // In the half way of the interval.
    setTimeout( () => {
      throttled();
      throttled();
      throttled();
      throttled();

      expect( callback ).toHaveBeenCalledTimes( 0 );
    }, interval / 2 );

    // After the interval duration.
    setTimeout( () => {
      throttled();
      throttled();
      throttled();
      throttled();

      expect( callback ).toHaveBeenCalledTimes( 1 );

      done();
    }, interval + 100 );
  } );
} );
