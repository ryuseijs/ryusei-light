const { parallel } = require( 'gulp' );
const buildScript = require( './gulp/build-script' );
const buildCss    = require( './gulp/build-css' );
const { buildLanguages, buildComponents } = require( './gulp/build-component' );


exports[ 'build:js' ]         = buildScript;
exports[ 'build:languages' ]  = buildLanguages;
exports[ 'build:components' ] = buildComponents;
exports[ 'build:css' ]        = buildCss;
exports[ 'build:all' ]        = parallel( buildScript, buildLanguages, buildComponents, buildCss );
