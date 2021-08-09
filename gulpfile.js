const { parallel } = require( 'gulp' );
const buildScript = require( './gulp/build-script' );
const buildCss    = require( './gulp/build-css' );
const { buildLanguages, buildExtensions } = require( './gulp/build-extension' );


exports[ 'build:js' ]         = buildScript;
exports[ 'build:languages' ]  = buildLanguages;
exports[ 'build:extensions' ] = buildExtensions;
exports[ 'build:css' ]        = buildCss;
exports[ 'build:all' ]        = parallel( buildScript, buildLanguages, buildExtensions, buildCss );
