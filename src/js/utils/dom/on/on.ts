export function on<K extends keyof DocumentEventMap>(
  elm: Document,
  events: K,
  callback: ( e: DocumentEventMap[ K ] ) => void,
): void;

export function on<K extends keyof WindowEventMap>(
  elm: Window,
  events: K,
  callback: ( e: WindowEventMap[ K ] ) => void,
): void;

export function on<K extends keyof HTMLElementEventMap>(
  elm: HTMLElement,
  events: K,
  callback: ( e: HTMLElementEventMap[ K ] ) => void,
): void;

export function on<K extends keyof ElementEventMap>(
  elm: Element,
  events: K,
  callback: ( e: ElementEventMap[ K ] ) => void,
): void;

export function on(
  elm: Window | Document | Element,
  events: string,
  callback: ( e: Event ) => void,
): void;

/**
 * Attaches a handler to the event.
 *
 * @param elm      - An element, a window or a document.
 * @param events   - An event name or names.
 * @param callback - A handler to attach.
 */
export function on( elm: Element | Window | Document, events: string, callback: ( e: Event ) => void ): void {
  events.split( ' ' ).forEach( event => {
    elm.addEventListener( event, callback );
  } );
}
