import { CATEGORY_ENTITY } from '../../../constants/categories';


describe( 'html', () => {
  test( 'can tokenize entities.', () => {
    [
      '&lt;',
      '&gt;',
      '&amp;',
      '&quot;',
      '&apos;',
      '&cent;',
      '&pound;',
      '&yen;',
      '&euro;',
      '&copy;',
      '&reg;',
      '&#60;',
      '&#162;',
    ].forEach( entity => {
      expect( entity ).toBeTokenized( 'html', [ [ CATEGORY_ENTITY, entity ] ] );
    } );
  } );
} );




