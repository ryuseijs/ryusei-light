import {
  CATEGORY_ATTRIBUTE, CATEGORY_BRACKET, CATEGORY_COMMENT, CATEGORY_ENTITY, CATEGORY_PROLOG, CATEGORY_SPACE,
  CATEGORY_SYMBOL, CATEGORY_TAG, CATEGORY_VALUE,
} from '../../constants/categories';
import { REGEXP_SPACE } from '../../constants/regexp';
import { Language } from '../../types';
import { css } from '../css/css';
import { javascript } from '../javascript/javascript';


/**
 * Returns the HTML language definition.
 *
 * @return A Language object.
 */
export function html(): Language {
  return {
    id   : 'html',
    alias: [ 'markup' ],
    name : 'HTML',

    use: {
      javascript: javascript(),
      css       : css(),
    },

    grammar: {
      main: [
        [ CATEGORY_COMMENT, /<!--.*?-->/s ],
        [ CATEGORY_PROLOG, /<!DOCTYPE.*?>/ ],
        [ CATEGORY_PROLOG, /<!\[CDATA\[.*]]>/s ],
        [ '#script', /<script.*?>.*?<\/script>/s ],
        [ '#style', /<style.*?>.*?<\/style>/s ],
        [ '#tag', /<.*?>/s ],
        [ CATEGORY_ENTITY, /&[\da-z]+;|&#\d+;/i ],
      ],

      script: [
        [ '#tag', /^<script.*?>/s ],
        [ '@javascript', /.+(?=<\/script>)/s ],
        [ '#tag', /<\/script>/ ],
      ],

      style: [
        [ '#tag', /^<style.*?>/s ],
        [ '@css', /.+(?=<\/style>)/s ],
        [ '#tag', /<\/style>/ ],
      ],

      tag: [
        [ '#attr', /\s+.+(?=[\s/>])/s ],
        [ CATEGORY_TAG, /[^\s/<>"'=]+/ ],
        [ CATEGORY_BRACKET, /[<>]/ ],
        [ CATEGORY_SYMBOL, /[/]/ ],
      ],

      attr: [
        [ CATEGORY_SPACE, REGEXP_SPACE ],
        [ CATEGORY_VALUE, /(['"])(\\\1|.)*?\1/ ],
        [ CATEGORY_SYMBOL, /[/=]/ ],
        [ CATEGORY_ATTRIBUTE, /[^\s/>"'=]+/ ],
      ],
    },
  };
}
