import { Options, LanguageInfo, Token, Component } from '../../types';
import { EventBus } from '../../event/EventBus';
import { PROJECT_CODE_SHORT } from '../../constants/project';
import { CLASSES } from '../../constants/classes';
import { forOwn, escapeHtml } from '../../utils';


/**
 * Stores all Component functions.
 */
const Components: Record<string, Component> = {};

/**
 * The class for highlighting code via provided tokens.
 *
 * @since 1.0.0
 */
export class Renderer {
  /**
   * Adds components.
   *
   * @param components - An object literal with Component functions.
   */
  static compose( components: Record<string, Component> ): void {
    forOwn( components, ( Component, name ) => {
      if ( ! Components[ name ] ) {
        Components[ name ] = Component;
      }
    } );
  }

  /**
   * Holds lines with tokens.
   */
  readonly lines = [];

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
  protected init(): void {
    const { lines } = this;

    if ( lines.length ) {
      const tokens = lines[ lines.length - 1 ];

      if ( tokens.length === 1 && ! tokens[ 0 ][ 1 ].trim() ) {
        // Removes the last empty line.
        lines.pop();
      }
    }

    forOwn( Components, Component => { Component( this ) } );
    this.event.emit( 'mounted', this );
  }

  /**
   * Renders lines as HTML.
   *
   * @param append - A function to add fragments to the HTML string.
   *
   * @return A rendered HTML string.
   */
  protected renderLines( append: ( fragment: string ) => void ): void {
    const event = this.event;
    const tag   = this.options.span ? 'span' : 'code';

    for ( let i = 0; i < this.lines.length; i++ ) {
      const tokens  = this.lines[ i ];
      const classes = [ CLASSES.line ];

      event.emit( 'line:open', append, classes, i );
      append( `<div class="${ classes.join( ' ' ) }">` );

      for ( let j = 0; j < tokens.length; j++ ) {
        const token   = tokens[ j ];
        const classes = [ `${ CLASSES.token } ${ PROJECT_CODE_SHORT }__${ token[ 0 ] }` ];

        event.emit( 'token', token, classes );

        append( `<${ tag } class="${ classes.join( ' ' ) }">${ escapeHtml( token[ 1 ] ) }</${ tag }>` );
      }

      append( `</div>` );
      event.emit( 'line:closed', append, i );
    }
  }

  /**
   * Returns all lines and wrapper elements.
   *
   * @param pre - Whether to wrap elements by `pre` or not.
   *
   * @return A HTML string.
   */
  html( pre = true ): string {
    const event = this.event;
    let html  = '';

    const append = ( fragment: string ) => { html += fragment };

    if ( pre ) {
      html += `<pre class="${ CLASSES.root } ${ CLASSES.root }--${ this.info.id }">`;
    }

    const containerClasses = [ CLASSES.container ];
    event.emit( 'open', append, containerClasses );

    html += `<div class="${ containerClasses.join( ' ' ) }">`;
    event.emit( 'opened', append );

    const bodyClasses = [ `${ CLASSES.body }${ this.options.wrap ? ` ${ CLASSES.body }--wrap` : '' }` ];
    event.emit( 'body:open', append, bodyClasses );

    html += `<div class="${ bodyClasses.join( ' ' ) }">`;
    event.emit( 'body:opened', append );

    html += `<div class="${ CLASSES.code }">`;
    this.renderLines( append );
    html += `</div>`; // code

    event.emit( 'body:close', append );
    html += `</div>`; // body

    event.emit( 'close', append );
    html += `</div>`; // container

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
