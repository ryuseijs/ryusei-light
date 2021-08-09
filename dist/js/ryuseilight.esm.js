/*!
 * RyuseiLight.js
 * Version  : 1.2.0
 * License  : MIT
 * Copyright: 2020 Naotoshi Fujita
 */

/**
 * The line break character.
 *
 * @private
 * @since 0.0.1
 */
var LINE_BREAK = '\n';
var CATEGORY_KEYWORD = 'keyword';
var CATEGORY_CONSTANT = 'constant';
var CATEGORY_COMMENT = 'comment';
var CATEGORY_TAG = 'tag';
var CATEGORY_TAG_CLOSE = 'tag.close';
var CATEGORY_SELECTOR = 'selector';
var CATEGORY_ATRULE = 'atrule';
var CATEGORY_ATTRIBUTE = 'attr';
var CATEGORY_PROPERTY = 'prop';
var CATEGORY_VALUE = 'value';
var CATEGORY_VARIABLE = 'variable';
var CATEGORY_ENTITY = 'entity';
var CATEGORY_CDATA = 'cdata';
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
var CATEGORY_DELIMITER = 'delimiter';
var CATEGORY_SYMBOL = 'symbol';
var CATEGORY_SPACE = 'space';
var CATEGORY_TEXT = 'text'; // Internal use only

var CATEGORY_LINEBREAK = 'lb';
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


function addClass$1(elm, classes) {
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
  if (object) {
    var keys = Object.keys(object);

    for (var i = 0; i < keys.length; i++) {
      iteratee(object[keys[i]], keys[i]);
    }
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
    if (isObject(source)) {
      forOwn(source, function (value, key) {
        if (!isUndefined(source[key])) {
          object[key] = source[key];
        }
      });
    }
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
    addClass$1(elm, classes);
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
 * Returns an open tag with provided classes.
 *
 * @param classes - Classes.
 * @param tag     - Optional. A tag name.
 */


function tag(classes, tag) {
  return "<" + (tag || 'div') + " class=\"" + classes.join(' ') + "\">";
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
    var merged = [];

    for (var i = 0; i < tokenizers.length; i++) {
      var tokenizer = tokenizers[i];
      var _tokenizers$i = tokenizers[i],
          category = _tokenizers$i[0],
          regexp = _tokenizers$i[1];

      if (startsWith(category, '#') && !regexp) {
        merged.push.apply(merged, this.merge(language, language.grammar[category.slice(1)]));
      } else {
        (function () {
          var flags = regexp.toString().match(/[gimsy]*$/)[0].replace(/[gy]/g, '');
          var source = regexp.source + (isStickySupported ? '' : '|()');
          forOwn(language.source, function (replacement, key) {
            source = source.replace(new RegExp("%" + key, 'g'), replacement.source);
          });
          tokenizer[1] = new RegExp(source, (isStickySupported ? 'y' : 'g') + flags);
          merged.push(tokenizer);
        })();
      }
    }

    return merged;
  }
  /**
   * Parses the text by the provided language and tokenizers.
   *
   * @param text       - A text to tokenize.
   * @param language   - A Language object.
   * @param tokenizers - An array with tokenizers.
   * @param state      - Optional. The current state name.
   *
   * @return An index of the text where the handling ends.
   */
  ;

  _proto.parse = function parse(text, language, tokenizers, state) {
    var index = 0;
    var position = 0;
    this.depth++;

    main: while (index < text.length && !this.aborted) {
      for (var i = 0; i < tokenizers.length; i++) {
        var tokenizer = tokenizers[i];
        var regexp = tokenizer[1],
            action = tokenizer[2];
        regexp.lastIndex = index;
        var match = regexp.exec(text);

        if (!match || !match[0]) {
          continue;
        }

        if (position < index) {
          this.push([CATEGORY_TEXT, text.slice(position, index)], language, state);
        }

        if (action === '@back') {
          position = index;
          break main;
        }

        var offset = this.handle(match, language, tokenizer, state);
        index += offset || 1;
        position = index;

        if (action === '@break') {
          break main;
        }

        continue main;
      }

      index++;
    }

    if (position < index) {
      this.push([CATEGORY_TEXT, text.slice(position)], language, state);
    }

    this.depth--;
    return index;
  }
  /**
   * Pushes the provided token to the lines array.
   *
   * @param token    - A token to push.
   * @param language - A Language object.
   * @param state    - A state name.
   */
  ;

  _proto.push = function push(token, language, state) {
    var depth = this.depth;
    var category = token[0],
        text = token[1];
    var start = this.index;
    var index = 0;
    var from = 0;

    while (index > -1 && !this.aborted) {
      index = text.indexOf(LINE_BREAK, from);
      var line = this.lines[this.index];
      var empty = from === index && !line.length;
      var code = empty ? LINE_BREAK : text.slice(from, index < 0 ? undefined : index);
      var info = {
        depth: depth,
        language: language.id,
        state: state
      };

      if (code) {
        if (category !== CATEGORY_TEXT) {
          info.head = index > -1 && !from;
          info.tail = index < 0 && !!from;
          info.split = index > -1 || !!from;
          info.distance = this.index - start;
        }

        line.push([category === CATEGORY_TEXT && empty ? CATEGORY_LINEBREAK : category, code, info]);
      }

      if (index > -1) {
        this.index++;
        this.aborted = this.limit && this.index >= this.limit;

        if (!this.aborted) {
          from = index + 1;
          this.lines[this.index] = [];
        }
      }
    }
  }
  /**
   * Handles the matched text.
   *
   * @param match     - A matched result.
   * @param language  - A Language object.
   * @param tokenizer - A tokenizer that has been matched with the text.
   * @param state     - A state name.
   *
   * @return An index of the text where the handling ends.
   */
  ;

  _proto.handle = function handle(match, language, tokenizer, state) {
    var category = tokenizer[0];

    if (!category) {
      return 0;
    }

    var text = match[0];

    if (tokenizer[3] === '@debug') {
      // eslint-disable-next-line
      console.log(text, tokenizer);
    }

    if (startsWith(category, '@')) {
      assert(language.use);
      var lang = language.use[category.slice(1)];
      assert(lang);
      return this.parse(text, lang, lang.grammar.main, category);
    }

    if (startsWith(category, '#')) {
      var tokenizers = language.grammar[category.slice(1)];
      assert(tokenizers);

      if (tokenizer[2] === '@rest') {
        text = match.input.slice(match.index);
      }

      return this.parse(text, language, tokenizers, category);
    }

    this.push([category, text], language, state);
    return text.length;
  }
  /**
   * Tokenizes the text by the current language.
   *
   * @param text  - A text to tokenize.
   * @param limit - Optional. Limits the number of lines.
   *
   * @return An array with tokens.
   */
  ;

  _proto.tokenize = function tokenize(text, limit) {
    this.lines = [[]];
    this.index = 0;
    this.depth = -1;
    this.limit = limit || 0;
    this.aborted = false;
    this.parse(text, this.language, this.language.grammar.main, '#main');
    return this.lines;
  };

  return Lexer;
}();

var ROOT = PROJECT_CODE;
var CONTAINER = PROJECT_CODE_SHORT + "__container";
var BODY = PROJECT_CODE_SHORT + "__body";
var CODE = PROJECT_CODE_SHORT + "__code";
var LINE = PROJECT_CODE_SHORT + "__line";
var TOKEN = PROJECT_CODE_SHORT + "__token";
var ACTIVE = 'is-active';
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
   * @param priority - Optional. A priority number for the order in which the callbacks are invoked.
   */


  var _proto2 = EventBus.prototype;

  _proto2.on = function on(event, callback, priority) {
    if (priority === void 0) {
      priority = 10;
    }

    var handlers = this.handlers[event] = this.handlers[event] || [];
    handlers.push({
      callback: callback,
      priority: priority
    });
    handlers.sort(function (handler1, handler2) {
      return handler1.priority - handler2.priority;
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
 * Stores all Extensions functions.
 */


var Extensions = {};
/**
 * The class for highlighting code via provided tokens.
 *
 * @since 0.0.1
 */

var Renderer = /*#__PURE__*/function () {
  /**
   * The Renderer constructor.
   *
   * @param lines   - Lines with tokens to render.
   * @param info    - The language info object.
   * @param root    - Optional. A root element to highlight.
   * @param options - Options.
   */
  function Renderer(lines, info, root, options) {
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
    this.lines = lines;
    this.info = info;
    this.root = root;
    this.options = options;
    this.init();
  }
  /**
   * Adds extensions.
   *
   * @param extensions - An object literal with Component functions.
   */


  Renderer.compose = function compose(extensions) {
    forOwn(extensions, function (Component, name) {
      Extensions[name] = Component;
    });
  }
  /**
   * Initializes the instance.
   */
  ;

  var _proto3 = Renderer.prototype;

  _proto3.init = function init() {
    var _this2 = this;

    var lines = this.lines;

    if (lines.length) {
      var tokens = lines[lines.length - 1];

      if (!tokens.length || tokens.length === 1 && !tokens[0][1].trim()) {
        // Removes the last empty line.
        lines.pop();
      }
    }

    forOwn(Extensions, function (Component) {
      Component(_this2);
    });
    this.event.emit('mounted');
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
    var tagName = this.options.span ? 'span' : 'code';

    for (var i = 0; i < this.lines.length; i++) {
      var tokens = this.lines[i];
      var classes = [LINE];
      event.emit('line:open', append, classes, i);
      append(tag(classes));

      var _loop = function _loop(j) {
        var token = tokens[j];
        var categories = token[0].split('.');
        var className = PROJECT_CODE_SHORT + "__" + categories[0];
        var modifiers = categories.slice(1).map(function (sub) {
          return className + "--" + sub;
        });
        var classes = [TOKEN, className].concat(modifiers);
        event.emit('token', token, classes);
        append("" + tag(classes, tagName) + escapeHtml(token[1]) + "</" + tagName + ">");
      };

      for (var j = 0; j < tokens.length; j++) {
        _loop(j);
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
    var event = this.event;
    var closeTag = '</div>';
    var html = '';

    var append = function append(fragment) {
      html += fragment;
    };

    if (pre) {
      html += tag([ROOT + " " + ROOT + "--" + this.info.id], 'pre');
    }

    var containerClasses = [CONTAINER];
    event.emit('open', append, containerClasses);
    html += tag(containerClasses);
    var bodyClasses = ["" + BODY + (this.options.wrap ? " " + BODY + "--wrap" : '')];
    event.emit('body:open', append, bodyClasses);
    html += tag(bodyClasses);
    event.emit('code:open', append);
    html += tag([CODE]);
    this.renderLines(append);
    html += closeTag; // code

    event.emit('body:close', append);
    html += closeTag; // body

    event.emit('close', append);
    html += closeTag; // container

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
var REGEXP_NUMBER = /[+-]?(\d+\.?\d*|\d*\.?\d+)([eE][+-]?\d+)?/;
var REGEXP_BOOLEAN = /\b(?:true|false)\b/;
var REGEXP_BRACKET = /[[\]{}()]/;
var REGEXP_SPACE = /[ \t]+/;
var REGEXP_QUOTE = /'(?:\\'|.)*?'/;
var REGEXP_DOUBLE_QUOTE = /"(?:\\"|.)*?"/;
var REGEXP_MULTILINE_COMMENT = /\/\*[\s\S]*?(\*\/|$)/;
var REGEXP_SLASH_COMMENT = /\/\/.*/;
var REGEXP_GENERAL_KEYWORDS = /\b(?:break|catch|class|continue|do|else|extends|finally|for|function|if|implements|in|instanceof|interface|new|null|return|throw|try|while)\b/;
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
      main: [['#common'], // An atrule without a block
      ['#findSingleAtrule'], // Blocks including atrules
      ['#findBlock']],
      findBlock: [['#block', /(?:(?![\t\n\r ;\{\}])[\s\S])(?:(?![;\{\}])[\s\S])*\{[\s\S]*?\}/, '@rest']],
      findSingleAtrule: [['#atrule', /@(?:(?![;\{])[\s\S])+?;/]],
      // Finds atrules before { and ;
      findAtrule: [['#atrule', /@(?:(?![;\{])[\s\S])*?(?=[;\{])/]],
      // May not start with digits
      findSelector: [['#selector', /(?:(?![\t\n\r ;\{\}])[\s\S])[\s\S]*?(?=\{)/]],
      common: [[CATEGORY_STRING, /(["'])[\s\S]*?(?:(?!\\)[\s\S])\1/], [CATEGORY_COMMENT, REGEXP_MULTILINE_COMMENT], [CATEGORY_SPACE, REGEXP_SPACE]],
      block: [['#inner', /{/, '@rest'], [CATEGORY_BRACKET, /}/, '@break'], ['#findAtrule'], ['#findSelector'], [CATEGORY_SPACE, REGEXP_SPACE]],
      inner: [[CATEGORY_BRACKET, /{/], ['#common'], ['#findBlock'], ['#props'], ['#findAtrule'], ['', /}/, '@back']],
      atrule: [['#common'], ['#url', /\burl\(/, '@rest'], [CATEGORY_SPACE, REGEXP_SPACE], [CATEGORY_ATRULE, /[^\s();]+/], [CATEGORY_DELIMITER, /[:;,]/], ['#paren', /\(/, '@rest']],
      paren: [[CATEGORY_BRACKET, /^\(/], ['#common'], ['#paren', /\(/, '@rest'], [CATEGORY_BRACKET, /\)/, '@break'], ['#props']],
      selector: [['#common'], [CATEGORY_OPERATOR, /[>+~]/], [CATEGORY_BRACKET, /[[\]()]/], [CATEGORY_DELIMITER, /=/], [CATEGORY_SELECTOR, /::?\S+/], [CATEGORY_SELECTOR, /[\W\d]\S+/], [CATEGORY_TAG, /\b[a-z]+|\*/i], [CATEGORY_SELECTOR, /\S+/]],
      url: [['#common'], [CATEGORY_FUNCTION, /^url/], [CATEGORY_BRACKET, /\(/], [CATEGORY_STRING, /[^)]+/], [CATEGORY_BRACKET, /\)/, '@break']],
      props: [[CATEGORY_PROPERTY, /[a-z0-9-_\xA0-\uFFFF]+(?=:)/i], ['#url', /\burl\(/, '@rest'], [CATEGORY_FUNCTION, /\b[\w-]+(?=\()\b/], [CATEGORY_KEYWORD, /!important|\b(?:initial|inherit|unset)/], [CATEGORY_PROPERTY, /[a-z0-9-]+(?=:)/], [CATEGORY_NUMBER, /#([0-9a-f]{6}|[0-9a-f]{3})/i], [CATEGORY_NUMBER, /\bU\+[0-9a-f?-]+/i], [CATEGORY_NUMBER, /[+-]?(\d+\.?\d*|\d*\.?\d+)/], [CATEGORY_DELIMITER, /[:;,]/], ['#paren', /\(/, '@rest'], [CATEGORY_BRACKET, /[[\])]/], [CATEGORY_SPACE, REGEXP_SPACE]]
    }
  };
}
/**
 * Returns the JavaScript language definition.
 *
 * @return A Language object.
 */


function javascript() {
  return {
    id: 'javascript',
    name: 'JavaScript',
    alias: ['js'],
    source: {
      func: /[_$a-z\xA0-\uFFFF][_$a-z0-9\xA0-\uFFFF]*/
    },
    grammar: {
      main: [[CATEGORY_STRING, REGEXP_QUOTE], [CATEGORY_STRING, REGEXP_DOUBLE_QUOTE], ['#backtick', /`/, '@rest'], [CATEGORY_COMMENT, REGEXP_MULTILINE_COMMENT], [CATEGORY_COMMENT, REGEXP_SLASH_COMMENT], [CATEGORY_REGEXP, /\/(\[.*?]|\\\/|.)+?\/[gimsuy]*/], [CATEGORY_KEYWORD, REGEXP_GENERAL_KEYWORDS], [CATEGORY_KEYWORD, /\b(?:as|async|await|case|catch|const|debugger|default|delete|enum|export|from|import|let|package|private|protected|public|super|switch|static|this|typeof|undefined|var|void|with|yield)\b/], [CATEGORY_KEYWORD, /\b((get|set)(?=\s+%func))/i], [CATEGORY_CLASS, /\b[A-Z][\w$]*\b/], [CATEGORY_FUNCTION, /%func(?=\s*\()/i], [CATEGORY_BOOLEAN, REGEXP_BOOLEAN], [CATEGORY_DECORATOR, /@[^\s(@]+/], [CATEGORY_IDENTIFIER, /\b[a-z_$][\w$]*\b/], [CATEGORY_NUMBER, REGEXP_NUMBER], [CATEGORY_OPERATOR, /=>/], [CATEGORY_OPERATOR, /\+[+=]?|-[-=]?|\*\*?=?|[/%^]=?|&&?=?|\|\|?=?|\?\??=?|<<?=?|>>>=?|>>?=?|[!=]=?=?|[~:^]/], [CATEGORY_BRACKET, REGEXP_BRACKET], [CATEGORY_DELIMITER, /[;.,]+/], [CATEGORY_SPACE, REGEXP_SPACE]],
      backtick: [[CATEGORY_STRING, /^`/], [CATEGORY_STRING, /(\$[^{]|\\[$`]|[^`$])+/], ['#expression', /\${/, '@rest'], [CATEGORY_STRING, /`/, '@break']],
      expression: [[CATEGORY_DELIMITER, /^\${/], [CATEGORY_DELIMITER, /}/, '@break'], ['#main']]
    }
  };
}
/**
 * Returns the HTML language definition.
 *
 * @param options - Optional. Options.
 *
 * @return A Language object.
 */


function html(options) {
  if (options === void 0) {
    options = {};
  }

  var script = (options.script || javascript)();
  var style = (options.style || css)();
  var cdata = [CATEGORY_CDATA, /<!\[CDATA\[[\s\S]*\]\]>/i]; // Embedded scripts or styles may contain CDATA sections.

  script.grammar.main.unshift(cdata);
  style.grammar.main.unshift(cdata);
  return {
    id: 'html',
    alias: ['markup'],
    name: 'HTML',
    use: {
      script: script,
      style: style
    },
    grammar: {
      main: [[CATEGORY_COMMENT, /<!\x2D\x2D[\s\S]*?\x2D\x2D>/], [CATEGORY_PROLOG, /<!DOCTYPE[\s\S]*?>/i], cdata, ['#script', /<script[\s\S]*?>[\s\S]*?<\/script>/], ['#style', /<style[\s\S]*?>[\s\S]*?<\/style>/], ['#tag', /<[\s\S]*?>/], [CATEGORY_ENTITY, /&[\da-z]+;|&#\d+;/i], [CATEGORY_SPACE, REGEXP_SPACE]],
      script: [['#tag', /^<script[\s\S]*?>/], cdata, ['@script', /[\s\S]+(?=<\/script>)/], ['#tag', /<\/script>/]],
      style: [['#tag', /^<style[\s\S]*?>/], ['@style', /[\s\S]+(?=<\/style>)/], ['#tag', /<\/style>/]],
      tag: [['#closeTag', /<\/.+>/], ['#tagContent']],
      closeTag: [[CATEGORY_TAG_CLOSE, /[^\s/<>"'=]+/], ['#tagContent']],
      tagContent: [['#attr', /[\t\n\r ]+[\s\S]+(?=[\t\n\r \/>])/], [CATEGORY_TAG, /[^\s/<>"'=]+/], [CATEGORY_BRACKET, /[<>]/], [CATEGORY_DELIMITER, /[/]/]],
      attr: [[CATEGORY_SPACE, REGEXP_SPACE], [CATEGORY_VALUE, /(['"])(\\\1|.)*?\1/], [CATEGORY_DELIMITER, /[/=]/], [CATEGORY_ATTRIBUTE, /[^\s/>"'=]+/]]
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
      main: [[CATEGORY_PROPERTY, /".*?[^\\]"(?=:)/], [CATEGORY_STRING, REGEXP_DOUBLE_QUOTE], [CATEGORY_KEYWORD, /\bnull\b/], [CATEGORY_NUMBER, /[+-]?(\d+\.?\d*)([eE][+-]?\d+)?/], [CATEGORY_BRACKET, /[{}[\]]/], [CATEGORY_BOOLEAN, REGEXP_BOOLEAN], [CATEGORY_OPERATOR, /:/], [CATEGORY_DELIMITER, /,/], [CATEGORY_SPACE, REGEXP_SPACE]]
    }
  };
}
/**
 * Returns the JSX language definition.
 *
 * @return A Language object.
 */


function jsx(options) {
  if (options === void 0) {
    options = {};
  }

  var language = assign((options.base || javascript)(), {
    id: 'jsx',
    name: 'JSX',
    alias: ['react']
  });
  var grammar = language.grammar;
  before(grammar.main, CATEGORY_CLASS, [['#findPairedTag'], ['#findSelfClosedTag']]);
  assign(grammar, {
    // This doesn't pick correct paired tags if nested, but they are incrementally searched later.
    findPairedTag: [['#pairedTag', /(?:<[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*?([0-9A-Z_a-z]+)[\s\S]*?>[\s\S]*?<\/\1>)|<[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*?>[\s\S]*?<\/>/, '@rest']],
    // Should not match the closing delimiter inside `{}`, `''` and `""`.
    findSelfClosedTag: [['#selfClosedTag', /<(?:\{[\s\S]*?\}|(["'])[\s\S]*?\1|(?:(?!>)[\s\S]))+?\/>/]],
    findBracket: [['#code', /{/, '@rest']],
    pairedTag: [['#openTag', /^</, '@rest'], ['#findBracket'], ['#findPairedTag'], ['#findSelfClosedTag'], ['#tagName', /<\/([\w][^\s]*?)?>/, '@break'], [CATEGORY_SPACE, REGEXP_SPACE]],
    code: [[CATEGORY_BRACKET, /^{/], [CATEGORY_BRACKET, /}/, '@break'], ['#findBracket'], ['#main']],
    selfClosedTag: [['#openTag', /^</, '@rest']],
    openTag: [['#tagName', /<\s*[^\s/>"'=]*/], ['#findBracket'], [CATEGORY_ATTRIBUTE, /[^\s/>"'=]+/], [CATEGORY_VALUE, /(['"])(\\\1|.)*?\1/], [CATEGORY_SPACE, REGEXP_SPACE], [CATEGORY_DELIMITER, /[/=]/], [CATEGORY_BRACKET, />/, '@break']],
    tagName: [[CATEGORY_BRACKET, /[<>]/], [CATEGORY_SPACE, REGEXP_SPACE], [CATEGORY_DELIMITER, /\//], [CATEGORY_CLASS, /[A-Z][\w$-]*/], [CATEGORY_TAG, /[^\s/>"'=]+/]]
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
    findBlock: [
    /**
     * Include: div {}, .class {}, #id {}, * {}, *{}, #{ $variable } {}, .something__#{ $variable } {}
     * Exclude: #{ variable }: value
     */
    ['#block', /([\*-_a-z]|#\{(?:(?!;)[\s\S])*?\}|((#\{(?:(?!;)[\s\S])*?\}|(?:(?![\t-\r ;\{\}\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])[\s\S]))(#\{(?:(?!;)[\s\S])*?\}|(?:(?![#;\{\}])[\s\S])|#(?:(?!\{)[\s\S]))+?))(?!#)\{[\s\S]*?\}/i, '@rest']],
    // May contain #{} interpolation
    findSingleAtrule: [['#atrule', /@(#\{|(?:(?![;\{])[\s\S]))+?;/]],
    findAtrule: [['#atrule', /@(#\{|(?:(?![;\{])[\s\S]))*?(?=[;\{])/]],
    // May contain #{} interpolation
    findSelector: [['#selector', /(?:(?!;)[\s\S])*?(?:(?!#)[\s\S])(?=\{)/, '']],
    findInterp: [['#interp', /#{/, '@rest']],
    common: [['#string'], [CATEGORY_COMMENT, REGEXP_MULTILINE_COMMENT], [CATEGORY_COMMENT, REGEXP_SLASH_COMMENT], [CATEGORY_DELIMITER, /;/], [CATEGORY_SPACE, REGEXP_SPACE]],
    string: [['#singleQuote', /'/, '@rest'], ['#doubleQuote', /"/, '@rest']],
    singleQuote: [[CATEGORY_STRING, /^'/], ['#findInterp'], [CATEGORY_STRING, /(\\'|#[^{]|[^'#])+/], [CATEGORY_STRING, /'/, '@break']],
    doubleQuote: [[CATEGORY_STRING, /^"/], ['#findInterp'], [CATEGORY_STRING, /(\\"|#[^{]|[^"#])+/], [CATEGORY_STRING, /"/, '@break']],
    selector: [['#common'], ['#findInterp'], [CATEGORY_OPERATOR, /[>+~]/], [CATEGORY_BRACKET, /[[\]()]/], [CATEGORY_DELIMITER, /=/], [CATEGORY_SELECTOR, /::?\S+(?=#{)/], [CATEGORY_SELECTOR, /[\W\d]\S+(?=#{)/], [CATEGORY_TAG, /\b[a-zA-Z]+\b|\*/], [CATEGORY_SELECTOR, /([^#\s]|#[^{\s])+/]],
    url: [['#common'], ['#findInterp'], [CATEGORY_FUNCTION, /^url/], [CATEGORY_BRACKET, /\(/], [CATEGORY_STRING, /[^)]+(?=#{)/], [CATEGORY_STRING, /[^)]+/], [CATEGORY_BRACKET, /\)/, '@break']],
    interp: [[CATEGORY_DELIMITER, /#{/], [CATEGORY_DELIMITER, /}/, '@break'], ['#common'], ['#props']]
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
  before(main, CATEGORY_KEYWORD, [[CATEGORY_KEYWORD, /\b(?:declare|keyof|namespace|readonly|type|string|number|boolean|bigint|symbol|object|any|never|unknown|infer|is)\b/]]);
  before(main, CATEGORY_FUNCTION, [['#functions', /([_$a-z\xA0-\uFFFF][_$a-z0-9\xA0-\uFFFF]*)?(?:<[^>]+?>)?\s*?\(/]]);
  assign(grammar, {
    functions: [[CATEGORY_FUNCTION, /^[\w$]+/]].concat(main.filter(function (tokenizer) {
      return tokenizer[0] !== '#functions';
    }))
  });
  return language;
}
/**
 * Returns the TSX language definition.
 *
 * @return A Language object.
 */


function tsx() {
  return assign(jsx({
    base: typescript
  }), {
    id: 'tsx',
    name: 'TSX'
  });
}
/**
 * Returns the VUE language definition.
 *
 * @return A Language object.
 */


function vue(options) {
  if (options === void 0) {
    options = {};
  }

  var language = assign(html(options), {
    id: 'vue',
    name: 'Vue',
    alias: []
  }); // Vue uses Mustache syntax for writing code inside tags.

  language.grammar.main.push(['@script', /{{[\s\S]*?}}/]);
  return language;
} // export { common }     from './common/common';


var index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  css: css,
  html: html,
  javascript: javascript,
  json: json,
  jsx: jsx,
  none: none,
  scss: scss,
  svg: svg,
  tsx: tsx,
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
        (language.alias || []).concat(id).forEach(function (id) {
          lexers[id] = new Lexer(language);
        });
      }
    });
  }
  /**
   * Tokenizes the provided string.
   *
   * @param code     - A string to tokenize.
   * @param language - A language ID.
   * @param limit    - Optional. Limits the (ideal) number of lines.
   *
   * @return An array of arrays with tokens as [ string, string ].
   */
  ;

  RyuseiLight.tokenize = function tokenize(code, language, limit) {
    return RyuseiLight.getLexer(language).tokenize(code, limit);
  }
  /**
   * Checks if the given language has been already registered or not.
   *
   * @param language - A language to check.
   */
  ;

  RyuseiLight.has = function has(language) {
    return !!lexers[language];
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
    options = assign({}, this.options, options);
    var language = options.language;
    var _RyuseiLight$getLexer = RyuseiLight.getLexer(language).language,
        name = _RyuseiLight$getLexer.name,
        id = _RyuseiLight$getLexer.id;
    return new Renderer(RyuseiLight.tokenize(code, language), {
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
          addClass$1(elm, [ROOT, ROOT + "--" + renderer.info.id]);
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
    assert(isString(code), 'Invalid code.');
    return this.getRenderer(code, null, options).html(true);
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
 * Composes extensions.
 *
 * @param extensions - An object literal with Extension functions.
 */


RyuseiLight.compose = Renderer.compose;
/**
 * The data attribute name for active lines.
 * The value must be an array in JSON format, such as "[ 2, [ 5, 10 ] ]"
 *
 * @private
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
      numbers[i] = ACTIVE;
    }
  });
  return numbers;
}
/**
 * The data attribute name for a caption.
 *
 * @since 0.0.22
 */


var ATTRIBUTE_CAPTION = "data-" + PROJECT_CODE_SHORT + "-caption";
/**
 * The component for wrapping a code snipped by a figure tag and appending a figcaption.
 *
 * @since 0.0.22
 */

function Caption(_ref2) {
  var event = _ref2.event,
      root = _ref2.root,
      options = _ref2.options;
  var attrCaption = root && attr(root, ATTRIBUTE_CAPTION);

  if (!attrCaption && !options.caption) {
    return;
  }

  var captionOptions = options.caption;

  var _assign = assign({}, isObject(captionOptions) ? captionOptions : null),
      position = _assign.position,
      html = _assign.html;

  var caption = attrCaption || html || (isString(captionOptions) ? captionOptions : '');

  if (caption) {
    var bottom = position === 'bottom';
    event.on('open', function (append) {
      append("<figure class=\"" + PROJECT_CODE_SHORT + "__figure\">");

      if (!bottom) {
        appendCaption(append, caption);
      }
    });
    event.on('closed', function (append) {
      if (bottom) {
        appendCaption(append, caption, true);
      }

      append('</figure>');
    });
  }
}
/**
 * Appends a figcaption element with a provided caption.
 *
 * @param append  - The append function.
 * @param caption - A caption.
 * @param bottom  - Optional. Set `true` for a bottom caption.
 */


function appendCaption(append, caption, bottom) {
  var className = PROJECT_CODE_SHORT + "__figcaption";
  append("<figcaption class=\"" + className + " " + (className + (bottom ? '--bottom' : '--top')) + "\">");
  append("<span>" + caption + "</span>");
  append("</figcaption>");
}
/**
 * Default options for the Copy component.
 *
 * @private
 *
 * @since 0.0.1
 */


var DEFAULT_OPTIONS$1 = {
  html: 'Copy',
  activeHtml: 'Done',
  duration: 1000,
  ariaLabel: 'Copy code to clipboard',
  position: 'topRight'
};
/**
 * The component for creating a copy button and handling click.
 *
 * @since 0.0.1
 */

function Copy(_ref3) {
  var lines = _ref3.lines,
      event = _ref3.event,
      options = _ref3.options;

  if (options.copy) {
    var copyOptions = assign({}, DEFAULT_OPTIONS$1, isObject(options.copy) ? options.copy : {});
    var buttonClass = PROJECT_CODE_SHORT + "__copy";
    var labelClass = PROJECT_CODE_SHORT + "__button__label";
    options.tools = copyOptions.position;
    event.on("tools:" + copyOptions.position, function (append) {
      append("<button type=\"button\" class=\"rl__button " + buttonClass + "\" aria-label=\"" + copyOptions.ariaLabel + "\">");
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
  addClass$1(button, ACTIVE);
  var prop = '_rlTimer';

  if (button[prop]) {
    clearTimeout(button[prop]);
  }

  button[prop] = setTimeout(function () {
    button.classList.remove(ACTIVE);
  }, duration);
}
/**
 * The class name for added lines.
 *
 * @private
 * @since 0.0.17
 */


var CLASS_ADDED = 'is-added';
/**
 * The class name for deleted lines.
 *
 * @private
 * @since 0.0.17
 */

var CLASS_DELETED = 'is-deleted';
/**
 * The class name for deleted lines.
 *
 * @private
 * @since 0.0.17
 */

var CLASS_DIFF = PROJECT_CODE_SHORT + "__diff";
/**
 * Default options for the Diff component.
 *
 * @since 0.0.17
 */

var DEFAULT_OPTIONS = {
  addedSymbol: '+',
  deletedSymbol: '-'
};
/**
 * The component for highlighting added/deleted lines.
 *
 * @since 0.0.17
 */

function Diff(_ref4) {
  var event = _ref4.event,
      lines = _ref4.lines,
      options = _ref4.options;

  if (!options.diff) {
    return;
  }

  options.gutter = true;
  var diffOptions = assign({}, DEFAULT_OPTIONS, isObject(options.diff) ? options.diff : null);
  var added = [];
  var deleted = [];
  lines.forEach(function (tokens, index) {
    if (tokens.length) {
      var _text = tokens[0][1];
      var processed;

      if (startsWith(_text, diffOptions.addedSymbol)) {
        added.push(index);
        processed = true;
      } else if (startsWith(_text, diffOptions.deletedSymbol)) {
        deleted.push(index);
        processed = true;
      }

      if (processed) {
        convertSymbols(diffOptions.removeSymbols, tokens);
      }
    }
  });

  if (!added.length && !deleted.length) {
    return;
  }

  event.on('line:open', function (append, classes, i) {
    addClass(added, deleted, i, classes);
  });
  event.on('gutter:row:open', function (append, classes, i) {
    addClass(added, deleted, i, classes);
  });
  event.on('gutter:row:opened', function (append, i) {
    var content = LINE_BREAK;

    if (added.indexOf(i) > -1) {
      content = diffOptions.addedSymbol;
    } else if (deleted.indexOf(i) > -1) {
      content = diffOptions.deletedSymbol;
    }

    append("<span class=\"" + CLASS_DIFF + "\">" + content + "</span>");
  }, 20);
  event.on('lineNumber:open', function (append, classes, i, data) {
    data.skip = deleted.indexOf(i) > -1;
  });
}
/**
 * Adds a status class according to the added or deleted lines.
 *
 * @param added   - An array with added line indices.
 * @param deleted - An array with deleted line indices.
 * @param index   - A line index.
 * @param classes - An array with line classes.
 */


function addClass(added, deleted, index, classes) {
  if (added.indexOf(index) > -1) {
    classes.push(CLASS_ADDED);
  } else if (deleted.indexOf(index) > -1) {
    classes.push(CLASS_DELETED);
  }
}
/**
 * Converts +/- symbols to spaces or removes them.
 *
 * @param remove - Whether to remove symbols or not.
 * @param tokens - Target tokens.
 */


function convertSymbols(remove, tokens) {
  var _tokens$ = tokens[0],
      category = _tokens$[0],
      text = _tokens$[1];

  if (remove) {
    if (text.length === 1) {
      tokens.shift();
    } else {
      tokens[0] = [category, text.slice(1)];
    }
  } else {
    var spaceToken = [CATEGORY_SPACE, ' '];

    if (text.length === 1) {
      tokens[0] = spaceToken;
    } else {
      tokens[0] = [category, text.slice(1)];
      tokens.unshift(spaceToken);
    }
  }
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
 * This is usually activated by other extensions through the `gutter` option.
 *
 * @since 0.0.1
 */

function Gutter(_ref5) {
  var lines = _ref5.lines,
      event = _ref5.event,
      root = _ref5.root,
      options = _ref5.options;
  // Wait for initialization of other extensions.
  event.on('mounted', function () {
    if (!options.gutter) {
      return;
    }

    event.on('open', function (append, classes) {
      classes.push('has-gutter');
    });
    event.on('code:open', function (append) {
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
      var rows = root.getElementsByClassName(GUTTER_ROW_CLASS_NAME);
      var code = query("." + CODE, root);

      if (rows.length && code) {
        for (var i = 0; i < code.children.length; i++) {
          var row = rows[i];
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


function LanguageName(_ref6) {
  var event = _ref6.event,
      info = _ref6.info,
      options = _ref6.options;
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
 * @private
 * @since 0.0.1
 */


var ATTRIBUTE_LINE_NUMBERS = "data-" + PROJECT_CODE_SHORT + "-line-numbers";
/**
 * The class name for each line number element.
 *
 * @private
 * @since 0.0.23
 */

var LINE_NUMBER_CLASS_NAME = PROJECT_CODE_SHORT + "__line-number";
/**
 * The component for displaying line numbers in a gutter.
 *
 * @since 0.0.1
 */

function LineNumbers(_ref7) {
  var root = _ref7.root,
      event = _ref7.event,
      options = _ref7.options;
  var data = root ? attr(root, ATTRIBUTE_LINE_NUMBERS) : '';
  var number = data === '' ? +options.lineNumbers : +data;

  if (number || number === 0) {
    options.gutter = true;
    var offset = Math.floor(number) - 1;
    event.on('gutter:row:opened', function (append, i) {
      var classes = [LINE_NUMBER_CLASS_NAME];
      var data = {
        skip: false,
        content: i + 1 + offset
      };
      event.emit('lineNumber:open', append, classes, i, data);

      if (data.skip) {
        data.content = LINE_BREAK;
        offset--;
      }

      append("<span class=\"" + classes.join(' ') + "\">" + data.content + "</span>");
    });
  }
}
/**
 * The component for rendering overlay and tools elements.
 *
 * @since 0.0.1
 */


function Overlay(_ref8) {
  var event = _ref8.event,
      options = _ref8.options;
  event.on('mounted', function () {
    var _options$overlay = options.overlay,
        overlay = _options$overlay === void 0 ? {} : _options$overlay;
    var tools = options.tools;
    var topRight = overlay.topRight,
        topLeft = overlay.topLeft;
    topRight = topRight || tools === 'topRight';
    topLeft = topLeft || tools === 'topLeft';
    [topRight, topLeft].forEach(function (active, index) {
      if (active) {
        if (tools) {
          appendTools(event, index === 1);
        }

        appendOverlay(event, index === 1);
      }
    });

    if (topRight || topLeft) {
      event.on('open', function (append, classes) {
        classes.push('has-top-overlay');
      });
    }
  });
}
/**
 * Appends HTML for the overlay.
 *
 * @private
 *
 * @param event - The EventBus object.
 * @param left  - Optional. Set `true` for the left overlay.
 */


function appendOverlay(event, left) {
  var className = PROJECT_CODE_SHORT + "__overlay";
  event.on('close', function (append) {
    append("<div class=\"" + className + " " + className + "--top-" + (left ? 'left' : 'right') + "\">");
    event.emit("overlay:top" + (left ? 'Left' : 'Right'), append);
    append("</div>");
  });
}
/**
 * Appends HTML for tools.
 *
 * @private
 *
 * @param event - The EventBus object.
 * @param left  - Optional. Set `true` for the left tools.
 */


function appendTools(event, left) {
  var position = left ? 'Left' : 'Right';
  event.on("overlay:top" + position, function (append) {
    append("<span class=\"" + PROJECT_CODE_SHORT + "__tools\">");
    event.emit("tools:top" + position, append);
    append("</span>");
  });
}

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ActiveLines: ActiveLines,
  Caption: Caption,
  Copy: Copy,
  Diff: Diff,
  Gutter: Gutter,
  LanguageName: LanguageName,
  LineNumbers: LineNumbers,
  Overlay: Overlay
});
export { ActiveLines, CATEGORY_ATRULE, CATEGORY_ATTRIBUTE, CATEGORY_BOOLEAN, CATEGORY_BRACKET, CATEGORY_CDATA, CATEGORY_CLASS, CATEGORY_COMMENT, CATEGORY_CONSTANT, CATEGORY_DECORATOR, CATEGORY_DELIMITER, CATEGORY_ENTITY, CATEGORY_FUNCTION, CATEGORY_IDENTIFIER, CATEGORY_KEYWORD, CATEGORY_LINEBREAK, CATEGORY_NUMBER, CATEGORY_OPERATOR, CATEGORY_PROLOG, CATEGORY_PROPERTY, CATEGORY_REGEXP, CATEGORY_SELECTOR, CATEGORY_SPACE, CATEGORY_STRING, CATEGORY_SYMBOL, CATEGORY_TAG, CATEGORY_TAG_CLOSE, CATEGORY_TEXT, CATEGORY_VALUE, CATEGORY_VARIABLE, Caption, Copy, Diff, index as Extensions, Gutter, LanguageName, Lexer, LineNumbers, Overlay, RyuseiLight, css, RyuseiLight as default, html, javascript, json, jsx, index$1 as languages, none, scss, svg, tsx, typescript, vue, xml };
