import { AnyFunction } from '../types';


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
  protected handlers = {};

  /**
   * Attaches a handler.
   *
   * @param event    - An event name.
   * @param callback - A callback function to register.
   */
  on( event: string, callback: AnyFunction ): void {
    const handlers = ( this.handlers[ event ] = this.handlers[ event ] || [] );
    handlers.push( { callback } );
  }

  /**
   * Emits an event.
   *
   * @param event - An event name.
   * @param args  - Optional. Any number of arguments to pass to callbacks.
   */
  emit( event, ...args ): void {
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
