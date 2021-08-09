import { BODY, CODE, CONTAINER, LINE, ROOT, TOKEN } from '../../constants/classes';
import { PROJECT_CODE_SHORT } from '../../constants/project';
import { EventBus } from '../../event/EventBus';
import { Extension, LanguageInfo, Options, Token } from '../../types';
import { escapeHtml, forOwn, tag } from '../../utils';


/**
 * Stores all Extensions functions.
 */
const Extensions: Record<string, Extension> = {};

/**
 * The class for highlighting code via provided tokens.
 *
 * @since 0.0.1
 */
export class Renderer {
  /**
   * Adds extensions.
   *
   * @param extensions - An object literal with Component functions.
   */
  static compose( extensions: Record<string, Extension> ): void {
    forOwn( extensions, ( Component, name ) => {
      Extensions[ name ] = Component;
    } );
  }

  /**
   * Holds lines with tokens.
   */
  readonly lines: Token[][] = [];

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
  readonly event: EventBus = new EventBus();

  /**
   * The Renderer constructor.
   *
   * @param lines   - Lines with tokens to render.
   * @param info    - The language info object.
   * @param root    - Optional. A root element to highlight.
   * @param options - Options.
   */
  constructor( lines: Token[][], info: LanguageInfo, root?: HTMLElement, options: Options = {} ) {
    this.lines   = lines;
    this.info    = info;
    this.root    = root;
    this.options = options;

    this.init();
  }

  /**
   * Initializes the instance.
   */
  private init(): void {
    const { lines } = this;

    if ( lines.length ) {
      const tokens = lines[ lines.length - 1 ];

      if ( ! tokens.length || ( tokens.length === 1 && ! tokens[ 0 ][ 1 ].trim() ) ) {
        // Removes the last empty line.
        lines.pop();
      }
    }

    forOwn( Extensions, Component => {
      Component( this );
    } );

    this.event.emit( 'mounted' );
  }

  /**
   * Renders lines as HTML.
   *
   * @param append - A function to add fragments to the HTML string.
   *
   * @return A rendered HTML string.
   */
  private renderLines( append: ( fragment: string ) => void ): void {
    const event   = this.event;
    const tagName = this.options.span ? 'span' : 'code';

    for ( let i = 0; i < this.lines.length; i++ ) {
      const tokens  = this.lines[ i ];
      const classes = [ LINE ];

      event.emit( 'line:open', append, classes, i );
      append( tag( classes ) );

      for ( let j = 0; j < tokens.length; j++ ) {
        const token      = tokens[ j ];
        const categories = token[ 0 ].split( '.' );
        const className  = `${ PROJECT_CODE_SHORT }__${ categories[ 0 ] }`;
        const modifiers  = categories.slice( 1 ).map( sub => `${ className }--${ sub }` );
        const classes    = [ TOKEN, className ].concat( modifiers );

        event.emit( 'token', token, classes );
        append( `${ tag( classes, tagName ) }${ escapeHtml( token[ 1 ] ) }</${ tagName }>` );
      }

      append( '</div>' );
      event.emit( 'line:closed', append, i );
    }
  }

  /**
   * Returns all lines and wrapper elements.
   *
   * @param pre - Whether to wrap elements by `pre` or not.
   *
   * @return An HTML string.
   */
  html( pre: boolean ): string {
    const { event } = this;
    const closeTag  = '</div>';
    let html  = '';

    const append = ( fragment: string ) => { html += fragment };

    if ( pre ) {
      html += tag( [ `${ ROOT } ${ ROOT }--${ this.info.id }` ], 'pre' );
    }

    const containerClasses = [ CONTAINER ];
    event.emit( 'open', append, containerClasses );
    html += tag( containerClasses );

    const bodyClasses = [ `${ BODY }${ this.options.wrap ? ` ${ BODY }--wrap` : '' }` ];
    event.emit( 'body:open', append, bodyClasses );
    html += tag( bodyClasses );

    event.emit( 'code:open', append );
    html += tag( [ CODE ] );
    this.renderLines( append );
    html += closeTag; // code

    event.emit( 'body:close', append );
    html += closeTag; // body

    event.emit( 'close', append );
    html += closeTag; // container

    event.emit( 'closed', append );

    if ( pre ) {
      html += `</pre>`;
    }

    return html;
  }

  /**
   * Destroys the instance.
   */
  destroy(): void {
    this.event.emit( 'destroy' );
    this.event.destroy();
  }
}
