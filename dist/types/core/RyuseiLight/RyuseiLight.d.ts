import { Language, Options, Token } from '../../types';
import { Renderer } from '../Renderer/Renderer';
/**
 * The class that tokenizes code for syntax highlighting.
 *
 * @since 0.0.1
 */
export declare class RyuseiLight {
    /**
     * Registers languages.
     *
     * @param languages - A Language object or objects.
     */
    static register(languages: Language | Language[]): void;
    /**
     * Composes extensions.
     *
     * @param extensions - An object literal with Extension functions.
     */
    static compose: typeof Renderer.compose;
    /**
     * Tokenizes the provided string.
     *
     * @param code     - A string to tokenize.
     * @param language - A language ID.
     * @param limit    - Optional. Limits the (ideal) number of lines.
     *
     * @return An array of arrays with tokens as [ string, string ].
     */
    static tokenize(code: string, language: string, limit?: number): Token[][];
    /**
     * Checks if the given language has been already registered or not.
     *
     * @param language - A language to check.
     */
    static has(language: string): boolean;
    /**
     * Returns a registered Lexer instance.
     * If it's not found, the `none` lexer will be returned.
     *
     * @param language - A language name.
     */
    private static getLexer;
    /**
     * Holds all renderers.
     */
    private readonly renderers;
    /**
     * Holds options.
     */
    private readonly options;
    /**
     * The RyuseiLight constructor.
     *
     * @param options  - Optional. Options.
     */
    constructor(options?: Options);
    /**
     * Returns a new Renderer instance.
     *
     * @param code    - A code to highlight.
     * @param elm     - Optional. An element to highlight.
     * @param options - Optional. Options.
     */
    private getRenderer;
    /**
     * Applies the highlighter to elements that matches the selector or the provided element.
     *
     * @param target  - A selector or an element.
     * @param options - Optional. Options.
     */
    apply(target: string | Element, options?: Options): void;
    /**
     * Returns highlighted HTML by tokenizing the provided code.
     *
     * @param code    - Code to highlight.
     * @param options - Optional. Options.
     *
     * @return Highlighted HTML string.
     */
    html(code: string, options?: Options): string;
    /**
     * Destroys the instance.
     */
    destroy(): void;
}
//# sourceMappingURL=RyuseiLight.d.ts.map