import { CATEGORY_COMMENT } from '../../../constants/categories';


describe( 'html', () => {
  test( 'can tokenize comments', () => {
    const comment1 = '<!-- <div></div> -->';
    expect( comment1 ).toBeTokenized( 'html', [
      [ CATEGORY_COMMENT, comment1 ],
    ] );

    const comment2 = `<!--
        <div></div>
    -->`;
    expect( comment2 ).toBeTokenized( 'html', [
      [ CATEGORY_COMMENT, '<!--' ],
      [ CATEGORY_COMMENT, '        <div></div>' ],
      [ CATEGORY_COMMENT, '    -->' ],
    ] );
  } );
} );
