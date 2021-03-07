const gulp         = require( 'gulp' );
const rollup       = require( 'rollup' );
const typescript   = require( '@rollup/plugin-typescript' );
const terser       = require( 'rollup-plugin-terser' );
const babel        = require( '@rollup/plugin-babel' );
const rename       = require( 'gulp-rename' );
const sass         = require( 'gulp-dart-sass' );
const cssnano      = require( 'cssnano' );
const postcss      = require( 'gulp-postcss' );
const autoprefixer = require( 'autoprefixer' );
const fs           = require( 'fs' );
const path         = require( 'path' );
const gzip         = require( 'gulp-gzip' );
const package      = require( './package' );


const banner = `/*!
 * RyuseiLight.js
 * Version  : ${ package.version }
 * License  : ${ package.license }
 * Copyright: 2020 ${ package.author }
 */`;

// Builds the script files.
gulp.task( 'build:js', () => {
  return Promise.all( [
    buildScript( 'default' ),
    buildScript( 'components' ),
    buildScript( 'complete' ),
    buildModule( 'esm' ),
    buildModule( 'cjs' ),
  ] );
} );

function buildScript( type ) {
  const file = type === 'default' ? `./dist/js/ryuseilight.min.js` : `./dist/js/ryuseilight-${ type }.min.js`;

  rollup.rollup( {
    input  : `./src/js/build/${ type }.ts`,
    plugins: [
      typescript(),
      babel.getBabelOutputPlugin( {
        configFile: path.resolve( __dirname, '.babelrc' ),
        allowAllFormats: true,
      } ),
      terser.terser(),
    ]
  } ).then( bundle => {
    return bundle.write( {
      file,
      banner,
      name     : 'RyuseiLight',
      format   : 'umd',
      sourcemap: true,
    } );
  } ).then( () => {
    if ( type === 'default' ) {
      return gulp.src( file )
        .pipe( gzip() )
        .pipe( gulp.dest( './dist/js/' ) );
    }
  } );
}

function buildModule( format = 'esm' ) {
  rollup.rollup( {
    input  : './src/js/index.ts',
    plugins: [
      typescript(),
      babel.getBabelOutputPlugin( {
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false,
              loose  : true,
            }
          ]
        ]
      } ),
    ]
  } ).then( bundle => {
    return bundle.write( {
      banner,
      file  : `./dist/js/ryuseilight.${ format }.js`,
      format,
      exports: 'named',
    } );
  } );
}

// Builds css files.
gulp.task( 'build:css', async () => {
  gulp.src( [
    './src/css/**/index.scss',
    '!./src/css/**/foundation/index.scss',
    '!./src/css/**/object/index.scss',
    '!./src/css/**/template/**/*.scss'
  ], { base: 'src' } )
    .pipe( sass() )
    .pipe( postcss( [
      cssnano( { reduceIdents: false } ),
      autoprefixer(),
    ] ) )
    .pipe( rename( path => {
      const fragments = path.dirname.split( '\\' );
      const dirname   = fragments.includes( 'themes' ) ? fragments.slice( 0, -1 ).join( '\\' ) : path.dirname;

      return {
        dirname,
        basename: `ryuseilight-${ fragments[ fragments.length - 1 ] }.min`,
        extname : '.css',
      };
    } ) )
    .pipe( gulp.dest( 'dist' ) );
} );

// Builds language files.
gulp.task( 'build:languages', done => {
  const dir = './src/js/languages';

  fs.readdir( dir, { withFileTypes: true }, ( err, entries ) => {
    if ( err ) {
      throw err;
    }

    entries.forEach( entry => {
      if ( ! entry.isDirectory() ) {
        return;
      }

      const lang   = entry.name;
      const script = `
        import { ${ lang } } from './${ lang }'

        if ( window && window[ 'RyuseiLight' ] ) {
          window[ 'RyuseiLight' ].register( ${ lang }() );
        }
      `;

      buildComponent( dir, lang, script );
    } );
  } );

  done();
} );

// Builds component files.
gulp.task( 'build:components', done => {
  const dir = './src/js/components';

  fs.readdir( dir, { withFileTypes: true }, ( err, entries ) => {
    if ( err ) {
      throw err;
    }

    entries.forEach( entry => {
      if ( entry.isDirectory() ) {
        const component = entry.name;
        const script = `
          import { ${ component } } from './${ component }'

          if ( window && window[ 'RyuseiLight' ] ) {
            window[ 'RyuseiLight' ].compose( { ${ component } } );
          }
        `;

        buildComponent( dir, component, script, true );
      }
    } );
  } );

  done();
} );

/**
 * Build each component/language file.
 *
 * @param dir    - A directory.
 * @param file   - A file name.
 * @param script - A script snippet.
 * @param kebab  - Whether to convert the file name to kebab case or not.
 */
function buildComponent( dir, file, script, kebab = false ) {
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
        babel.getBabelOutputPlugin( { configFile: path.resolve( __dirname, '.babelrc' ) } ),
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
