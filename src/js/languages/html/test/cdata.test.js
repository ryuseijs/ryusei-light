import {
  CATEGORY_BRACKET,
  CATEGORY_CDATA,
  CATEGORY_DELIMITER,
  CATEGORY_TAG,
  CATEGORY_TAG_CLOSE,
} from '../../../constants/categories';


describe( 'html', () => {
  test( 'can tokenize CDATA.', () => {
    expect( '<![CDATA[ content ]]>' ).toBeTokenized( 'html', [
      [ CATEGORY_CDATA, '<![CDATA[ content ]]>' ],
    ] );
  } );

  test( 'can tokenize CDATA in script tags.', () => {
    const style = `
      <script>
        <![CDATA[
          <message> CDATA section </message>
        ]]>
      </script>
    `;

    expect( style ).toBeTokenized( 'html', [
      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_TAG, 'script' ],
      [ CATEGORY_BRACKET, '>' ],

      [ CATEGORY_CDATA, '<![CDATA[' ],
      [ CATEGORY_CDATA, '          <message> CDATA section </message>' ],
      [ CATEGORY_CDATA, '        ]]>' ],

      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_DELIMITER, '/' ],
      [ CATEGORY_TAG_CLOSE, 'script' ],
      [ CATEGORY_BRACKET, '>' ],
    ] );
  } );
} );
