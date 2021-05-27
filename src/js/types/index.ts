import { Renderer } from '../core/Renderer/Renderer';


/**
 * The type for any function.
 *
 * @since 0.0.1
 */
export type AnyFunction = ( ...args: any[] ) => any;

/**
 * The type for a single tokenizer.
 *
 * @since 0.0.1
 */
export type Tokenizer = [ string, RegExp?, string?, string? ];

/**
 * The interface for a Grammar object that contains tokenizers.
 *
 * @since 0.0.1
 */
export interface Grammar {
  /**
   * The main tokenizers used for initial search.
   */
  main: Tokenizer[];

  /**
   * The index signature for sub tokenizers.
   */
  [ key: string ]: Tokenizer[];
}

/**
 * The interface for a language definition object.
 *
 * @since 0.0.1
 */
export interface Language {
  /**
   * The language id. This must be unique among all IDs and aliases.
   */
  id: string;

  /**
   * The language name.
   */
  name: string;

  /**
   * Language ID aliases. This must be unique among all IDs and aliases.
   */
  alias?: string[];

  /**
   * Defines other languages to use in the grammar.
   */
  use?: { [ key: string ]: Language };

  /**
   * Sources which tokenizers will be replaced by.
   */
  source?: { [ key: string ]: RegExp };

  /**
   * An object containing arrays with tokenizers.
   */
  grammar: Grammar;
}

/**
 * The type for a token as [ category, text, depth ].
 *
 * @since 0.0.1
 */
export type Token = [ string, string, TokenInfo? ];

/**
 * The interface for information of a token.
 *
 * @since 1.1.0
 */
export interface TokenInfo {
  /**
   * Depth of a tokenizer state.
   */
  depth: number;

  /**
   * A language ID.
   */
  language: string;

  /**
   * A state name.
   */
  state: string;

  /**
   * `true` when the token is split into multilines and it is the first token.
   */
  head?: boolean;

  /**
   * `true` when the token is split into multilines and it is the last token.
   */
  tail?: boolean;

  /**
   * Indicates whether the token is split into multilines or not.
   */
  split?: boolean;

  /**
   * The number of lines from this token to the head token.
   */
  distance?: number;
}

/**
 * The interface for a language info object.
 *
 * @since 0.0.1
 */
export interface LanguageInfo {
  /**
   * The language id.
   */
  id: string;

  /**
   * The language name.
   */
  name: string;
}

/**
 * The type for a Component function.
 *
 * @since 0.0.1
 */
export type Component = ( renderer: Renderer ) => void;

/**
 * The interface for options.
 *
 * @since 0.0.1
 */
export interface Options {
  /**
   * Defines the key signature for dynamic properties.
   */
  [ key: string ]: any;

  /**
   * Specifies a language for the tokenizer.
   */
  language?: string;

  /**
   * Determines whether to use `span` element instead of `code` for each fragment or not.
   */
  span?: boolean;

  /**
   * Determines whether to wrap code or not.
   */
  wrap?: boolean;

  /**
   * Determines whether to render a gutter or not.
   */
  gutter?: boolean;

  /**
   * A caption of the code snippet.
   */
  caption?: string | {
    /**
     * Determines the position of the caption.
     */
    position?: 'top' | 'bottom';

    /**
     * An HTML string appended to the span element in the figcaption.
     */
    html: string;
  };

  /**
   * Determines whether to render an overlay element or not.
   */
  overlay?: {
    topRight?: boolean,
    topLeft?: boolean,
  };

  /**
   * Determines whether to display line numbers or not.
   * If a number is provided, the line number starts with it.
   */
  lineNumbers?: boolean | number;

  /**
   * Specifies line numbers to highlight as an array with a number for single line or an array for range,
   * such as [ 1, [ 7, 10 ], 16 ].
   */
  activeLines?: Array<number | [ number,  number ]>;

  /**
   * Determines whether to display a language name or not.
   */
  languageName?: boolean | 'topLeft' | 'topRight';

  /**
   * Options for the Copy component.
   */
  copy?: boolean | {
    /**
     * A position where to display the button.
     */
    position?: 'topLeft' | 'topRight';

    /**
     * An HTML string for the button content.
     */
    html?: string;

    /**
     * An HTML string for the button content displayed after the button is clicked.
     */
    activeHtml?: string;

    /**
     * Duration in milliseconds for displaying the `activeHTML`.
     */
    duration?: number;

    /**
     * The value for `aria-label` of the button.
     */
    ariaLabel?: string;
  };

  /**
   * Options for the Diff component.
   */
  diff?: boolean | {
    /**
     * Whether to remove `+/-` symbols or convert it to a space.
     * By default, the mark will be a space.
     */
    removeSymbols?: boolean;

    /**
     * Determines a symbol for added lines. The default value is `+`.
     */
    addedSymbol?: string;

    /**
     * Determines a symbol for deleted (removed) lines. The default value is `-`.
     */
    deletedSymbol?: string;
  };
}
