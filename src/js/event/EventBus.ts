import { AnyFunction, EventHandler } from '../types';


/**
 * The class for providing the very simple event bus.
 *
 * @private
 * @since 0.0.1
 */
export class EventBus {
  /**
   * Holds handlers.
   */
  protected handlers: Record<string, EventHandler[]> = {};

  /**
   * Attaches a handler.
   *
   * @param event    - An event name.
   * @param callback - A callback function to register.
   * @param priority - Optional. A priority number for the order in which the callbacks are invoked.
   */
  on( event: string, callback: AnyFunction, priority = 10 ): void {
    const handlers = ( this.handlers[ event ] = this.handlers[ event ] || [] );
    handlers.push( { callback, priority } );
    handlers.sort( ( handler1, handler2 ) => handler1.priority - handler2.priority );
  }

  /**
   * Emits an event.
   *
   * @param event - An event name.
   * @param args  - Optional. Any number of arguments to pass to callbacks.
   */
  emit( event: string, ...args: any[] ): void {
    ( this.handlers[ event ] || [] ).forEach( handler => {
      handler.callback( ...args );
    } );
  }

  /**
   * Destroys the event bus.
   */
  destroy(): void {
    this.handlers = {};
  }
}
