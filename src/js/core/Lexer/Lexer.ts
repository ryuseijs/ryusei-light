import { Language, Token, Tokenizer } from '../../types';
import { LINE_BREAK } from '../../constants/characters';
import { CATEGORY_LINEBREAK, CATEGORY_TEXT } from '../../constants/categories';
import { assert, forOwn, isUndefined, startsWith } from '../../utils';


/**
 * Checks if the RegExp supports the sticky flag or not.
 */
const isStickySupported = ! isUndefined( /x/.sticky );

/**
 * The class for creating a simple lexer by a Language object.
 *
 * @since 0.0.1
 */
export class Lexer {
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
  protected depth;

  /**
   * Limits the number of lines.
   */
  protected limit;

  /**
   * Turned to be `true` if the tokenization is manually aborted.
   */
  protected aborted;

  /**
   * The Lexer constructor.
   *
   * @param language - A Language object.
   */
  constructor( language: Language ) {
    this.language = language;
    this.init( language );
  }

  /**
   * Initializes the language object.
   *
   * @param language - A Language object to initialize.
   */
  protected init( language: Language ): void {
    forOwn( language.grammar, ( tokenizers, key ) => {
      language.grammar[ key ] = this.merge( language, tokenizers );
    } );

    forOwn( language.use, this.init.bind( this ) );
  }

  /**
   * Includes tokenizers required by `#` annotation and flatten them.
   *
   * @param language   - A language object.
   * @param tokenizers - Tokenizers.
   *
   * @return Merged tokenizers.
   */
  protected merge( language: Language, tokenizers: Tokenizer[] ): Tokenizer[] {
    const merged = [];

    for ( let i = 0; i < tokenizers.length; i++ ) {
      const tokenizer = tokenizers[ i ];
      const [ category, regexp ] = tokenizers[ i ];

      if ( startsWith( category, '#' ) && ! regexp ) {
        merged.push( ...this.merge( language, language.grammar[ category.slice( 1 ) ] ) );
      } else {
        const flags = regexp.toString().match( /[gimsy]*$/ )[ 0 ].replace( /[gy]/g, '' );
        let source = regexp.source + ( isStickySupported ? '' : '|()' );

        forOwn( language.source, ( replacement, key ) => {
          source = source.replace( new RegExp( `%${ key }`, 'g' ), replacement.source );
        } );

        tokenizer[ 1 ] = new RegExp( source, ( isStickySupported ? 'y' : 'g' ) + flags );
        merged.push( tokenizer );
      }
    }

    return merged;
  }

  /**
   * Parses the text by the provided language and tokenizers.
   *
   * @param text       - A text to tokenize.
   * @param language   - A Language object.
   * @param tokenizers - An array with tokenizers.
   *
   * @return An index of the text where the handling ends.
   */
  protected parse( text: string, language: Language, tokenizers: Tokenizer[] ): number {
    let index    = 0;
    let position = 0;

    this.depth++;

    main:
    while ( index < text.length && ! this.aborted ) {
      for ( let i = 0; i < tokenizers.length; i++ ) {
        const tokenizer = tokenizers[ i ];
        const [ , regexp, action ] = tokenizer;

        regexp.lastIndex = index;

        const match = regexp.exec( text );

        if ( ! match || ! match[ 0 ] ) {
          continue;
        }

        if ( position < index ) {
          this.push( [ CATEGORY_TEXT, text.slice( position, index ) ] );
        }

        if ( action === '@back' ) {
          position = index;
          break main;
        }

        const offset = this.handle( match, language, tokenizer );
        index += offset || 1;
        position = index;

        if ( action === '@break' ) {
          break main;
        }

        continue main;
      }

      index++;
    }

    if ( position < index ) {
      this.push( [ CATEGORY_TEXT, text.slice( position ) ] );
    }

    this.depth--;

    return index;
  }

  /**
   * Pushes the provided token to the lines array.
   *
   * @param token - A token to push.
   */
  protected push( token: Token ): void {
    const { depth } = this;
    const [ category, text ] = token;

    let index = 0;
    let from  = 0;

    while ( index > -1 && ! this.aborted ) {
      index = text.indexOf( LINE_BREAK, from );

      const line   = this.lines[ this.index ];
      const sliced = text.slice( from, index < 0 ? undefined : index );

      if ( sliced ) {
        line.push( [ category, sliced, depth ] );
      }

      if ( index > -1 ) {
        if ( ! line.length ) {
          line.push( [ CATEGORY_LINEBREAK, LINE_BREAK, depth ] );
        }

        this.index++;
        this.aborted = this.limit && this.index >= this.limit;

        if ( ! this.aborted ) {
          from = index + 1;
          this.lines[ this.index ] = [];
        }
      }
    }
  }

  /**
   * Handles the matched text.
   *
   * @param match     - A matched result.
   * @param language  - A Language object.
   * @param tokenizer - A tokenizer that has been matched with the text.
   *
   * @return An index of the text where the handling ends.
   */
  protected handle( match: RegExpExecArray, language: Language, tokenizer: Tokenizer ): number {
    const [ category ] = tokenizer;

    if ( ! category ) {
      return 0;
    }

    let [ text ] = match;

    if ( tokenizer[ 3 ] === '@debug' ) {
      // eslint-disable-next-line
      console.log( text, tokenizer );
    }

    if ( startsWith( category, '@' ) ) {
      assert( language.use );

      const lang = language.use[ category.slice( 1 ) ];
      assert( lang );

      return this.parse( text, lang, lang.grammar.main );
    }

    if ( startsWith( category, '#' ) ) {
      const tokenizers = language.grammar[ category.slice( 1 ) ];
      assert( tokenizers );

      if ( tokenizer[ 2 ] === '@rest' ) {
        text = match.input.slice( match.index );
      }

      return this.parse( text, language, tokenizers );
    }

    this.push( [ category, text ] );
    return text.length;
  }

  /**
   * Tokenizes the text by the current language.
   *
   * @param text  - A text to tokenize.
   * @param limit - Optional. Limits the number of lines.
   *
   * @return An array with tokens.
   */
  tokenize( text: string, limit?: number ): Token[][] {
    this.lines   = [ [] ];
    this.index   = 0;
    this.depth   = -1;
    this.limit   = limit || 0;
    this.aborted = false;

    this.parse( text, this.language, this.language.grammar.main );

    return this.lines;
  }
}
