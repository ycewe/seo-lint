"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _enums = require("./enums");

var _default = [{
  tag: 'img',
  attributes: [{
    name: 'alt',
    min: _enums.RULES.MUST_BE_ALL
  }]
}, {
  tag: 'a',
  attributes: [{
    name: 'rel',
    min: _enums.RULES.MUST_BE_ALL
  }]
}, {
  tag: 'head',
  children: [{
    tag: 'title',
    min: 1
  }, {
    tag: 'meta',
    attributes: [{
      name: 'name',
      value: 'description',
      min: 1
    }]
  }, {
    tag: 'meta',
    attributes: [{
      name: 'name',
      value: 'keywords',
      min: 1
    }]
  }]
}, {
  tag: 'strong',
  max: 15
}, {
  tag: 'h1',
  max: 1
}];
exports.default = _default;