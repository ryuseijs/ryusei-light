import {
  CATEGORY_ATTRIBUTE,
  CATEGORY_BRACKET,
  CATEGORY_CDATA,
  CATEGORY_COMMENT,
  CATEGORY_DELIMITER,
  CATEGORY_ENTITY,
  CATEGORY_PROLOG,
  CATEGORY_SPACE,
  CATEGORY_TAG,
  CATEGORY_TAG_CLOSE,
  CATEGORY_VALUE,
} from '../../constants/categories';
import { REGEXP_SPACE } from '../../constants/regexp';
import { Language, Tokenizer } from '../../types';
import { css } from '../css/css';
import { javascript } from '../javascript/javascript';


/**
 * The HTML language options.
 *
 * @since 0.0.12
 */
export interface HtmlOptions {
  /**
   * The language for tokenizing script blocks.
   */
  script?: () => Language;

  /**
   * The language for tokenizing style blocks.
   */
  style?: () => Language;
}

/**
 * Returns the HTML language definition.
 *
 * @param options - Optional. Options.
 *
 * @return A Language object.
 */
export function html( options: HtmlOptions = {} ): Language {
  const script = ( options.script || javascript )();
  const style  = ( options.style || css )();
  const cdata  = [ CATEGORY_CDATA, /<!\[CDATA\[.*]]>/is ] as Tokenizer;

  // Embedded scripts or styles may contain CDATA sections.
  script.grammar.main.unshift( cdata );
  style.grammar.main.unshift( cdata );

  return {
    id   : 'html',
    alias: [ 'markup' ],
    name : 'HTML',
    use  : { script, style },

    grammar: {
      main: [
        [ CATEGORY_COMMENT, /<!--.*?-->/s ],
        [ CATEGORY_PROLOG, /<!DOCTYPE.*?>/is ],
        cdata,
        [ '#script', /<script.*?>.*?<\/script>/s ],
        [ '#style', /<style.*?>.*?<\/style>/s ],
        [ '#tag', /<.*?>/s ],
        [ CATEGORY_ENTITY, /&[\da-z]+;|&#\d+;/i ],
        [ CATEGORY_SPACE, REGEXP_SPACE ],
      ],

      script: [
        [ '#tag', /^<script.*?>/s ],
        cdata,
        [ '@script', /.+(?=<\/script>)/s ],
        [ '#tag', /<\/script>/ ],
      ],

      style: [
        [ '#tag', /^<style.*?>/s ],
        [ '@style', /.+(?=<\/style>)/s ],
        [ '#tag', /<\/style>/ ],
      ],

      tag: [
        [ '#closeTag', /<\/.+>/ ],
        [ '#tagContent' ],
      ],

      closeTag: [
        [ CATEGORY_TAG_CLOSE, /[^\s/<>"'=]+/ ],
        [ '#tagContent' ],
      ],

      tagContent: [
        [ '#attr', /[ \t\r\n]+.+(?=[ \t\r\n/>])/s ],
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
