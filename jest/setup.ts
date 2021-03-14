import { toBeTokenized } from './matchers';
import * as languages from '../src/js/languages';
import RyuseiLight from '../src/js';

// Register all available languages.
RyuseiLight.register( Object.values( languages ).map( language => language() ) );

// Register custom matchers.
expect.extend( { toBeTokenized } );
