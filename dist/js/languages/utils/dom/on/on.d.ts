export declare function on<K extends keyof DocumentEventMap>(elm: Document, events: K, callback: (e: DocumentEventMap[K]) => void): void;
export declare function on<K extends keyof WindowEventMap>(elm: Window, events: K, callback: (e: WindowEventMap[K]) => void): void;
export declare function on<K extends keyof HTMLElementEventMap>(elm: HTMLElement, events: K, callback: (e: HTMLElementEventMap[K]) => void): void;
export declare function on<K extends keyof ElementEventMap>(elm: Element, events: K, callback: (e: ElementEventMap[K]) => void): void;
export declare function on(elm: Window | Document | Element, events: string, callback: (e: Event) => void): void;
//# sourceMappingURL=on.d.ts.map