/*!
 * RyuseiLight.js
 * Version  : 0.0.8
 * License  : MIT
 * Copyright: 2020 Naotoshi Fujita
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
/**
 * The line break character.
 *
 * @private
 * @since 0.0.1
 */

var LINE_BREAK = '\n';
var CATEGORY_KEYWORD = 'keyword';
var CATEGORY_COMMENT = 'comment';
var CATEGORY_TAG = 'tag';
var CATEGORY_SELECTOR = 'selector';
var CATEGORY_ATTRIBUTE = 'attr';
var CATEGORY_PROPERTY = 'prop';
var CATEGORY_VALUE = 'value';
var CATEGORY_VARIABLE = 'variable';
var CATEGORY_ENTITY = 'entity';
var CATEGORY_PROLOG = 'prolog';
var CATEGORY_IDENTIFIER = 'identifier';
var CATEGORY_STRING = 'string';
var CATEGORY_NUMBER = 'number';
var CATEGORY_BOOLEAN = 'boolean';
var CATEGORY_FUNCTION = 'function';
var CATEGORY_CLASS = 'class';
var CATEGORY_DECORATOR = 'decorator';
var CATEGORY_REGEXP = 'regexp';
var CATEGORY_OPERATOR = 'operator';
var CATEGORY_BRACKET = 'bracket';
var CATEGORY_SYMBOL = 'symbol';
var CATEGORY_SPACE = 'space';
var CATEGORY_TEXT = 'text';
/**
 * Checks if the given subject is an object or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is an object, or otherwise `false`.
 */

function isObject(subject) {
  return subject !== null && typeof subject === 'object';
}
/**
 * Checks if the given subject is an array or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is an array, or otherwise `false`.
 */


function isArray(subject) {
  return Array.isArray(subject);
}
/**
 * Checks if the given subject is a string or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is a string, or otherwise `false`.
 */


function isString(subject) {
  return typeof subject === 'string';
}
/**
 * Checks if the given subject is `undefined` or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is `undefined`, or otherwise `false`.
 */


function isUndefined(subject) {
  return typeof subject === 'undefined';
}
/**
 * Checks if the given subject is an HTMLElement instance or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is an HTMLElement instance, or otherwise `false`.
 */


function isHTMLElement(subject) {
  return subject instanceof HTMLElement;
}
/**
 * Push the provided value to an array only if the value is not an array.
 *
 * @param value - A value to push.
 *
 * @return An array containing the value, or the value itself if it is already an array.
 */


function toArray(value) {
  return isArray(value) ? value : [value];
}
/**
 * Adds classes to the element.
 *
 * @param elm     - An element to add classes to.
 * @param classes - Classes to add.
 */


function addClass(elm, classes) {
  toArray(classes).forEach(function (name) {
    if (name) {
      elm.classList.add(name);
    }
  });
}
/**
 * Appends children to the parent element.
 *
 * @param parent   - A parent element.
 * @param children - A child or children to append to the parent.
 */


function append(parent, children) {
  children = toArray(children);

  for (var i = 0; i < children.length; i++) {
    parent.appendChild(children[i]);
  }
}
/**
 * Iterates over the provided object by own enumerable keys with calling the iteratee function.
 *
 * @param object   - An object to iterate over.
 * @param iteratee - An iteratee function that takes the value and key as arguments.
 *
 * @return A provided object itself.
 */


function forOwn(object, iteratee) {
  var keys = Object.keys(object);

  for (var i = 0; i < keys.length; i++) {
    iteratee(object[keys[i]], keys[i]);
  }
}
/**
 * Assigns all own enumerable properties of all source objects to the provided object.
 * `undefined` in source objects will be skipped.
 *
 * @param object  - An object to assign properties to.
 * @param sources - Objects to assign properties from.
 *
 * @return An object assigned properties of the sources to.
 */


function assign(object) {
  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  sources.forEach(function (source) {
    forOwn(source, function (value, key) {
      if (!isUndefined(source[key])) {
        object[key] = source[key];
      }
    });
  });
  return object;
}
/**
 * Sets new attributes to the passed element if the `attrs` is an object literal,
 * or gets an attribute value from it if the `attrs` is a string.
 *
 * @param elm   - An element to set or get an attribute.
 * @param attrs - An attribute name as a string or new attributes as an object literal.
 */


function attr(elm, attrs) {
  if (isString(attrs)) {
    return elm.getAttribute(attrs) || '';
  }

  if (isObject(attrs)) {
    forOwn(attrs, function (value, key) {
      elm.setAttribute(key, String(value));
    });
  }
}
/**
 * Creates an HTML element.
 *
 * @param tag     - A tag name.
 * @param classes - Optional. Classes to add.
 * @param parent  - Optional. A parent element where the created element is appended.
 */


function create(tag, classes, parent) {
  var elm = document.createElement(tag);

  if (classes) {
    addClass(elm, classes);
  }

  if (parent) {
    append(parent, elm);
  }

  return elm;
}
/**
 * Returns an element that matches the provided selector.
 *
 * @param selector - A selector.
 * @param parent   - Optional. A parent element to start searching elements from.
 *
 * @return A found element or `null`.
 */


function query(selector, parent) {
  if (parent === void 0) {
    parent = document;
  }

  return parent.querySelector(selector);
}
/**
 * Applies inline styles to the provided element by an object literal.
 *
 * @param elm    - An element to apply styles to.
 * @param styles - An object literal with styles.
 */


function styles(elm, styles) {
  forOwn(styles, function (value, key) {
    elm.style[key] = String(value);
  });
}
/**
 * Sets or gets a text content of the provided node.
 *
 * @param node - A node to get or set a text.
 * @param text - Optional. A text to set.
 */


function text(node, text) {
  if (isUndefined(text)) {
    return node.textContent;
  }

  node.textContent = text;
}
/**
 * Throws an error if the provided condition is falsy.
 *
 * @param condition - If falsy, an error is thrown.
 * @param message   - Optional. A message for the error.
 */


function assert(condition, message) {
  if (message === void 0) {
    message = '';
  }

  if (!condition) {
    throw new Error(message);
  }
}
/**
 * The project code name.
 *
 * @since 0.0.1
 */


var PROJECT_CODE = 'ryuseilight';
/**
 * The abbreviated project code.
 *
 * @since 0.0.1
 */

var PROJECT_CODE_SHORT = 'rl';
/**
 * Displays an error message on the console.
 *
 * @param message - An error message.
 */

function error(message) {
  console.error("[" + PROJECT_CODE + "] " + message);
}
/**
 * Returns a function that invokes the provided function at most once in the specified duration.
 *
 * @since 0.0.1
 *
 * @param callback - A function to throttle.
 * @param interval - A throttle duration in milliseconds.
 *
 * @return A throttled function.
 */


function throttle(callback, interval) {
  var timer;
  return function () {
    if (!timer) {
      timer = setTimeout(function () {
        callback();
        timer = null;
      }, interval);
    }
  };
}
/**
 * Finds the provided key from a map and returns its index.
 *
 * @param map - A map to search in.
 * @param key - A key to search for.
 *
 * @return An index if found, or `-1` otherwise.
 */


function find(map, key) {
  for (var i = 0; i < map.length; i++) {
    if (map[i][0] === key) {
      return i;
    }
  }

  return -1;
}
/**
 * Insert entries before the reference entry specified by the `ref`.
 * If the reference is not found, a new entry is created.
 *
 * @param map     - A map to insert values to.
 * @param ref     - A reference key.
 * @param entries - entries to insert.
 */


function before(map, ref, entries) {
  var index = find(map, ref);

  if (index > -1) {
    map.splice.apply(map, [index, 0].concat(entries));
  } else {
    map.push.apply(map, entries);
  }
}
/**
 * Returns flags of the provided regexp object.
 * IE doesn't support RegExp#flags.
 *
 * @param regexp - A RegExp object.
 *
 * @return Flags as a string.
 */


function getFlags(regexp) {
  return regexp.toString().match(/[gimsy]*$/)[0];
}
/**
 * Converts essential HTML special characters to HTML entities.
 *
 * @param string - A string to escape.
 *
 * @return An escaped string.
 */


function escapeHtml(string) {
  return string.replace(/&/g, '&amp;').replace(/</g, '&lt;');
}
/**
 * Checks if the string starts with the `char` or not.
 *
 * @param string - A string to check.
 * @param char   - A character.
 *
 * @return `true` if the string starts with the `char`, or otherwise `false`.
 */


function startsWith(string, _char) {
  return string.charAt(0) === _char;
}
/**
 * Checks if the RegExp supports the sticky flag or not.
 */


var isStickySupported = !isUndefined(/x/.sticky);
/**
 * The class for creating a simple lexer by a Language object.
 *
 * @since 0.0.1
 */

var Lexer = /*#__PURE__*/function () {
  /**
   * The Lexer constructor.
   *
   * @param language - A Language object.
   */
  function Lexer(language) {
    this.language = language;
    this.init(language);
  }
  /**
   * Initializes the language object.
   *
   * @param language - A Language object to initialize.
   */


  var _proto = Lexer.prototype;

  _proto.init = function init(language) {
    var _this = this;

    forOwn(language.grammar, function (tokenizers, key) {
      language.grammar[key] = _this.merge(language, tokenizers);
    });
    language.use = language.use || {};
    forOwn(language.use, this.init.bind(this));
  }
  /**
   * Includes tokenizers required by `#` annotation and flatten them.
   *
   * @param language   - A language object.
   * @param tokenizers - Tokenizers.
   *
   * @return Merged tokenizers.
   */
  ;

  _proto.merge = function merge(language, tokenizers) {
    var _this2 = this;

    return tokenizers.reduce(function (merged, tokenizer) {
      var category = tokenizer[0],
          regexp = tokenizer[1];

      if (startsWith(category, '#') && !regexp) {
        var include = language.grammar[category.slice(1)];
        assert(include);
        merged.push.apply(merged, _this2.merge(language, include));
      } else {
        var flags = getFlags(regexp).replace(/[gy]/g, '');

        if (isStickySupported) {
          tokenizer[1] = new RegExp(regexp.source, 'y' + flags);
        } else {
          tokenizer[1] = new RegExp(regexp.source + '|()', 'g' + flags);
        }

        merged.push(tokenizer);
      }

      return merged;
    }, []);
  }
  /**
   * Tokenizes the text by the provided language and tokenizers.
   *
   * @param text       - A text to tokenize.
   * @param language   - A Grammar object.
   * @param tokenizers - An array with tokenizers.
   *
   * @return An index of the text where the handling ends.
   */
  ;

  _proto.tokenizeBy = function tokenizeBy(text, language, tokenizers) {
    var index = 0;
    var position = 0;

    main: while (index < text.length) {
      for (var i = 0; i < tokenizers.length; i++) {
        var tokenizer = tokenizers[i];
        var regexp = tokenizer[1];
        var command = tokenizer[2];
        regexp.lastIndex = index;
        var match = regexp.exec(text);

        if (!match || !match[0]) {
          continue;
        }

        if (position < index) {
          this.push([CATEGORY_TEXT, text.slice(position, index)]);
        }

        if (command === '@back') {
          position = index;
          break main;
        }

        var offset = this.handle(match, language, tokenizers[i]);
        index += offset || 1;
        position = index;

        if (command === '@break') {
          break main;
        }

        continue main;
      }

      index++;
    }

    if (position < index) {
      this.push([CATEGORY_TEXT, text.slice(position)]);
    }

    return index;
  }
  /**
   * Pushes the provided token to the lines array.
   *
   * @param token - A token to push.
   */
  ;

  _proto.push = function push(token) {
    var category = token[0];
    var index;
    var from = 0;
    var text = token[1];

    while ((index = text.indexOf(LINE_BREAK, from)) > -1) {
      if (from < index) {
        this.lines[this.index].push([category, text.slice(from, index)]);
      }

      from = index + 1;
      this.lines[++this.index] = [];
    }

    text = text.slice(from);

    if (text) {
      this.lines[this.index].push([category, text]);
    }
  }
  /**
   * Handles the matched text.
   *
   * @param match     - A matched result.
   * @param language  - A Language object.
   * @param tokenizer - A tokenizer that has been matched with the text.
   *
   * @return An index of the text where the handling ends.
   */
  ;

  _proto.handle = function handle(match, language, tokenizer) {
    var category = tokenizer[0];
    var offset = 0;

    if (category) {
      var _text = match[0];

      if (startsWith(category, '@')) {
        var lang = language.use[category.slice(1)];
        assert(lang);
        return this.tokenizeBy(_text, lang, lang.grammar.main);
      }

      if (startsWith(category, '#')) {
        var tokenizers = language.grammar[category.slice(1)];
        assert(tokenizers);
        var value = tokenizer[2] === '@rest' ? match.input.slice(match.index) : _text;
        return this.tokenizeBy(value, language, tokenizers);
      }

      offset = _text.length;
      this.push([category, _text]);
    }

    return offset;
  }
  /**
   * Tokenizes the text by the current language.
   *
   * @param text  - A text to tokenize.
   *
   * @return An array with tokens.
   */
  ;

  _proto.tokenize = function tokenize(text) {
    this.lines = [[]];
    this.index = 0;
    this.tokenizeBy(text, this.language, this.language.grammar.main);
    return this.lines;
  };

  return Lexer;
}();
/**
 * The class for providing the very simple event bus.
 *
 * @private
 * @since 0.0.1
 */


var EventBus = /*#__PURE__*/function () {
  function EventBus() {
    /**
     * Holds handlers.
     */
    this.handlers = {};
  }
  /**
   * Attaches a handler.
   *
   * @param event    - An event name.
   * @param callback - A callback function to register.
   */


  var _proto2 = EventBus.prototype;

  _proto2.on = function on(event, callback) {
    var handlers = this.handlers[event] = this.handlers[event] || [];
    handlers.push({
      callback: callback
    });
  }
  /**
   * Emits an event.
   *
   * @param event - An event name.
   * @param args  - Optional. Any number of arguments to pass to callbacks.
   */
  ;

  _proto2.emit = function emit(event) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    (this.handlers[event] || []).forEach(function (handler) {
      handler.callback.apply(handler, args);
    });
  }
  /**
   * Destroys the event bus.
   */
  ;

  _proto2.destroy = function destroy() {
    this.handlers = {};
  };

  return EventBus;
}();
/**
 * The collection of class names.
 *
 * @since 0.0.1
 */


var CLASSES = {
  root: PROJECT_CODE,
  container: PROJECT_CODE_SHORT + "__container",
  body: PROJECT_CODE_SHORT + "__body",
  code: PROJECT_CODE_SHORT + "__code",
  line: PROJECT_CODE_SHORT + "__line",
  token: PROJECT_CODE_SHORT + "__token",
  active: 'is-active'
};
/**
 * Stores all Component functions.
 */

var Components = {};
/**
 * The class for highlighting code via provided tokens.
 *
 * @since 0.0.1
 */

var Renderer = /*#__PURE__*/function () {
  /**
   * The Renderer constructor.
   *
   * @param code    - Raw code.
   * @param lines   - Lines with tokens to render.
   * @param info    - The language info object.
   * @param root    - Optional. A root element to highlight.
   * @param options - Options.
   */
  function Renderer(code, lines, info, root, options) {
    if (options === void 0) {
      options = {};
    }

    /**
     * Holds lines with tokens.
     */
    this.lines = [];
    /**
     * Holds the EventBus instance.
     */

    this.event = new EventBus();
    this.code = code;
    this.lines = lines;
    this.info = info;
    this.root = root;
    this.options = options;
    this.init();
  }
  /**
   * Adds components.
   *
   * @param components - An object literal with Component functions.
   */


  Renderer.compose = function compose(components) {
    forOwn(components, function (Component, name) {
      if (!Components[name]) {
        Components[name] = Component;
      }
    });
  }
  /**
   * Initializes the instance.
   */
  ;

  var _proto3 = Renderer.prototype;

  _proto3.init = function init() {
    var _this3 = this;

    var lines = this.lines;

    if (lines.length) {
      var tokens = lines[lines.length - 1];

      if (!tokens.length || tokens.length === 1 && !tokens[0][1].trim()) {
        // Removes the last empty line.
        lines.pop();
      }
    }

    forOwn(Components, function (Component) {
      Component(_this3);
    });
    this.event.emit('mounted', this);
  }
  /**
   * Renders lines as HTML.
   *
   * @param append - A function to add fragments to the HTML string.
   *
   * @return A rendered HTML string.
   */
  ;

  _proto3.renderLines = function renderLines(append) {
    var event = this.event;
    var tag = this.options.span ? 'span' : 'code';

    for (var i = 0; i < this.lines.length; i++) {
      var tokens = this.lines[i];
      var classes = [CLASSES.line];
      event.emit('line:open', append, classes, i);
      append("<div class=\"" + classes.join(' ') + "\">");

      if (tokens.length) {
        for (var j = 0; j < tokens.length; j++) {
          var token = tokens[j];
          var _classes = [CLASSES.token + " " + PROJECT_CODE_SHORT + "__" + token[0]];
          event.emit('token', token, _classes);
          append("<" + tag + " class=\"" + _classes.join(' ') + "\">" + escapeHtml(token[1]) + "</" + tag + ">");
        }
      } else {
        append(LINE_BREAK);
      }

      append('</div>');
      event.emit('line:closed', append, i);
    }
  }
  /**
   * Returns all lines and wrapper elements.
   *
   * @param pre - Whether to wrap elements by `pre` or not.
   *
   * @return An HTML string.
   */
  ;

  _proto3.html = function html(pre) {
    if (pre === void 0) {
      pre = true;
    }

    var event = this.event;
    var html = '';

    var append = function append(fragment) {
      html += fragment;
    };

    if (pre) {
      html += "<pre class=\"" + CLASSES.root + " " + CLASSES.root + "--" + this.info.id + "\">";
    }

    var containerClasses = [CLASSES.container];
    event.emit('open', append, containerClasses);
    html += "<div class=\"" + containerClasses.join(' ') + "\">";
    event.emit('opened', append);
    var bodyClasses = ["" + CLASSES.body + (this.options.wrap ? " " + CLASSES.body + "--wrap" : '')];
    event.emit('body:open', append, bodyClasses);
    html += "<div class=\"" + bodyClasses.join(' ') + "\">";
    event.emit('body:opened', append);
    html += "<div class=\"" + CLASSES.code + "\">";
    this.renderLines(append);
    html += "</div>"; // code

    event.emit('body:close', append);
    html += "</div>"; // body

    event.emit('close', append);
    html += "</div>"; // container

    event.emit('closed', append);

    if (pre) {
      html += "</pre>";
    }

    return html;
  }
  /**
   * Destroys the instance.
   */
  ;

  _proto3.destroy = function destroy() {
    this.event.emit('destroy');
    this.event.destroy();
  };

  return Renderer;
}();
/**
 * The data attribute name for a language.
 *
 * @since 0.0.1
 */


var ATTRIBUTE_LANGUAGE = "data-" + PROJECT_CODE_SHORT + "-language";
var REGEXP_FUNCTION = /\b\w+(?= *\()/;
var REGEXP_NUMBER = /[+-]?(\d+\.?\d*|\d*\.?\d+)([eE][+-]?\d+)?/;
var REGEXP_BOOLEAN = /\b(?:true|false)\b/;
var REGEXP_BRACKET = /[[\]{}()]/;
var REGEXP_SPACE = /[ \t]+/;
var REGEXP_QUOTE = /'(?:\\'|.)*?'/;
var REGEXP_DOUBLE_QUOTE = /"(?:\\"|.)*?"/;
var REGEXP_MULTILINE_COMMENT = /\/\*[\s\S]*?\*\//;
var REGEXP_SLASH_COMMENT = /\/\/.*/;
/**
 * Returns a common language definition.
 *
 * @return A Language object.
 */

function common() {
  return {
    id: 'common',
    name: '',
    grammar: {
      main: [[CATEGORY_STRING, REGEXP_QUOTE], [CATEGORY_STRING, REGEXP_DOUBLE_QUOTE], [CATEGORY_COMMENT, REGEXP_MULTILINE_COMMENT], [CATEGORY_COMMENT, REGEXP_SLASH_COMMENT], [CATEGORY_REGEXP, /\/(\\\/|[^\n])+?\/[a-z]*/], [CATEGORY_KEYWORD, /\b(?:break|catch|class|continue|do|else|extends|finally|for|function|if|implements|in|instanceof|interface|new|null|return|throw|trait|try|while)\b/], [CATEGORY_CLASS, /\b[A-Z][\w$]*\b/], [CATEGORY_FUNCTION, REGEXP_FUNCTION], [CATEGORY_BOOLEAN, REGEXP_BOOLEAN], [CATEGORY_IDENTIFIER, /\b[a-z_$][\w$]*\b/], [CATEGORY_NUMBER, REGEXP_NUMBER], [CATEGORY_OPERATOR, /\+[+=]?|-[-=]?|\*\*?=?|\/=?|%=?|&&?=?|\|\|?=?|\?\??=?|<<?=?|>>?=?|[!=]=?=?|[~:^]/], [CATEGORY_BRACKET, REGEXP_BRACKET], [CATEGORY_SYMBOL, /[;.,@]+/], [CATEGORY_SPACE, REGEXP_SPACE]]
    }
  };
}
/**
 * Returns the CSS language definition.
 *
 * @return A Language object.
 */


function css() {
  return {
    id: 'css',
    name: 'CSS',
    grammar: {
      main: [['#common'], ['#findBlock'], ['#findAtrule']],
      findBlock: [['#block', /(?:(?![\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])[\s\S])(?:(?![;\{\}])[\s\S])+\{[\s\S]*?\}/, '@rest']],
      findAtrule: [['#atrule', /@[0-9A-Z_a-z][\s\S]+?(;|(?=[\{\}]))/]],
      findSelector: [['#selector', /(?:(?![\t-\r \/;\{\}\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])[\s\S])[\s\S]*?(?=\{)/]],
      common: [[CATEGORY_STRING, /(["'])[\s\S]*?(?:(?!\\)[\s\S])\1/], [CATEGORY_COMMENT, REGEXP_MULTILINE_COMMENT], [CATEGORY_SPACE, REGEXP_SPACE]],
      block: [['#findAtrule'], ['#findSelector'], ['#inner', /{/, '@rest'], [CATEGORY_BRACKET, /}/, '@break'], [CATEGORY_SPACE, REGEXP_SPACE]],
      inner: [[CATEGORY_BRACKET, /{/], ['#common'], ['#findBlock'], ['#props'], ['#findAtrule'], ['', /}/, '@back']],
      atrule: [['#common'], ['#url', /\burl\(/, '@rest'], [CATEGORY_SPACE, REGEXP_SPACE], [CATEGORY_KEYWORD, /[^\s();]+/], [CATEGORY_SYMBOL, /[:;,]/], ['#paren', /\(/, '@rest']],
      paren: [[CATEGORY_BRACKET, /^\(/], ['#common'], ['#paren', /\(/, '@rest'], [CATEGORY_BRACKET, /\)/, '@break'], ['#props']],
      selector: [['#common'], [CATEGORY_OPERATOR, /[>+~]/], [CATEGORY_BRACKET, /[[\]()]/], [CATEGORY_SYMBOL, /=/], [CATEGORY_SELECTOR, /::?\S+/], [CATEGORY_SELECTOR, /[\W\d]\S+/], [CATEGORY_TAG, /\b[a-zA-Z]+|\*/], [CATEGORY_SELECTOR, /\S+/]],
      url: [['#common'], [CATEGORY_FUNCTION, /^url/], [CATEGORY_BRACKET, /\(/], [CATEGORY_STRING, /[^)]+/], [CATEGORY_BRACKET, /\)/, '@break']],
      props: [[CATEGORY_PROPERTY, /[a-z0-9-]+(?=:)/i], ['#url', /\burl\(/, '@rest'], [CATEGORY_FUNCTION, /\b[\w-]+(?=\()\b/], [CATEGORY_KEYWORD, /!important|\b(?:initial|inherit|unset)/], [CATEGORY_PROPERTY, /[a-z0-9-]+(?=:)/], [CATEGORY_NUMBER, /#([0-9a-f]{6}|[0-9a-f]{3})/i], [CATEGORY_NUMBER, /\bU\+[0-9a-f?-]+/i], [CATEGORY_NUMBER, /[+-]?(\d+\.?\d*|\d*\.?\d+)/], [CATEGORY_SYMBOL, /[:;,]/], ['#paren', /\(/, '@rest'], [CATEGORY_BRACKET, /[[\])]/], [CATEGORY_SPACE, REGEXP_SPACE]]
    }
  };
}
/**
 * Returns the JavaScript language definition.
 *
 * @return A Language object.
 */


function javascript() {
  var language = assign(common(), {
    id: 'javascript',
    name: 'JavaScript',
    alias: ['js']
  });
  var grammar = language.grammar;
  var main = grammar.main;
  before(main, CATEGORY_KEYWORD, [[CATEGORY_KEYWORD, /\b(?:as|async|await|case|catch|const|debugger|default|delete|enum|export|from|import|let|package|private|protected|public|super|switch|static|this|typeof|undefined|var|void|with|yield)\b/], [CATEGORY_KEYWORD, /\b((get|set)(?= *\S+\(\)))/], ['#backtick', /`/, '@rest'], [CATEGORY_DECORATOR, /@[^\s(@]+/]]);
  assign(grammar, {
    backtick: [[CATEGORY_STRING, /^`/], [CATEGORY_STRING, /(\$[^{]|\\[$`]|[^`$])+/], ['#expression', /\${/, '@rest'], [CATEGORY_STRING, /`/, '@break']],
    expression: [[CATEGORY_BRACKET, /^\${/], [CATEGORY_BRACKET, /}/, '@break'], ['#main']]
  });
  return language;
}
/**
 * Returns the HTML language definition.
 *
 * @return A Language object.
 */


function html() {
  return {
    id: 'html',
    alias: ['markup'],
    name: 'HTML',
    use: {
      javascript: javascript(),
      css: css()
    },
    grammar: {
      main: [[CATEGORY_COMMENT, /<!\x2D\x2D[\s\S]*?\x2D\x2D>/], [CATEGORY_PROLOG, /<!DOCTYPE.*?>/], [CATEGORY_PROLOG, /<!\[CDATA\[[\s\S]*\]\]>/], ['#script', /<script[\s\S]*?>[\s\S]*?<\/script>/], ['#style', /<style[\s\S]*?>[\s\S]*?<\/style>/], ['#tag', /<[\s\S]*?>/], [CATEGORY_ENTITY, /&[\da-z]+;|&#\d+;/i]],
      script: [['#tag', /^<script[\s\S]*?>/], ['@javascript', /[\s\S]+(?=<\/script>)/], ['#tag', /<\/script>/]],
      style: [['#tag', /^<style[\s\S]*?>/], ['@css', /[\s\S]+(?=<\/style>)/], ['#tag', /<\/style>/]],
      tag: [['#attr', /[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+[\s\S]+(?=[\t-\r \/>\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])/], [CATEGORY_TAG, /[^\s/<>"'=]+/], [CATEGORY_BRACKET, /[<>]/], [CATEGORY_SYMBOL, /[/]/]],
      attr: [[CATEGORY_SPACE, REGEXP_SPACE], [CATEGORY_VALUE, /(['"])(\\\1|.)*?\1/], [CATEGORY_SYMBOL, /[/=]/], [CATEGORY_ATTRIBUTE, /[^\s/>"'=]+/]]
    }
  };
}
/**
 * Returns the JSON language definition.
 *
 * @link https://www.json.org/json-en.html
 *
 * @return A Language object.
 */


function json() {
  return {
    id: 'json',
    name: 'JSON',
    grammar: {
      main: [[CATEGORY_PROPERTY, /".*?[^\\]"(?=:)/], [CATEGORY_STRING, REGEXP_DOUBLE_QUOTE], [CATEGORY_KEYWORD, /\bnull\b/], [CATEGORY_NUMBER, /[+-]?(\d+\.?\d*)([eE][+-]?\d+)?/], [CATEGORY_BRACKET, /[{}[]]/], [CATEGORY_BOOLEAN, REGEXP_BOOLEAN], [CATEGORY_OPERATOR, /:/], [CATEGORY_SYMBOL, /[,]/], [CATEGORY_SPACE, REGEXP_SPACE]]
    }
  };
}
/**
 * Returns the JSX language definition.
 *
 * @return A Language object.
 */


function jsx() {
  var language = assign(javascript(), {
    id: 'jsx',
    name: 'JSX',
    alias: ['react'],
    use: {
      javascript: javascript()
    }
  });
  var grammar = language.grammar;
  var main = grammar.main;
  before(main, CATEGORY_CLASS, [['#pickPairedTag'], ['#pickSelfClosedTag']]);
  assign(grammar, {
    // This doesn't pick correct paired tags when they are nested, but they are incrementally searched later.
    pickPairedTag: [['#pairedTag', /<[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*?([0-9A-Z_a-z]+?)[\s\S]*?>[\s\S]*?<\/\1>/, '@rest']],
    pickSelfClosedTag: [['#selfClosedTag', /<[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*?([0-9A-Z_a-z]+?)[\s\S]*?\/>/]],
    pairedTag: [['#openTag', /^</, '@rest'], ['@javascript', /\{[\s\S]*?\}/], ['#pickPairedTag'], ['#pickSelfClosedTag'], ['#tagName', /<\/[\w][^\s]*?>/, '@break']],
    selfClosedTag: [['#openTag', /^</, '@rest']],
    openTag: [['#tagName', /<\s*[^\s/>"'=]+/], ['@javascript', /\{[\s\S]*?\}/], [CATEGORY_ATTRIBUTE, /[^\s/>"'=]+/], [CATEGORY_VALUE, /(['"])(\\\1|.)*?\1/], [CATEGORY_SPACE, REGEXP_SPACE], [CATEGORY_SYMBOL, /[/=]/], [CATEGORY_BRACKET, />/, '@break']],
    tagName: [[CATEGORY_BRACKET, /[<>]/], [CATEGORY_SPACE, REGEXP_SPACE], [CATEGORY_SYMBOL, /\//], [CATEGORY_CLASS, /[A-Z][\w$-]*/], [CATEGORY_TAG, /[^\s/>"'=]+/]]
  });
  return language;
}
/**
 * Returns the None language definition.
 *
 * @return A Language object.
 */


function none() {
  return {
    id: 'none',
    name: '',
    grammar: {
      main: []
    }
  };
}
/**
 * Returns the SCSS language definition.
 *
 * @return A Language object.
 */


function scss() {
  var language = assign(css(), {
    id: 'scss',
    name: 'SCSS'
  });
  var grammar = language.grammar;
  assign(grammar, {
    findBlock: [['#block', /(#\{(?:(?!;)[\s\S])*?\}|(?:(?![\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])[\s\S]))(#\{(?:(?!;)[\s\S])*?\}|(?:(?![;\{\}])[\s\S]))*(?:(?!#)[\s\S])\{[\s\S]*?\}/, '@rest']],
    findAtrule: [['#atrule', /@[0-9A-Z_a-z][\s\S]+?(;|(?=(?:(?!#)[\s\S])\{))/]],
    findSelector: [['#selector', /(?:(?![\t-\r \/;\{\}\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])[\s\S])[\s\S]*?(?:(?!#)[\s\S])(?=\{)/]],
    findInterp: [['#interp', /#{/, '@rest']],
    common: [['#string'], [CATEGORY_COMMENT, REGEXP_MULTILINE_COMMENT], [CATEGORY_COMMENT, REGEXP_SLASH_COMMENT], [CATEGORY_SPACE, REGEXP_SPACE]],
    string: [['#singleQuote', /'/, '@rest'], ['#doubleQuote', /"/, '@rest']],
    singleQuote: [[CATEGORY_STRING, /^'/], ['#findInterp'], [CATEGORY_STRING, /(\\'|#[^{]|[^'#])+/], [CATEGORY_STRING, /'/, '@break']],
    doubleQuote: [[CATEGORY_STRING, /^"/], ['#findInterp'], [CATEGORY_STRING, /(\\"|#[^{]|[^"#])+/], [CATEGORY_STRING, /"/, '@break']],
    selector: [['#common'], ['#findInterp'], [CATEGORY_OPERATOR, /[>+~]/], [CATEGORY_BRACKET, /[[\]()]/], [CATEGORY_SYMBOL, /=/], [CATEGORY_SELECTOR, /::?\S+(?=#{)/], [CATEGORY_SELECTOR, /[\W\d]\S+(?=#{)/], [CATEGORY_TAG, /\b[a-zA-Z]+\b|\*/], [CATEGORY_SELECTOR, /\S+/]],
    url: [['#common'], ['#findInterp'], [CATEGORY_FUNCTION, /^url/], [CATEGORY_BRACKET, /\(/], [CATEGORY_STRING, /[^)]+(?=#{)/], [CATEGORY_STRING, /[^)]+/], [CATEGORY_BRACKET, /\)/, '@break']],
    interp: [[CATEGORY_BRACKET, /#{/], [CATEGORY_BRACKET, /}/, '@break'], ['#common'], ['#props']]
  });
  grammar.inner.unshift(['#findInterp']);
  before(grammar.atrule, '#url', [['#findInterp']]);
  before(grammar.props, CATEGORY_PROPERTY, [['#findInterp'], [CATEGORY_VARIABLE, /\$[\w-_]+/]]);
  return language;
}
/**
 * Returns the XML language definition.
 *
 * @return A Language object.
 */


function xml() {
  var language = assign(html(), {
    id: 'xml',
    name: 'XML',
    alias: []
  });
  language.grammar.main.unshift([CATEGORY_PROLOG, /<\?[\s\S]*?\?>/]);
  return language;
}
/**
 * Returns the XML language definition.
 *
 * @return A Language object.
 */


function svg() {
  return assign(xml(), {
    id: 'svg',
    name: 'SVG',
    alias: []
  });
}
/**
 * Returns the Typescript language definition.
 *
 * @return A Language object.
 */


function typescript() {
  var language = assign(javascript(), {
    id: 'typescript',
    name: 'TypeScript',
    alias: ['ts']
  });
  var grammar = language.grammar;
  var main = grammar.main;
  before(main, CATEGORY_KEYWORD, [[CATEGORY_KEYWORD, /\b(?:declare|keyof|namespace|readonly|type|string|number|boolean|bigint|symbol|object|any|never|unknown|infer)\b/]]);
  before(main, CATEGORY_FUNCTION, [['#functions', /([\w$]+)?(?:<[^>]+?>)?\s*?\(/]]);
  assign(grammar, {
    functions: [[CATEGORY_FUNCTION, /^[\w$]+/]].concat(main.filter(function (tokenizer) {
      return tokenizer[0] !== '#functions';
    }))
  });
  return language;
}
/**
 * Returns the VUE language definition.
 *
 * @return A Language object.
 */


function vue() {
  var language = assign(html(), {
    id: 'vue',
    name: 'Vue',
    alias: []
  }); // Vue uses Mustache syntax for writing code inside tags.

  language.grammar.main.push(['@javascript', /{{[\s\S]*?}}/]);
  return language;
}

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  common: common,
  css: css,
  html: html,
  javascript: javascript,
  json: json,
  jsx: jsx,
  none: none,
  scss: scss,
  svg: svg,
  typescript: typescript,
  vue: vue,
  xml: xml
});
/**
 * Stores all Lexer instances.
 */

var lexers = {};
/**
 * The class that tokenizes code for syntax highlighting.
 *
 * @since 0.0.1
 */

var RyuseiLight = /*#__PURE__*/function () {
  /**
   * The RyuseiLight constructor.
   *
   * @param options  - Optional. Options.
   */
  function RyuseiLight(options) {
    if (options === void 0) {
      options = {};
    }

    /**
     * Holds all renderers.
     */
    this.renderers = [];
    this.options = assign({}, options);
  }
  /**
   * Registers languages.
   *
   * @param languages - A Language object or objects.
   */


  RyuseiLight.register = function register(languages) {
    toArray(languages).forEach(function (language) {
      var id = language.id;

      if (id && !lexers[id]) {
        var lexer = new Lexer(language);
        (language.alias || []).concat(id).forEach(function (id) {
          lexers[id] = lexer;
        });
      }
    });
  }
  /**
   * Tokenizes the provided string.
   *
   * @param code     - A string to tokenize.
   * @param language - A language ID.
   *
   * @return An array of arrays with tokens as [ string, string ].
   */
  ;

  RyuseiLight.tokenize = function tokenize(code, language) {
    return RyuseiLight.getLexer(language).tokenize(code);
  }
  /**
   * Returns a registered Lexer instance.
   * If it's not found, the `none` lexer will be returned.
   *
   * @param language - A language name.
   */
  ;

  RyuseiLight.getLexer = function getLexer(language) {
    if (!lexers.none) {
      RyuseiLight.register(none());
    }

    return lexers[language] || lexers.none;
  }
  /**
   * Returns a new Renderer instance.
   *
   * @param code    - A code to highlight.
   * @param elm     - Optional. An element to highlight.
   * @param options - Optional. Options.
   */
  ;

  var _proto4 = RyuseiLight.prototype;

  _proto4.getRenderer = function getRenderer(code, elm, options) {
    if (options === void 0) {
      options = {};
    }

    options = assign({}, this.options, options);
    var language = options.language;
    var _RyuseiLight$getLexer = RyuseiLight.getLexer(language).language,
        name = _RyuseiLight$getLexer.name,
        id = _RyuseiLight$getLexer.id;
    return new Renderer(code, RyuseiLight.tokenize(code, language), {
      name: name,
      id: id
    }, elm, options);
  }
  /**
   * Applies the highlighter to elements that matches the selector or the provided element.
   *
   * @param target  - A selector or an element.
   * @param options - Optional. Options.
   */
  ;

  _proto4.apply = function apply(target, options) {
    if (options === void 0) {
      options = {};
    }

    var elms = isString(target) ? document.querySelectorAll(target) : [target];

    for (var i = 0; i < elms.length; i++) {
      var elm = elms[i];

      if (isHTMLElement(elm)) {
        var elmOptions = assign({}, options, {
          language: attr(elm, ATTRIBUTE_LANGUAGE) || undefined
        });
        var renderer = this.getRenderer(text(elm), elm, elmOptions);
        var isPre = elm instanceof HTMLPreElement;

        if (isPre) {
          addClass(elm, [CLASSES.root, CLASSES.root + "--" + renderer.info.id]);
        }

        elm.innerHTML = renderer.html(!isPre);
        renderer.event.emit('applied', elm);
        this.renderers.push(renderer);
      }
    }
  }
  /**
   * Returns highlighted HTML by tokenizing the provided code.
   *
   * @param code    - Code to highlight.
   * @param options - Optional. Options.
   *
   * @return Highlighted HTML string.
   */
  ;

  _proto4.html = function html(code, options) {
    if (options === void 0) {
      options = {};
    }

    assert(isString(code), 'Invalid code.');
    return this.getRenderer(code, null, options).html();
  }
  /**
   * Destroys the instance.
   */
  ;

  _proto4.destroy = function destroy() {
    this.renderers.forEach(function (renderer) {
      renderer.destroy();
    });
  };

  return RyuseiLight;
}();
/**
 * Adds components.
 *
 * @param components - An object literal with Component functions.
 */


RyuseiLight.compose = Renderer.compose;
/**
 * The data attribute name for active lines.
 * The value must be an array in JSON format, such as "[ 2, [ 5, 10 ] ]"
 *
 * @since 0.0.1
 */

var ATTRIBUTE_ACTIVE_LINES = "data-" + PROJECT_CODE_SHORT + "-active-lines";
/**
 * The component for highlighting lines.
 *
 * @since 0.0.1
 */

function ActiveLines(_ref) {
  var event = _ref.event,
      root = _ref.root,
      options = _ref.options;
  var lines = root && parseData(root) || options.activeLines;

  if (isArray(lines)) {
    var activeLines = normalize(lines);
    event.on('gutter:row:open', function (html, classes, index) {
      if (activeLines[index]) {
        classes.push(activeLines[index]);
      }
    });
    event.on('line:open', function (html, classes, index) {
      if (activeLines[index]) {
        classes.push(activeLines[index]);
      }
    });
  }
}
/**
 * Attempts to get definition of active lines from a data attribute.
 *
 * @param elm - A root element.
 *
 * @return An array with line numbers if available, or otherwise `undefined`.
 */


function parseData(elm) {
  var data = attr(elm, ATTRIBUTE_ACTIVE_LINES);

  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      error(e.message);
    }
  }
}
/**
 * Normalizes the definition of lines to activate.
 *
 * @param lines - An array with line numbers.
 *
 * @return An array with normalized line numbers.
 */


function normalize(lines) {
  var numbers = [];
  lines.forEach(function (range) {
    if (!isArray(range)) {
      range = [range, range];
    }

    var start = (+range[0] || 1) - 1;
    var end = (+range[1] || 1) - 1;

    for (var i = start; i <= end; i++) {
      numbers[i] = CLASSES.active;
    }
  });
  return numbers;
}
/**
 * Default options for the Copy component.
 *
 * @since 0.0.1
 */


var DEFAULT_OPTIONS = {
  html: 'Copy',
  activeHtml: 'Done',
  duration: 1000,
  ariaLabel: 'Copy code to clipboard'
};
/**
 * The component for creating a copy button and handling click.
 *
 * @since 0.0.1
 */

function Copy(_ref2) {
  var lines = _ref2.lines,
      event = _ref2.event,
      options = _ref2.options;

  if (options.copy) {
    var copyOptions = assign({}, DEFAULT_OPTIONS, isObject(options.copy) ? options.copy : {});
    var buttonClass = PROJECT_CODE_SHORT + "__copy";
    var labelClass = PROJECT_CODE_SHORT + "__button__label";
    var position = copyOptions.position === 'topLeft' ? 'topLeft' : 'topRight';
    options.overlay = options.overlay || {};
    options.overlay[position] = true;
    event.on("overlay:" + position, function (append) {
      append("<button type=\"button\" class=\"rl__button " + buttonClass + "\" aria-label=\"Copy code to clipboard\">");
      append("<span class=\"" + labelClass + " " + labelClass + "--inactive\">" + copyOptions.html + "</span>");
      append("<span class=\"" + labelClass + " " + labelClass + "--active\">" + copyOptions.activeHtml + "</span>");
      append("</button>");
    });
    event.on('applied', function (root) {
      var button = query("." + buttonClass, root);
      var code = lines.map(function (line) {
        return line.map(function (token) {
          return token[1];
        }).join('');
      }).join(LINE_BREAK);

      if (button) {
        var onClick = function onClick() {
          copy(code, button, copyOptions.duration);
        };

        button.addEventListener('click', onClick);
        event.on('destroy', function () {
          button.removeEventListener('click', onClick);
        });
      }
    });
  }
}
/**
 * Attempts to copy the provided code by the Clipboard API.
 *
 * @param code     - A code to copy.
 * @param button   - A button element.
 * @param duration - Duration for the button activation.
 */


function copy(code, button, duration) {
  var onSuccess = function onSuccess() {
    if (duration) {
      toggleClass(button, duration);
    }
  };

  if (navigator.clipboard) {
    navigator.clipboard.writeText(code).then(onSuccess)["catch"](function () {
      return execCopy(code, onSuccess);
    });
  } else {
    execCopy(code, onSuccess);
  }
}
/**
 * Attempts to copy the provided code by the `document.execCommand()` for old browsers.
 * Note that this method is deprecated.
 *
 * @param code      - Code to copy.
 * @param onSuccess - Called after the copy is done.
 */


function execCopy(code, onSuccess) {
  var textarea = create('textarea');
  textarea.textContent = code;
  styles(textarea, {
    position: 'absolute',
    left: '-99999px'
  });
  append(document.body, textarea);
  textarea.focus();
  textarea.select();
  var failed;

  try {
    document.execCommand('copy');
  } catch (e) {
    alert('Failed to copy.');
    failed = true;
  }

  document.body.removeChild(textarea);

  if (!failed) {
    onSuccess();
  }
}
/**
 * Toggles the active class of the button.
 *
 * @param button   - A button element.
 * @param duration - Duration for the button activation.
 */


function toggleClass(button, duration) {
  addClass(button, CLASSES.active);
  var prop = '_rlTimer';

  if (button[prop]) {
    clearTimeout(button[prop]);
  }

  button[prop] = setTimeout(function () {
    button.classList.remove(CLASSES.active);
  }, duration);
}
/**
 * The throttle duration in milliseconds for resizing gutter rows.
 *
 * @since 0.0.1
 */


var THROTTLE_DURATION = 100;
/**
 * The class name for a gutter element.
 *
 * @since 0.0.1
 */

var GUTTER_CLASS_NAME = PROJECT_CODE_SHORT + "__gutter";
/**
 * The class name for row element in a gutter.
 *
 * @since 0.0.1
 */

var GUTTER_ROW_CLASS_NAME = GUTTER_CLASS_NAME + "__row";
/**
 * The component for creating a gutter and its rows.
 * This is usually activated by other components through the `gutter` option.
 *
 * @since 0.0.1
 */

function Gutter(_ref3) {
  var lines = _ref3.lines,
      event = _ref3.event,
      root = _ref3.root,
      options = _ref3.options;
  // Wait for initialization of other components.
  event.on('mounted', function () {
    if (!options.gutter) {
      return;
    }

    event.on('open', function (append, classes) {
      classes.push('has-gutter');
    });
    event.on('body:opened', function (append) {
      append("<div class=\"" + GUTTER_CLASS_NAME + "\" aria-hidden=\"true\">");

      for (var i = 0; i < lines.length; i++) {
        var classes = [GUTTER_ROW_CLASS_NAME];
        event.emit('gutter:row:open', append, classes, i);
        append("<div class=\"" + classes.join(' ') + "\">");
        event.emit('gutter:row:opened', append, i);
        append("</div>");
      }

      append("</div>");
    });

    if (!root || typeof window === 'undefined') {
      return;
    }

    window.addEventListener('resize', throttle(resize, THROTTLE_DURATION));
    resize();
    event.on('destroy', function () {
      window.removeEventListener('resize', resize);
    });
    /**
     * Resizes rows according to line height.
     */

    function resize() {
      var gutter = query("." + GUTTER_CLASS_NAME, root);
      var code = query("." + CLASSES.code, root);

      if (gutter && code) {
        for (var i = 0; i < code.children.length; i++) {
          var row = gutter.children[i];
          var line = code.children[i];

          if (isHTMLElement(row) && row.clientHeight !== line.clientHeight) {
            styles(row, {
              height: line.clientHeight + "px"
            });
          }
        }
      }
    }
  });
}
/**
 * The component for rendering a language name.
 *
 * @since 0.0.1
 */


function LanguageName(_ref4) {
  var event = _ref4.event,
      info = _ref4.info,
      options = _ref4.options;
  var name = info.name;

  if (options.languageName && name) {
    var position = options.languageName === 'topLeft' ? 'topLeft' : 'topRight';
    options.overlay = options.overlay || {};
    options.overlay[position] = true;
    event.on("overlay:" + position, function (append) {
      append("<span class=\"" + PROJECT_CODE_SHORT + "__name\">" + info.name + "</span>");
    });
  }
}
/**
 * The data attribute name for line numbers.
 * This accepts boolean or number as a value.
 *
 * @since 0.0.1
 */


var ATTRIBUTE_LINE_NUMBERS = "data-" + PROJECT_CODE_SHORT + "-line-numbers";
/**
 * The component for displaying line numbers in a gutter.
 *
 * @since 0.0.1
 */

function LineNumbers(_ref5) {
  var root = _ref5.root,
      event = _ref5.event,
      options = _ref5.options;
  var data = root ? attr(root, ATTRIBUTE_LINE_NUMBERS) : '';
  var number = data === '' ? +options.lineNumbers : +data;

  if (number || number === 0) {
    options.gutter = true;
    var start = Math.floor(number) - 1;
    event.on('gutter:row:opened', function (append, i) {
      append("<span class=\"" + PROJECT_CODE_SHORT + "__line-number\">" + (i + 1 + start) + "</span>");
    });
  }
}
/**
 * The component for rendering overlay elements.
 *
 * @since 0.0.1
 */


function Overlay(_ref6) {
  var event = _ref6.event,
      options = _ref6.options;
  event.on('mounted', function () {
    var className = PROJECT_CODE_SHORT + "__overlay";
    var _options$overlay = options.overlay,
        overlay = _options$overlay === void 0 ? {} : _options$overlay;

    if (overlay.topRight || options.tools) {
      event.on('close', function (append) {
        append("<div class=\"" + className + " " + className + "--top-right\">");
        event.emit('overlay:topRight', append);

        if (options.tools) {
          append("<div class=\"" + PROJECT_CODE_SHORT + "__tools\">");
          event.emit('overlay:tools', append);
          append("</div>");
        }

        append("</div>");
      });
    }

    if (overlay.topLeft) {
      event.on('close', function (append) {
        append("<div class=\"" + className + " " + className + "--top-left\">");
        event.emit('overlay:topLeft', append);
        append("</div>");
      });
    }

    if (overlay.topRight || overlay.topLeft) {
      event.on('open', function (append, classes) {
        classes.push('has-top-overlay');
      });
    }
  });
}
/**
 * The data attribute name for a title.
 *
 * @since 0.0.1
 */


var ATTRIBUTE_TITLE = "data-" + PROJECT_CODE_SHORT + "-title";
/**
 * The component for rendering a title in a header.
 *
 * @since 0.0.1
 */

function Title(_ref7) {
  var event = _ref7.event,
      root = _ref7.root,
      options = _ref7.options;
  var title = root && attr(root, ATTRIBUTE_TITLE) || options.title;

  if (title) {
    event.on('open', function (append) {
      append("<div class=\"" + PROJECT_CODE_SHORT + "__header\">");
      append("<span class=\"" + PROJECT_CODE_SHORT + "__title\">" + title + "</span>");
      append("</div>");
    });
  }
}

var index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ActiveLines: ActiveLines,
  Copy: Copy,
  Gutter: Gutter,
  LanguageName: LanguageName,
  LineNumbers: LineNumbers,
  Overlay: Overlay,
  Title: Title
});
exports.RyuseiLight = RyuseiLight;
exports.components = index$1;
exports["default"] = RyuseiLight;
exports.languages = index;
