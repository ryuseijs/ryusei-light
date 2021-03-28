import {
  CATEGORY_ATRULE,
  CATEGORY_BRACKET,
  CATEGORY_DELIMITER, CATEGORY_FUNCTION, CATEGORY_LINEBREAK,
  CATEGORY_NUMBER,
  CATEGORY_PROPERTY,
  CATEGORY_SELECTOR,
  CATEGORY_TAG,
  CATEGORY_TEXT, CATEGORY_VARIABLE,
} from '../../../constants/categories';
import { LINE_BREAK } from '../../../constants/characters';


describe( 'scss', () => {
  test( 'can tokenize nested blocks.', () => {
    const scss = `
      body {
        .child {
          color: red;
        }
      }

      .container {
        padding: 1rem;

        .inner {
          color: red;
        }
      }
    `;

    expect( scss ).toBeTokenized( 'scss', [
      [ CATEGORY_TAG, 'body' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_SELECTOR, '.child' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_PROPERTY, 'color' ],
      [ CATEGORY_DELIMITER, ':' ],
      [ CATEGORY_TEXT, 'red' ],
      [ CATEGORY_DELIMITER, ';' ],
      [ CATEGORY_BRACKET, '}' ],
      [ CATEGORY_BRACKET, '}' ],

      [ CATEGORY_LINEBREAK, LINE_BREAK ],

      [ CATEGORY_SELECTOR, '.container' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_PROPERTY, 'padding' ],
      [ CATEGORY_DELIMITER, ':' ],
      [ CATEGORY_NUMBER, '1' ],
      [ CATEGORY_TEXT, 'rem' ],
      [ CATEGORY_DELIMITER, ';' ],

      [ CATEGORY_LINEBREAK, LINE_BREAK ],

      [ CATEGORY_SELECTOR, '.inner' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_PROPERTY, 'color' ],
      [ CATEGORY_DELIMITER, ':' ],
      [ CATEGORY_TEXT, 'red' ],
      [ CATEGORY_DELIMITER, ';' ],
      [ CATEGORY_BRACKET, '}' ],

      [ CATEGORY_BRACKET, '}' ],
    ] );
  } );

  test( 'can tokenize nested blocks with atrules.', () => {
    const scss = `
      @mixin inline-animation( #{ $duration } ) {
        $name: inline-#{ unique-id() };

        @keyframes #{ $name } {
          @content;
        }

        animation-name: $name;
        animation-duration: $duration;
        animation-iteration-count: infinite;
      }
    `;

    expect( scss ).toBeTokenized( 'scss', [
      [ CATEGORY_ATRULE, '@mixin' ],
      [ CATEGORY_ATRULE, 'inline-animation' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_DELIMITER, '#{' ],
      [ CATEGORY_VARIABLE, '$duration' ],
      [ CATEGORY_DELIMITER, '}' ],
      [ CATEGORY_BRACKET, ')' ],
      [ CATEGORY_BRACKET, '{' ],

      [ CATEGORY_VARIABLE, '$name' ],
      [ CATEGORY_DELIMITER, ':' ],
      [ CATEGORY_TEXT, 'inline-' ],
      [ CATEGORY_DELIMITER, '#{' ],
      [ CATEGORY_FUNCTION, 'unique-id' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_BRACKET, ')' ],
      [ CATEGORY_DELIMITER, '}' ],
      [ CATEGORY_DELIMITER, ';' ],

      [ CATEGORY_LINEBREAK, LINE_BREAK ],

      [ CATEGORY_ATRULE, '@keyframes' ],
      [ CATEGORY_DELIMITER, '#{' ],
      [ CATEGORY_VARIABLE, '$name' ],
      [ CATEGORY_DELIMITER, '}' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_ATRULE, '@content' ],
      [ CATEGORY_DELIMITER, ';' ],
      [ CATEGORY_BRACKET, '}' ],

      [ CATEGORY_LINEBREAK, LINE_BREAK ],

      [ CATEGORY_PROPERTY, 'animation-name' ],
      [ CATEGORY_DELIMITER, ':' ],
      [ CATEGORY_VARIABLE, '$name' ],
      [ CATEGORY_DELIMITER, ';' ],
      [ CATEGORY_PROPERTY, 'animation-duration' ],
      [ CATEGORY_DELIMITER, ':' ],
      [ CATEGORY_VARIABLE, '$duration' ],
      [ CATEGORY_DELIMITER, ';' ],
      [ CATEGORY_PROPERTY, 'animation-iteration-count' ],
      [ CATEGORY_DELIMITER, ':' ],
      [ CATEGORY_TEXT, 'infinite' ],
      [ CATEGORY_DELIMITER, ';' ],

      [ CATEGORY_BRACKET, '}' ],
    ] );
  } );
} );
