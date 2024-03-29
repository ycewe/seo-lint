"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _enums = require("../config/enums");

var _errors = require("../config/errors");

class Validator {
  constructor(rules) {
    this.$html = null;
    this.rules = rules;
    this.tagsWithRules = [];
    this.errors = [];

    this._validateRules();
  }
  /**
   * Validates a given cheerio html with the instantiated rules
   *
   * @param {Object} $html
   * @return {Array} errors
   * @memberof Validator
   */


  validate($html) {
    this.errors = []; // reset any errors

    this.$html = $html;

    this._validateNodes(this.rules);

    return this.errors;
  } // private methods


  _validateRules() {
    if (!Array.isArray(this.rules)) {
      throw new Error(_errors.CONFIG_ERRORS.INVALID_RULES);
    }
  }

  _validateNodes(nodeArr = [], ancestry = '') {
    nodeArr.forEach(node => {
      const ancestryTrail = ancestry ? `${ancestry}>${node.tag}` : node.tag;

      this._validateRange(node, ancestryTrail);

      this._validateAttributes(node.attributes, ancestryTrail);

      this._validateNodes(node.children, ancestryTrail);
    });
  }

  _validateRange({
    max = _enums.RULES.IGNORE,
    min = _enums.RULES.IGNORE
  }, selector) {
    const numberOfTags = this.$html.find(selector).length;

    if (min > max && max >= 0 || isNaN(min) || isNaN(max)) {
      this.errors.push(_errors.CONFIG_ERRORS.INVALID_MIN_MAX);
      return;
    }

    if (max != _enums.RULES.IGNORE && max != _enums.RULES.MUST_BE_ALL && max < numberOfTags) {
      this.errors.push(_errors.RULE_ERRORS.ABOVE_MAX(max, selector));
    }

    if (min != _enums.RULES.IGNORE && min != _enums.RULES.MUST_BE_ALL && min > numberOfTags) {
      this.errors.push(_errors.RULE_ERRORS.BELOW_MIN(min, selector));
    }
  }

  _validateAttributes(attributes = [], ancestry) {
    attributes.forEach(({
      name,
      min = 1,
      value = ''
    }) => {
      const selector = ancestry + (value ? `[${name}=${value}]` : `[${name}]`);

      const error = violationCount => {
        return value ? _errors.RULE_ERRORS.MISSING_ATTR_WITH_VALUE(violationCount, ancestry, name, value) : _errors.RULE_ERRORS.MISSING_ATTR(violationCount, ancestry, name);
      };

      if (min == _enums.RULES.MUST_BE_ALL) {
        const tagsWithAttributes = this._getTagCount(selector);

        const tags = this._getTagCount(ancestry);

        const violationCount = tags - tagsWithAttributes;

        if (violationCount > 0) {
          this.errors.push(error(violationCount));
        }
      } else {
        const tagsWithAttributes = this._getTagCount(selector);

        const violationCount = min - tagsWithAttributes;

        if (violationCount > 0) {
          this.errors.push(error(violationCount));
        }
      }
    });
  }

  _getTagCount(selector) {
    return this.$html.find(selector).length;
  }

}

var _default = Validator;
exports.default = _default;