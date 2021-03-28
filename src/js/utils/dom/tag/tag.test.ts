import { tag } from './tag';


describe( 'tag', () => {
  test( 'can generate an open div tag with classes.', () => {
    const div = tag( [ 'class1', 'class2' ] );
    expect( div ).toBe( '<div class="class1 class2">' );
  } );

  test( 'can generate a specified tag with classes.', () => {
    const pre = tag( [ 'class1', 'class2' ], 'pre' );
    expect( pre ).toBe( '<pre class="class1 class2">' );
  } );
} );
