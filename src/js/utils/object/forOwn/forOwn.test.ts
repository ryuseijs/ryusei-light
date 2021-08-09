import { forOwn } from './forOwn';


describe( 'forOwn', () => {
  test( 'can iterate an object by own enumerable properties.', () => {
    const object = { a: 1, b: 2, c: 3 };
    let counter = 0;

    forOwn( object, ( value, key ) => {
      counter++;
      expect( object[ key ] ).toBe( value );
    } );

    expect( counter ).toBe( Object.keys( object ).length );
  } );

  test( 'should not handle inherited properties.', () => {
    function Constructor() {
      this.a = 1;
      this.b = 2;
    }

    Constructor.prototype.c = 3;

    const object = {};

    forOwn( new ( Constructor as any )(), ( value, key ) => {
      object[ key ] = value;
    } );

    expect( object ).toStrictEqual( { a: 1, b: 2 } );
  } );
} );
