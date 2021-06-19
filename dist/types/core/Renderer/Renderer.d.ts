import { EventBus } from '../../event/EventBus';
import { Component, LanguageInfo, Options, Token } from '../../types';
/**
 * The class for highlighting code via provided tokens.
 *
 * @since 0.0.1
 */
export declare class Renderer {
    /**
     * Adds components.
     *
     * @param components - An object literal with Component functions.
     */
    static compose(components: Record<string, Component>): void;
    /**
     * Holds lines with tokens.
     */
    readonly lines: Token[][];
    /**
     * Holds the language info.
     */
    readonly info: LanguageInfo;
    /**
     * Holds the root element if provided.
     */
    readonly root: HTMLElement | undefined;
    /**
     * Holds options.
     */
    readonly options: Options;
    /**
     * Holds the EventBus instance.
     */
    readonly event: EventBus;
    /**
     * The Renderer constructor.
     *
     * @param lines   - Lines with tokens to render.
     * @param info    - The language info object.
     * @param root    - Optional. A root element to highlight.
     * @param options - Options.
     */
    constructor(lines: Token[][], info: LanguageInfo, root?: HTMLElement, options?: Options);
    /**
     * Initializes the instance.
     */
    protected init(): void;
    /**
     * Renders lines as HTML.
     *
     * @param append - A function to add fragments to the HTML string.
     *
     * @return A rendered HTML string.
     */
    protected renderLines(append: (fragment: string) => void): void;
    /**
     * Returns all lines and wrapper elements.
     *
     * @param pre - Whether to wrap elements by `pre` or not.
     *
     * @return An HTML string.
     */
    html(pre: boolean): string;
    /**
     * Destroys the instance.
     */
    destroy(): void;
}
//# sourceMappingURL=Renderer.d.ts.map