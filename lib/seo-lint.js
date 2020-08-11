"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _loader = _interopRequireDefault(require("./utils/loader"));

var _validator = _interopRequireDefault(require("./utils/validator"));

var _writer = _interopRequireDefault(require("./utils/writer"));

var _defaultRules = _interopRequireDefault(require("./config/default-rules"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SEOLint {
  constructor(options) {
    this.errors = [];
    this.options = options;
    this.validator = new _validator.default(this.options?.rules ?? _defaultRules.default);
  }
  /**
   * Validate a given input against the linter rules
   *
   * @param {string | stream} input
   * @param {string | stream} output
   * @return {string} errors
   * @memberof SEOLint
   */


  async lint(input, output) {
    const $ = await _loader.default.load(input); // remove any repeated errors can could have been generated
    // due to repeated tags/attributes

    this.errors = new Set(this.validator.validate($));
    await _writer.default.write(this._errorsToString(), output ?? this.options?.output);
    return this._errorsToString();
  } // private methods


  _errorsToString() {
    return [...this.errors].join('\n');
  }

}

var _default = SEOLint;
exports.default = _default;