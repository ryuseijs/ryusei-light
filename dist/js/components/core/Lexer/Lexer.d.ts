import { Language, Token, Tokenizer } from '../../types';
/**
 * The class for creating a simple lexer by a Language object.
 *
 * @since 0.0.1
 */
export declare class Lexer {
    /**
     * Holds the Language object.
     */
    readonly language: Language;
    /**
     * Stores lines.
     */
    protected lines: Token[][];
    /**
     * Indicates the current line index.
     */
    protected index: number;
    /**
     * The depth of the state.
     */
    protected depth: number;
    /**
     * Limits the number of lines.
     */
    protected limit: number;
    /**
     * Turned to be `true` if the tokenization is manually aborted.
     */
    protected aborted: boolean;
    /**
     * The Lexer constructor.
     *
     * @param language - A Language object.
     */
    constructor(language: Language);
    /**
     * Initializes the language object.
     *
     * @param language - A Language object to initialize.
     */
    protected init(language: Language): void;
    /**
     * Includes tokenizers required by `#` annotation and flatten them.
     *
     * @param language   - A language object.
     * @param tokenizers - Tokenizers.
     *
     * @return Merged tokenizers.
     */
    protected merge(language: Language, tokenizers: Tokenizer[]): Tokenizer[];
    /**
     * Parses the text by the provided language and tokenizers.
     *
     * @param text       - A text to tokenize.
     * @param language   - A Language object.
     * @param tokenizers - An array with tokenizers.
     * @param state      - Optional. The current state name.
     *
     * @return An index of the text where the handling ends.
     */
    protected parse(text: string, language: Language, tokenizers: Tokenizer[], state: string): number;
    /**
     * Pushes the provided token to the lines array.
     *
     * @param token    - A token to push.
     * @param language - A Language object.
     * @param state    - A state name.
     */
    protected push(token: Token, language: Language, state: string): void;
    /**
     * Handles the matched text.
     *
     * @param match     - A matched result.
     * @param language  - A Language object.
     * @param tokenizer - A tokenizer that has been matched with the text.
     * @param state     - A state name.
     *
     * @return An index of the text where the handling ends.
     */
    protected handle(match: RegExpExecArray, language: Language, tokenizer: Tokenizer, state: string): number;
    /**
     * Tokenizes the text by the current language.
     *
     * @param text  - A text to tokenize.
     * @param limit - Optional. Limits the number of lines.
     *
     * @return An array with tokens.
     */
    tokenize(text: string, limit?: number): Token[][];
}
//# sourceMappingURL=Lexer.d.ts.map