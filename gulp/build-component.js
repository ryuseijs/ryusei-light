const rollup     = require( 'rollup' );
const typescript = require( '@rollup/plugin-typescript' );
const terser     = require( 'rollup-plugin-terser' );
const babel      = require( '@rollup/plugin-babel' );
const fs         = require( 'fs' );
const path       = require( 'path' );
const minimist   = require( 'minimist' );


function buildLanguages( done ) {
  const dir      = './src/js/languages';
  const options  = minimist( process.argv.slice( 2 ) );
  const { lang } = options;

  // Build a single language file if specified through a command line.
  if ( lang ) {
    buildLanguage( dir, lang );
    done();
    return;
  }

  // Now builds all languages.
  fs.readdir( dir, { withFileTypes: true }, ( err, entries ) => {
    if ( err ) {
      throw err;
    }

    entries.forEach( entry => {
      if ( entry.isDirectory() ) {
        buildLanguage( dir, entry.name );
      }
    } );
  } );

  done();
}

function buildLanguage( dir, lang ) {
  const script = `
    import { ${ lang } } from './${ lang }'

    if ( typeof window !== 'undefined' && window[ 'RyuseiLight' ] ) {
      window[ 'RyuseiLight' ].register( ${ lang }() );
    }
  `;

  build( dir, lang, script );
}

function buildComponents( done ) {
  const dir      = './src/js/components';
  const options  = minimist( process.argv.slice( 2 ) );
  const { component } = options;

  // Build a single component file if specified through a command line.
  if ( component ) {
    buildComponent( dir, component );
    done();
    return;
  }

  fs.readdir( dir, { withFileTypes: true }, ( err, entries ) => {
    if ( err ) {
      throw err;
    }

    entries.forEach( entry => {
      if ( entry.isDirectory() ) {
        buildComponent( dir, entry.name );
      }
    } );
  } );

  done();
}

function buildComponent( dir, component ) {
  const script = `
    import { ${ component } } from './${ component }'

    if ( typeof window !== 'undefined' && window[ 'RyuseiLight' ] ) {
      window[ 'RyuseiLight' ].compose( { ${ component } } );
    }
  `;

  build( dir, component, script, true );
}

function build( dir, file, script, kebab = false ) {
  const temp      = path.join( dir, file, `_temp.ts` );
  const fragments = dir.split( '/' );
  const dirname   = fragments[ fragments.length - 1 ];

  fs.writeFile( temp, script, err => {
    if ( err ) {
      throw err;
    }

    rollup.rollup( {
      input  : temp,
      plugins: [
        typescript( { sourceMap: false, noImplicitUseStrict: true } ),
        babel.getBabelOutputPlugin( { configFile: path.resolve( __dirname, '../.babelrc' ) } ),
        terser.terser(),
      ]
    } ).then( bundle => {
      return bundle.write( {
        file     : path.join( `./dist/js/${ dirname }`, `${ kebab ? toKebab( file ) : file }.min.js` ),
        sourcemap: false,
      } );
    } ).then( () => {
      fs.unlink( temp, err => {
        if ( err ) {
          throw err;
        }
      } );
    } ).catch( e => console.error( e ) );
  } );
}

/**
 * Converts camel case to kebab case.
 *
 * @param string - A string to convert.
 *
 * @return A converted string.
 */
function toKebab( string ) {
  return string
    .replace( /([a-z0-9])([A-Z])/g, '$1 $2' )
    .replace( /[\s\-_]+/g, ' ' )
    .split( ' ' )
    .filter( Boolean )
    .map( word => word.toLowerCase() )
    .join( '-' );
}

exports.buildLanguages  = buildLanguages;
exports.buildComponents = buildComponents;
