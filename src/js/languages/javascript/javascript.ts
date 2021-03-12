import { REGEXP_MULTILINE_COMMENT, REGEXP_SLASH_COMMENT } from '../../constants/regexp';
import { Language } from '../../types';
import { common } from '../common/common';
import {
  CATEGORY_BRACKET, CATEGORY_COMMENT, CATEGORY_DECORATOR,
  CATEGORY_KEYWORD, CATEGORY_STRING,
} from '../../constants/categories';
import { assign, before } from '../../utils';


/**
 * Returns the JavaScript language definition.
 *
 * @return A Language object.
 */
export function javascript(): Language {
  const language = assign( common(), {
    id   : 'javascript',
    name : 'JavaScript',
    alias: [ 'js' ],
  } );

  const { grammar } = language;
  const { main }    = grammar;

  before( main, CATEGORY_KEYWORD, [
    [ CATEGORY_KEYWORD, /\b(?:as|async|await|case|catch|const|debugger|default|delete|enum|export|from|import|let|package|private|protected|public|super|switch|static|this|typeof|undefined|var|void|with|yield)\b/ ],
    [ CATEGORY_KEYWORD, /\b((get|set)(?= *\S+\(\)))/ ], // todo
    [ '#backtick', /`/, '@rest' ],
    [ CATEGORY_DECORATOR, /@[^\s(@]+/ ],
  ]
  );

  assign( grammar, {
    backtick: [
      [ CATEGORY_STRING, /^`/ ],
      [ CATEGORY_STRING, /(\$[^{]|\\[$`]|[^`$])+/ ],
      [ '#expression', /\${/, '@rest' ],
      [ CATEGORY_STRING, /`/, '@break' ],
    ],

    expression: [
      [ CATEGORY_BRACKET, /^\${/ ],
      [ CATEGORY_BRACKET, /}/, '@break' ],
      [ '#main' ],
    ],
  } );

  return language;
}
