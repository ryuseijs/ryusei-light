import { Language, Options, Token } from '../../types';
import { Lexer } from '../Lexer/Lexer';
import { Renderer } from '../Renderer/Renderer';
import { ROOT } from '../../constants/classes';
import { ATTRIBUTE_LANGUAGE } from '../../constants/attributes';
import { attr, isHTMLElement, text, assert, isString, assign, addClass, toArray } from '../../utils';
import { none } from '../../languages';


/**
 * Stores all Lexer instances.
 */
const lexers: Record<string, Lexer> = {};

/**
 * The class that tokenizes code for syntax highlighting.
 *
 * @since 0.0.1
 */
export class RyuseiLight {
  /**
   * Registers languages.
   *
   * @param languages - A Language object or objects.
   */
  static register( languages: Language | Language[] ): void {
    toArray( languages ).forEach( language => {
      const { id } = language;

      if ( id && ! lexers[ id ] ) {
        ( language.alias || [] ).concat( id ).forEach( id => {
          lexers[ id ] = new Lexer( language );
        } );
      }
    } );
  }

  /**
   * Composes extensions.
   *
   * @param extensions - An object literal with Extension functions.
   */
  static compose = Renderer.compose;

  /**
   * Tokenizes the provided string.
   *
   * @param code     - A string to tokenize.
   * @param language - A language ID.
   * @param limit    - Optional. Limits the (ideal) number of lines.
   *
   * @return An array of arrays with tokens as [ string, string ].
   */
  static tokenize( code: string, language: string, limit?: number ): Token[][] {
    return RyuseiLight.getLexer( language ).tokenize( code, limit );
  }

  /**
   * Checks if the given language has been already registered or not.
   *
   * @param language - A language to check.
   */
  static has( language: string ): boolean {
    return !! lexers[ language ];
  }

  /**
   * Returns a registered Lexer instance.
   * If it's not found, the `none` lexer will be returned.
   *
   * @param language - A language name.
   */
  private static getLexer( language: string ) {
    if ( ! lexers.none ) {
      RyuseiLight.register( none() );
    }

    return lexers[ language ] || lexers.none;
  }

  /**
   * Holds all renderers.
   */
  private readonly renderers: Renderer[] = [];

  /**
   * Holds options.
   */
  private readonly options: Options;

  /**
   * The RyuseiLight constructor.
   *
   * @param options  - Optional. Options.
   */
  constructor( options?: Options ) {
    this.options = assign( {}, options );
  }

  /**
   * Returns a new Renderer instance.
   *
   * @param code    - A code to highlight.
   * @param elm     - Optional. An element to highlight.
   * @param options - Optional. Options.
   */
  private getRenderer( code: string, elm?: HTMLElement, options?: Options ) {
    options = assign( {}, this.options, options );

    const language     = options.language;
    const { name, id } = RyuseiLight.getLexer( language ).language;
    return new Renderer( RyuseiLight.tokenize( code, language ), { name, id }, elm, options );
  }

  /**
   * Applies the highlighter to elements that matches the selector or the provided element.
   *
   * @param target  - A selector or an element.
   * @param options - Optional. Options.
   */
  apply( target: string | Element, options?: Options ): void {
    const elms = isString( target ) ? document.querySelectorAll( target ) : [ target ];

    for ( let i = 0; i < elms.length; i++ ) {
      const elm = elms[ i ];

      if ( isHTMLElement( elm ) ) {
        const elmOptions = assign( {}, options, { language: attr( elm, ATTRIBUTE_LANGUAGE ) || undefined } );
        const renderer   = this.getRenderer( text( elm ), elm, elmOptions );
        const isPre      = elm instanceof HTMLPreElement;

        if ( isPre ) {
          addClass( elm, [ ROOT, `${ ROOT }--${ renderer.info.id }` ] );
        }

        elm.innerHTML = renderer.html( ! isPre );

        renderer.event.emit( 'applied', elm );
        this.renderers.push( renderer );
      }
    }
  }

  /**
   * Returns highlighted HTML by tokenizing the provided code.
   *
   * @param code    - Code to highlight.
   * @param options - Optional. Options.
   *
   * @return Highlighted HTML string.
   */
  html( code: string, options?: Options ): string {
    assert( isString( code ), 'Invalid code.' );
    return this.getRenderer( code, null, options ).html( true );
  }

  /**
   * Destroys the instance.
   */
  destroy(): void {
    this.renderers.forEach( renderer => {
      renderer.destroy();
    } );
  }
}
