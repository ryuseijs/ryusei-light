import { Language, Token, Tokenizer } from '../../types';
import { LINE_BREAK } from '../../constants/characters';
import { CATEGORY_TEXT } from '../../constants/categories';
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
  protected depth = 0;

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
    return tokenizers.reduce( ( merged, tokenizer ) => {
      const [ category, regexp ] = tokenizer;

      if ( startsWith( category, '#' ) && ! regexp ) {
        const include = language.grammar[ category.slice( 1 ) ];
        assert( include );
        merged.push( ...this.merge( language, include ) );
      } else {
        const flags = regexp.toString().match( /[gimsy]*$/ )[ 0 ].replace( /[gy]/g, '' );
        let source = regexp.source + ( isStickySupported ? '' : '|()' );

        forOwn( language.source, ( replacement, key ) => {
          source = source.replace( new RegExp( `%${ key }`, 'g' ), replacement.source );
        } );

        tokenizer[ 1 ] = new RegExp( source, ( isStickySupported ? 'y' : 'g' ) + flags );
        merged.push( tokenizer );
      }

      return merged;
    }, [] );
  }

  /**
   * Tokenizes the text by the provided language and tokenizers.
   *
   * @param text       - A text to tokenize.
   * @param language   - A Grammar object.
   * @param tokenizers - An array with tokenizers.
   *
   * @return An index of the text where the handling ends.
   */
  protected tokenizeBy( text: string, language: Language, tokenizers: Tokenizer[] ): number {
    let index    = 0;
    let position = 0;

    main:
    while ( index < text.length ) {
      for ( let i = 0; i < tokenizers.length; i++ ) {
        const tokenizer = tokenizers[ i ];
        const regexp    = tokenizer[ 1 ];
        const command   = tokenizer[ 2 ];

        regexp.lastIndex = index;

        const match = regexp.exec( text );

        if ( ! match || ! match[ 0 ] ) {
          continue;
        }

        if ( position < index ) {
          this.push( [ CATEGORY_TEXT, text.slice( position, index ) ] );
        }

        if ( command === '@back' ) {
          position = index;
          break main;
        }

        const offset = this.handle( match, language, tokenizer );
        index += offset || 1;
        position = index;

        if ( command === '@break' ) {
          this.depth--;
          break main;
        }

        continue main;
      }

      index++;
    }

    if ( position < index ) {
      this.push( [ CATEGORY_TEXT, text.slice( position ) ] );
    }

    return index;
  }

  /**
   * Pushes the provided token to the lines array.
   *
   * @param token - A token to push.
   */
  protected push( token: Token ): void {
    assert( this.depth >= 0 );

    const [ category ] = token;

    let index;
    let from = 0;
    let text = token[ 1 ];

    while ( ( index = text.indexOf( LINE_BREAK, from ) ) > -1 ) {
      if ( from < index ) {
        this.lines[ this.index ].push( [ category, text.slice( from, index ), this.depth ] );
      }

      from = index + 1;
      this.lines[ ++this.index ] = [];
    }

    text = text.slice( from );

    if ( text ) {
      this.lines[ this.index ].push( [ category, text, this.depth ] );
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
    let offset = 0;

    if ( category ) {
      let [ text ] = match;

      if ( tokenizer[ 3 ] === '@debug' ) {
        // eslint-disable-next-line
        console.log( text, tokenizer );
      }

      if ( startsWith( category, '@' ) ) {
        assert( language.use );

        const lang = language.use[ category.slice( 1 ) ];
        assert( lang );

        return this.tokenizeBy( text, lang, lang.grammar.main );
      }

      if ( startsWith( category, '#' ) ) {
        const tokenizers = language.grammar[ category.slice( 1 ) ];
        assert( tokenizers );

        if ( tokenizer[ 2 ] === '@rest' ) {
          text = match.input.slice( match.index );
          this.depth++;
        }

        return this.tokenizeBy( text, language, tokenizers );
      }

      offset = text.length;
      this.push( [ category, text ] );
    }

    return offset;
  }

  /**
   * Tokenizes the text by the current language.
   *
   * @param text  - A text to tokenize.
   *
   * @return An array with tokens.
   */
  tokenize( text: string ): Token[][] {
    this.lines = [ [] ];
    this.index = 0;

    this.tokenizeBy( text, this.language, this.language.grammar.main );

    return this.lines;
  }
}
