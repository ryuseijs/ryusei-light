import { isObject, isString, isArray, isUndefined, isFunction, isHTMLElement } from './type';


describe( 'Type methods', () => {
  describe( 'isObject', () => {
    test( 'can return `true` if a subject is an object.', () => {
      [ {}, { a: 1 }, new Date() ].forEach( subject => {
        expect( isObject( subject ) ).toBe( true );
      } );
    } );

    test( 'should return `false` for non object subjects.', () => {
      [ 1, 'a', true, undefined, null, NaN, () => 0 ].forEach( subject => {
        expect( isObject( subject ) ).toBe( false );
      } );
    } );
  } );

  describe( 'isArray', () => {
    test( 'can return `true` if a subject is an array.', () => {
      [ [], [ 1 ], new Array( 1 ) ].forEach( subject => {
        expect( isArray( subject ) ).toBe( true );
      } );
    } );

    test( 'should return `false` for non array subjects.', () => {
      [ 1, 'a', true, undefined, null, { length: 1 }, { a: 1 }, NaN, () => 0 ].forEach( subject => {
        expect( isArray( subject ) ).toBe( false );
      } );
    } );
  } );

  describe( 'isFunction', () => {
    test( 'can return `true` if a subject is a function.', () => {
      [ () => 1, isString, Date ].forEach( subject => {
        expect( isFunction( subject ) ).toBe( true );
      } );
    } );

    test( 'should return `false` for non function subjects.', () => {
      [ 1, 'a', true, undefined, null, [ 1 ], { a: 1 }, NaN ].forEach( subject => {
        expect( isFunction( subject ) ).toBe( false );
      } );
    } );
  } );

  describe( 'isString', () => {
    test( 'can return `true` if a subject is a string.', () => {
      [ '1', String( 1 ) ].forEach( subject => {
        expect( isString( subject ) ).toBe( true );
      } );
    } );

    test( 'should return `false` for non string subjects.', () => {
      [ 1, true, undefined, null, [ 1 ], { a: 1 }, NaN, () => 0 ].forEach( subject => {
        expect( isString( subject ) ).toBe( false );
      } );
    } );
  } );

  describe( 'isUndefined', () => {
    test( 'can return `true` if a subject is `undefined`.', () => {
      [ undefined ].forEach( subject => {
        expect( isUndefined( subject ) ).toBe( true );
      } );
    } );

    test( 'should return `false` for non `undefined` subjects.', () => {
      [ 1, true, '1', null, [ 1 ], { a: 1 }, NaN, () => 0 ].forEach( subject => {
        expect( isUndefined( subject ) ).toBe( false );
      } );
    } );
  } );

  describe( 'isHTMLElement', () => {
    test( 'can return `true` if a subject is a HTMLElement instance.', () => {
      [ document.body, document.createElement( 'div' ) ].forEach( subject => {
        expect( isHTMLElement( subject ) ).toBe( true );
      } );
    } );

    test( 'should return `false` for non HTMLElement subjects.', () => {
      [ 1, true, undefined, '1', null, [ 1 ], { a: 1 }, NaN, () => 0 ].forEach( subject => {
        expect( isHTMLElement( subject ) ).toBe( false );
      } );
    } );
  } );
} );
