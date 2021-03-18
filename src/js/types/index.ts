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
 * The type for a token.
 *
 * @since 0.0.1
 */
export type Token = [ string, string ];

/**
 * The type for a return value of tokenize functions.
 *
 * @since 0.0.1
 */
export type TokenizeResult = { offset: number, tokens: Token[] };

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
   * A title of the code snippet.
   */
  title?: string;

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
   * Options for a copy button.
   */
  copy?: boolean | {
    position?: 'topLeft' | 'topRight';
    html?: string;
    activeHtml?: string;
    duration?: number;
    ariaLabel?: string;
  }
}
