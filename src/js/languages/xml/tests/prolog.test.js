import { CATEGORY_PROLOG } from '../../../constants/categories';


describe( 'xml', () => {
  test( 'can tokenize prolog', () => {
    expect( '<?xml version="1.0" encoding="UTF-8"?>' ).toBeTokenized( 'xml', [
      [ CATEGORY_PROLOG, '<?xml version="1.0" encoding="UTF-8"?>' ],
    ] );
  } );
} );
