import { CATEGORY_SPACE } from '../../constants/categories';
import { LINE_BREAK } from '../../constants/characters';
import { PROJECT_CODE_SHORT } from '../../constants/project';
import { Renderer } from '../../core/Renderer/Renderer';
import { Token } from '../../types';
import { assign, isObject, startsWith } from '../../utils';


/**
 * The class name for added lines.
 *
 * @private
 * @since 0.0.17
 */
export const CLASS_ADDED = 'is-added';

/**
 * The class name for deleted lines.
 *
 * @private
 * @since 0.0.17
 */
export const CLASS_DELETED = 'is-deleted';

/**
 * The class name for deleted lines.
 *
 * @private
 * @since 0.0.17
 */
export const CLASS_DIFF = `${ PROJECT_CODE_SHORT }__diff`;

/**
 * Default options for the Diff component.
 *
 * @since 0.0.17
 */
const DEFAULT_OPTIONS = {
  addedSymbol  : '+',
  deletedSymbol: '-',
};

/**
 * The component for highlighting added/deleted lines.
 *
 * @since 0.0.17
 */
export function Diff( { event, lines, options }: Renderer ): void {
  if ( ! options.diff ) {
    return;
  }

  options.gutter = true;

  const diffOptions = assign( {}, DEFAULT_OPTIONS, isObject( options.diff ) ? options.diff : null );
  const added       = [];
  const deleted     = [];

  lines.forEach( ( tokens, index ) => {
    if ( tokens.length ) {
      const text = tokens[ 0 ][ 1 ];

      let processed;

      if ( startsWith( text, diffOptions.addedSymbol ) ) {
        added.push( index );
        processed = true;
      } else if ( startsWith( text, diffOptions.deletedSymbol ) ) {
        deleted.push( index );
        processed = true;
      }

      if ( processed ) {
        convertSymbols( diffOptions.removeSymbols, tokens );
      }
    }
  } );

  if ( ! added.length && ! deleted.length ) {
    return;
  }

  event.on( 'line:open', ( append, classes, i ) => {
    addClass( added, deleted, i, classes );
  } );

  event.on( 'gutter:row:open', ( append, classes, i ) => {
    addClass( added, deleted, i, classes );
  } );

  event.on( 'gutter:row:opened', ( append, i ) => {
    let content = LINE_BREAK;

    if ( added.indexOf( i ) > -1 ) {
      content = diffOptions.addedSymbol;
    } else if ( deleted.indexOf( i ) > -1 ) {
      content = diffOptions.deletedSymbol;
    }

    append( `<span class="${ CLASS_DIFF }">${ content }</span>` );
  }, 20 );

  event.on( 'lineNumber:open', ( append, classes, i, data ) => {
    data.skip = deleted.indexOf( i ) > -1;
  } );
}

/**
 * Adds a status class according to the added or deleted lines.
 *
 * @param added   - An array with added line indices.
 * @param deleted - An array with deleted line indices.
 * @param index   - A line index.
 * @param classes - An array with line classes.
 */
function addClass( added: number[], deleted: number[], index: number, classes: string[] ): void {
  if ( added.indexOf( index ) > -1 ) {
    classes.push( CLASS_ADDED );
  } else if ( deleted.indexOf( index ) > -1 ) {
    classes.push( CLASS_DELETED );
  }
}

/**
 * Converts +/- symbols to spaces or removes them.
 *
 * @param remove - Whether to remove symbols or not.
 * @param tokens - Target tokens.
 */
function convertSymbols( remove: boolean, tokens: Token[] ): void {
  const [ category, text ] = tokens[ 0 ];

  if ( remove ) {
    if ( text.length === 1 ) {
      tokens.shift();
    } else {
      tokens[ 0 ] = [ category, text.slice( 1 ) ];
    }
  } else {
    const spaceToken: Token = [ CATEGORY_SPACE, ' ' ];

    if ( text.length === 1 ) {
      tokens[ 0 ] = spaceToken;
    } else {
      tokens[ 0 ] = [ category, text.slice( 1 ) ];
      tokens.unshift( spaceToken );
    }
  }
}
