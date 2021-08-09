const { src, dest, parallel } = require( 'gulp' );
const rollup     = require( 'rollup' );
const typescript = require( 'rollup-plugin-typescript2' );
const rename     = require( 'ts-transformer-properties-rename' ).default;
const babel      = require( '@rollup/plugin-babel' );
const terser     = require( 'rollup-plugin-terser' ).terser;
const path       = require( 'path' );
const gzip       = require( 'gulp-gzip' );
const info       = require( '../package' );


const banner = `/*!
 * RyuseiLight.js
 * Version  : ${ info.version }
 * License  : ${ info.license }
 * Copyright: 2020 ${ info.author }
 */`;

function buildScript( type ) {
  const file = type === 'default' ? `./dist/js/ryuseilight.min.js` : `./dist/js/ryuseilight-${ type }.min.js`;

  return rollup.rollup( {
    input  : `./src/js/build/${ type }.ts`,
    plugins: [
      typescript( {
        transformers: [
          service => ( {
            before: [
              rename( service.getProgram(), { internalPrefix: '' } ),
            ],
            after : [],
          } ),
        ],
      } ),
      babel.getBabelOutputPlugin( {
        configFile: path.resolve( __dirname, '../.babelrc' ),
        allowAllFormats: true,
      } ),
      terser( {
        mangle: {
          properties: {
            regex: /^_(private)_/,
          },
        }
      } ),
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
      return src( file )
        .pipe( gzip() )
        .pipe( dest( './dist/js/' ) );
    }
  } );
}

function buildModule( format, declaration ) {
  const options = declaration ? {
    check: false,
    useTsconfigDeclarationDir: true,
    tsconfigOverride: {
      compilerOptions: {
        declarationDir: 'dist/types',
        declaration   : true,
        declarationMap: true,
      },
    },
  } : {};

  return rollup.rollup( {
    input  : './src/js/index.ts',
    plugins: [
      typescript( options ),
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

module.exports = parallel(
  function jsDefault() { return buildScript( 'default' ) },
  function jsExtensions() { return buildScript( 'extensions' ) },
  function jsComplete() { return buildScript( 'complete' ) },
  function moduleCjs() { return buildModule( 'cjs' ) },
  function moduleEsm() { return buildModule( 'esm', true ) },
);
