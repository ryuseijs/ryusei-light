import { CATEGORY_PROLOG } from '../../../constants/categories';


describe( 'html', () => {
  test( 'can tokenize doctype declarations.', () => {
    [
      '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">',
      '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">',
      '<!DOCTYPE html>',
    ].forEach( doctype => {
      expect( doctype ).toBeTokenized( 'html', [
        [ CATEGORY_PROLOG, doctype ],
      ] );
    } );
  } );
} );
