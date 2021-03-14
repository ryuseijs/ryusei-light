import {
  CATEGORY_ATTRIBUTE,
  CATEGORY_BRACKET,
  CATEGORY_CDATA,
  CATEGORY_COMMENT,
  CATEGORY_ENTITY,
  CATEGORY_PROLOG,
  CATEGORY_SPACE,
  CATEGORY_DELIMITER,
  CATEGORY_TAG,
  CATEGORY_VALUE,
} from '../../constants/categories';
import { REGEXP_SPACE } from '../../constants/regexp';
import { Language, Tokenizer } from '../../types';
import { css } from '../css/css';
import { javascript } from '../javascript/javascript';


/**
 * Returns the HTML language definition.
 *
 * @return A Language object.
 */
export function html(): Language {
  const langJs  = javascript();
  const langCss = css();
  const cdata   = [ CATEGORY_CDATA, /<!\[CDATA\[.*]]>/is ] as Tokenizer;

  // Embedded scripts or styles may contain CDATA sections.
  langJs.grammar.main.unshift( cdata );
  langCss.grammar.main.unshift( cdata );

  return {
    id   : 'html',
    alias: [ 'markup' ],
    name : 'HTML',

    use: {
      javascript: langJs,
      css       : langCss,
    },

    grammar: {
      main: [
        [ CATEGORY_COMMENT, /<!--.*?-->/s ],
        [ CATEGORY_PROLOG, /<!DOCTYPE.*?>/ ],
        cdata,
        [ '#script', /<script.*?>.*?<\/script>/s ],
        [ '#style', /<style.*?>.*?<\/style>/s ],
        [ '#tag', /<.*?>/s ],
        [ CATEGORY_ENTITY, /&[\da-z]+;|&#\d+;/i ],
      ],

      cdata: [
        [ CATEGORY_CDATA, /<!\[CDATA\[.*]]>/is ],
      ],

      script: [
        [ '#tag', /^<script.*?>/s ],
        [ '#cdata' ],
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
        [ CATEGORY_DELIMITER, /[/]/ ],
      ],

      attr: [
        [ CATEGORY_SPACE, REGEXP_SPACE ],
        [ CATEGORY_VALUE, /(['"])(\\\1|.)*?\1/ ],
        [ CATEGORY_DELIMITER, /[/=]/ ],
        [ CATEGORY_ATTRIBUTE, /[^\s/>"'=]+/ ],
      ],
    },
  };
}
