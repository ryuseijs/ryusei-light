import {
  CATEGORY_ATTRIBUTE,
  CATEGORY_BRACKET,
  CATEGORY_CDATA,
  CATEGORY_DELIMITER,
  CATEGORY_TAG, CATEGORY_TEXT, CATEGORY_VALUE,
} from '../../../constants/categories';


describe( 'xml', () => {
  test( 'can tokenize tags.', () => {
    const xml = `
      <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <sitemap>
          <loc>https://thepopp.com/sitemap-misc.xml</loc>
        </sitemap>
      </sitemapindex>
    `;

    expect( xml ).toBeTokenized( 'xml', [
      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_TAG, 'sitemapindex' ],
      [ CATEGORY_ATTRIBUTE, 'xmlns' ],
      [ CATEGORY_DELIMITER, '=' ],
      [ CATEGORY_VALUE, '"http://www.sitemaps.org/schemas/sitemap/0.9"' ],
      [ CATEGORY_BRACKET, '>' ],

      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_TAG, 'sitemap' ],
      [ CATEGORY_BRACKET, '>' ],

      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_TAG, 'loc' ],
      [ CATEGORY_BRACKET, '>' ],

      [ CATEGORY_TEXT, 'https://thepopp.com/sitemap-misc.xml' ],

      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_DELIMITER, '/' ],
      [ CATEGORY_TAG, 'loc' ],
      [ CATEGORY_BRACKET, '>' ],

      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_DELIMITER, '/' ],
      [ CATEGORY_TAG, 'sitemap' ],
      [ CATEGORY_BRACKET, '>' ],

      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_DELIMITER, '/' ],
      [ CATEGORY_TAG, 'sitemapindex' ],
      [ CATEGORY_BRACKET, '>' ],
    ] );
  } );
} );
