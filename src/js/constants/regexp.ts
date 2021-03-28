export const REGEXP_FLOAT = /\d+\.?\d*|\d*\.?\d+/;

export const REGEXP_NUMBER = /[+-]?(\d+\.?\d*|\d*\.?\d+)([eE][+-]?\d+)?/;

export const REGEXP_BOOLEAN = /\b(?:true|false)\b/;

export const REGEXP_BRACKET = /[[\]{}()]/;

export const REGEXP_SPACE = /[ \t]+/;

export const REGEXP_QUOTE = /'(?:\\'|.)*?'/;

export const REGEXP_DOUBLE_QUOTE = /"(?:\\"|.)*?"/;

export const REGEXP_MULTILINE_COMMENT = /\/\*[\s\S]*?(\*\/|$)/;

export const REGEXP_SLASH_COMMENT = /\/\/.*/;

export const REGEXP_GENERAL_KEYWORDS = /\b(?:break|catch|class|continue|do|else|extends|finally|for|function|if|implements|in|instanceof|interface|new|null|return|throw|try|while)\b/;
