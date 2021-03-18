import { CLASSES } from '../../../constants/classes';
import { PROJECT_CODE_SHORT } from '../../../constants/project';
import { Token } from '../../../types';
import { Renderer } from '../Renderer';


describe( 'Renderer#html()', () => {
  const info = { id: 'test', name: 'Test' };
  let result;

  beforeEach( () => {
    result = [
      `<pre class="${ CLASSES.root } ${ CLASSES.root }--test">`,
      `<div class="${ CLASSES.container }">`,
      `<div class="${ CLASSES.body }">`,
      `<div class="${ CLASSES.code }">`,

      '</div>', // code
      '</div>', // body
      '</div>', // container
      '</pre>',
    ];
  } );

  test( 'can return HTML with some wrapper elements.', () => {
    const tokens :Token[][] = [
      [ [ 'string', 'string1' ] ],
      [ [ 'string', 'string2' ] ],
    ];

    const renderer = new Renderer( tokens, info );

    result.splice( 4, 0,
      `<div class="${ CLASSES.line }">`,
      `<code class="${ CLASSES.token } ${ PROJECT_CODE_SHORT }__string">string1</code>`,
      '</div>',
      `<div class="${ CLASSES.line }">`,
      `<code class="${ CLASSES.token } ${ PROJECT_CODE_SHORT }__string">string2</code>`,
      '</div>'
    );

    expect( renderer.html( true ) ).toBe( result.join( '' ) );

    result.pop();
    result.shift();
    expect( renderer.html( false ) ).toBe( result.join( '' ) );
  } );

  test( 'should emit `open` event.', () => {
    const renderer  = new Renderer( [], info );
    const { event } = renderer;

    event.on( 'open', ( append, classes ) => {
      append( '<br>' );
      classes.push( 'additional-class' );
    } );

    result[ 1 ] = `<div class="${ CLASSES.container } additional-class">`;
    result.splice( 1, 0, '<br>' );

    expect( renderer.html( true ) ).toBe( result.join( '' ) );
  } );

  test( 'should emit `opened` event.', () => {
    const renderer  = new Renderer( [], info );
    const { event } = renderer;

    event.on( 'opened', append => {
      append( '<br>' );
    } );

    result.splice( 2, 0, '<br>' );

    expect( renderer.html( true ) ).toBe( result.join( '' ) );
  } );

  test( 'should emit `body:opened` event.', () => {
    const renderer  = new Renderer( [], info );
    const { event } = renderer;

    event.on( 'body:opened', append => {
      append( '<br>' );
    } );

    result.splice( 3, 0, '<br>' );

    expect( renderer.html( true ) ).toBe( result.join( '' ) );
  } );

  test( 'should emit `body:close` event.', () => {
    const renderer  = new Renderer( [], info );
    const { event } = renderer;

    event.on( 'body:close', append => {
      append( '<br>' );
    } );

    result.splice( 5, 0, '<br>' );

    expect( renderer.html( true ) ).toBe( result.join( '' ) );
  } );

  test( 'should emit `close` event.', () => {
    const renderer  = new Renderer( [], info );
    const { event } = renderer;

    event.on( 'close', append => {
      append( '<br>' );
    } );

    result.splice( 6, 0, '<br>' );

    expect( renderer.html( true ) ).toBe( result.join( '' ) );
  } );

  test( 'should emit `line:open` and `line:closed` event.', () => {
    const tokens :Token[][] = [
      [ [ 'string', 'string1' ] ],
      [ [ 'string', 'string2' ] ],
    ];

    const renderer  = new Renderer( tokens, info );
    const { event } = renderer;

    event.on( 'line:open', ( append, classes, i ) => {
      append( '<br>' );
      classes.push( `line-${ i + 1 }` );
    } );

    event.on( 'line:closed', ( append ) => {
      append( '<hr>' );
    } );

    result.splice( 4, 0,
      '<br>',
      `<div class="${ CLASSES.line } line-1">`,
      `<code class="${ CLASSES.token } ${ PROJECT_CODE_SHORT }__string">string1</code>`,
      '</div>',
      '<hr>',

      '<br>',
      `<div class="${ CLASSES.line } line-2">`,
      `<code class="${ CLASSES.token } ${ PROJECT_CODE_SHORT }__string">string2</code>`,
      '</div>',
      '<hr>'
    );

    expect( renderer.html( true ) ).toBe( result.join( '' ) );
  } );

  test( 'should emit `token` event.', () => {
    const tokens :Token[][] = [
      [ [ 'string', 'string1' ] ],
      [ [ 'string', 'string2' ] ],
    ];

    const renderer  = new Renderer( tokens, info );
    const { event } = renderer;

    event.on( 'token', ( token, classes ) => {
      classes.push( `content-${ token[ 1 ] }` );
    } );

    result.splice( 4, 0,
      `<div class="${ CLASSES.line }">`,
      `<code class="${ CLASSES.token } ${ PROJECT_CODE_SHORT }__string content-string1">string1</code>`,
      '</div>',

      `<div class="${ CLASSES.line }">`,
      `<code class="${ CLASSES.token } ${ PROJECT_CODE_SHORT }__string content-string2">string2</code>`,
      '</div>'
    );

    expect( renderer.html( true ) ).toBe( result.join( '' ) );
  } );

  test( 'should use `span` instead of `code` if required.', () => {
    const tokens :Token[][] = [
      [ [ 'string', 'string1' ] ],
      [ [ 'string', 'string2' ] ],
    ];

    const renderer  = new Renderer( tokens, info, null, { span: true } );
    const { event } = renderer;

    event.on( 'token', ( token, classes ) => {
      classes.push( `content-${ token[ 1 ] }` );
    } );

    result.splice( 4, 0,
      `<div class="${ CLASSES.line }">`,
      `<span class="${ CLASSES.token } ${ PROJECT_CODE_SHORT }__string content-string1">string1</span>`,
      '</div>',

      `<div class="${ CLASSES.line }">`,
      `<span class="${ CLASSES.token } ${ PROJECT_CODE_SHORT }__string content-string2">string2</span>`,
      '</div>'
    );

    expect( renderer.html( true ) ).toBe( result.join( '' ) );
  } );

  test( 'should add `--wrap` modifier to a body element if the `wrap` option is `true`.', () => {
    const renderer  = new Renderer( [], info, null, { wrap: true } );

    result[ 2 ] = `<div class="${ CLASSES.body } ${ CLASSES.body }--wrap">`;
    expect( renderer.html( true ) ).toBe( result.join( '' ) );
  } );
} );
