import {
  CATEGORY_BRACKET,
  CATEGORY_CDATA,
  CATEGORY_DELIMITER,
  CATEGORY_TAG,
} from '../../../constants/categories';


describe( 'xml', () => {
  test( 'can tokenize cdata sections.', () => {
    const xml = `
    <detail>
      <![CDATA[
        CDATA section
      ]]>
    </detail>
    `;

    expect( xml ).toBeTokenized( 'xml', [
      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_TAG, 'detail' ],
      [ CATEGORY_BRACKET, '>' ],

      [ CATEGORY_CDATA, '<![CDATA[' ],
      [ CATEGORY_CDATA, '        CDATA section' ],
      [ CATEGORY_CDATA, '      ]]>' ],

      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_DELIMITER, '/' ],
      [ CATEGORY_TAG, 'detail' ],
      [ CATEGORY_BRACKET, '>' ],
    ] );
  } );
} );
