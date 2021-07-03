import { Language, Token } from '../../types';
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
    private lines;
    /**
     * Indicates the current line index.
     */
    private index;
    /**
     * The depth of the state.
     */
    private depth;
    /**
     * Limits the number of lines.
     */
    private limit;
    /**
     * Turned to be `true` if the tokenization is manually aborted.
     */
    private aborted;
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
    private init;
    /**
     * Includes tokenizers required by `#` annotation and flatten them.
     *
     * @param language   - A language object.
     * @param tokenizers - Tokenizers.
     *
     * @return Merged tokenizers.
     */
    private merge;
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
    private parse;
    /**
     * Pushes the provided token to the lines array.
     *
     * @param token    - A token to push.
     * @param language - A Language object.
     * @param state    - A state name.
     */
    private push;
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
    private handle;
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