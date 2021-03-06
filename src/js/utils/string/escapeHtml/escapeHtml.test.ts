import { escapeHtml } from './escapeHtml';


describe( 'escapeHtml', () => {
  test( 'can escape &.', () => {
    expect( escapeHtml( '&' ) ).toBe( '&amp;' );
  } );

  test( 'can escape <.', () => {
    expect( escapeHtml( '<' ) ).toBe( '&lt;' );
  } );

  test( 'can escape < and &.', () => {
    expect( escapeHtml( '<&' ) ).toBe( '&lt;&amp;' );
  } );
} );
