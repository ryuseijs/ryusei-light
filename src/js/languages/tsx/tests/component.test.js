import {
  CATEGORY_ATTRIBUTE, CATEGORY_BRACKET, CATEGORY_CLASS, CATEGORY_DELIMITER, CATEGORY_FUNCTION, CATEGORY_IDENTIFIER,
  CATEGORY_KEYWORD, CATEGORY_OPERATOR, CATEGORY_STRING, CATEGORY_TAG,
} from '../../../constants/categories';


describe( 'tsx', () => {
  test( 'can tokenize a function component with typings.', () => {
    const tsx = `
      type Props = {
        message: string;
      }

      const Message: React.FC<Props> = props => {
        return <span style={ { margin: '1rem' } }>{ props.message }</span>
      }
    `;

    expect( tsx ).toBeTokenized( 'tsx', [
      [ CATEGORY_KEYWORD, 'type' ],
      [ CATEGORY_CLASS, 'Props' ],
      [ CATEGORY_OPERATOR, '=' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_IDENTIFIER, 'message' ],
      [ CATEGORY_OPERATOR, ':' ],
      [ CATEGORY_KEYWORD, 'string' ],
      [ CATEGORY_DELIMITER, ';' ],
      [ CATEGORY_BRACKET, '}' ],

      [ CATEGORY_KEYWORD, 'const' ],
      [ CATEGORY_CLASS, 'Message' ],
      [ CATEGORY_OPERATOR, ':' ],
      [ CATEGORY_CLASS, 'React' ],
      [ CATEGORY_DELIMITER, '.' ],
      [ CATEGORY_CLASS, 'FC' ],
      [ CATEGORY_OPERATOR, '<' ],
      [ CATEGORY_CLASS, 'Props' ],
      [ CATEGORY_OPERATOR, '>' ],
      [ CATEGORY_OPERATOR, '=' ],
      [ CATEGORY_IDENTIFIER, 'props' ],
      [ CATEGORY_OPERATOR, '=>' ],
      [ CATEGORY_BRACKET, '{' ],

      [ CATEGORY_KEYWORD, 'return' ],
      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_TAG, 'span' ],
      [ CATEGORY_ATTRIBUTE, 'style' ],
      [ CATEGORY_DELIMITER, '=' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_IDENTIFIER, 'margin' ],
      [ CATEGORY_OPERATOR, ':' ],
      [ CATEGORY_STRING, "'1rem'" ],
      [ CATEGORY_BRACKET, '}' ],
      [ CATEGORY_BRACKET, '}' ],
      [ CATEGORY_BRACKET, '>' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_IDENTIFIER, 'props' ],
      [ CATEGORY_DELIMITER, '.' ],
      [ CATEGORY_IDENTIFIER, 'message' ],
      [ CATEGORY_BRACKET, '}' ],
      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_DELIMITER, '/' ],
      [ CATEGORY_TAG, 'span' ],
      [ CATEGORY_BRACKET, '>' ],

      [ CATEGORY_BRACKET, '}' ],
    ] );
  } );

  test( 'can tokenize a class component with typings.', () => {
    const tsx = `
      class Component extends React.Component<{ message: string }, {}> {
        protected readonly items: Array<[string, string]> = [];

        render() {
          return <span>{ this.props.message }</span>
        }
      }
    `;

    expect( tsx ).toBeTokenized( 'tsx', [
      [ CATEGORY_KEYWORD, 'class' ],
      [ CATEGORY_CLASS, 'Component' ],
      [ CATEGORY_KEYWORD, 'extends' ],
      [ CATEGORY_CLASS, 'React' ],
      [ CATEGORY_DELIMITER, '.' ],
      [ CATEGORY_CLASS, 'Component' ],
      [ CATEGORY_OPERATOR, '<' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_IDENTIFIER, 'message' ],
      [ CATEGORY_OPERATOR, ':' ],
      [ CATEGORY_KEYWORD, 'string' ],
      [ CATEGORY_BRACKET, '}' ],
      [ CATEGORY_DELIMITER, ',' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_BRACKET, '}' ],
      [ CATEGORY_OPERATOR, '>' ],
      [ CATEGORY_BRACKET, '{' ],

      [ CATEGORY_KEYWORD, 'protected' ],
      [ CATEGORY_KEYWORD, 'readonly' ],
      [ CATEGORY_IDENTIFIER, 'items' ],
      [ CATEGORY_OPERATOR, ':' ],
      [ CATEGORY_CLASS, 'Array' ],
      [ CATEGORY_OPERATOR, '<' ],
      [ CATEGORY_BRACKET, '[' ],
      [ CATEGORY_KEYWORD, 'string' ],
      [ CATEGORY_DELIMITER, ',' ],
      [ CATEGORY_KEYWORD, 'string' ],
      [ CATEGORY_BRACKET, ']' ],
      [ CATEGORY_OPERATOR, '>' ],
      [ CATEGORY_OPERATOR, '=' ],
      [ CATEGORY_BRACKET, '[' ],
      [ CATEGORY_BRACKET, ']' ],
      [ CATEGORY_DELIMITER, ';' ],

      [ CATEGORY_FUNCTION, 'render' ],
      [ CATEGORY_BRACKET, '(' ],
      [ CATEGORY_BRACKET, ')' ],
      [ CATEGORY_BRACKET, '{' ],

      [ CATEGORY_KEYWORD, 'return' ],
      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_TAG, 'span' ],
      [ CATEGORY_BRACKET, '>' ],
      [ CATEGORY_BRACKET, '{' ],
      [ CATEGORY_KEYWORD, 'this' ],
      [ CATEGORY_DELIMITER, '.' ],
      [ CATEGORY_IDENTIFIER, 'props' ],
      [ CATEGORY_DELIMITER, '.' ],
      [ CATEGORY_IDENTIFIER, 'message' ],
      [ CATEGORY_BRACKET, '}' ],
      [ CATEGORY_BRACKET, '<' ],
      [ CATEGORY_DELIMITER, '/' ],
      [ CATEGORY_TAG, 'span' ],
      [ CATEGORY_BRACKET, '>' ],

      [ CATEGORY_BRACKET, '}' ], // render
      [ CATEGORY_BRACKET, '}' ], // Component
    ] );
  } );
} );
