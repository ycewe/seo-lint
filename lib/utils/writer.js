"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _enums = require("../config/enums");

var _errors = require("../config/errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Writer {
  /**
   * Write any given data into an output
   *
   * @static
   * @param {string} data
   * @param {string | stream} outputOption
   * @memberof Writer
   */
  static async write(data, outputOption) {
    if (_isString(outputOption)) {
      if (outputOption == _enums.OUTPUT.CONSOLE) {
        _writeToConsole(data);
      } else {
        await _writeStream(data, _fs.default.createWriteStream(outputOption));
      }
    } else if (_isWritableStream(outputOption)) {
      await _writeStream(data, outputOption);
    } else if (_isNotUndefined(outputOption)) {
      throw new Error(_errors.CONFIG_ERRORS.INVALID_OUTPUT);
    }
  }

} // private functions


function _isString(outputType) {
  return typeof outputType == 'string';
}

function _isNotUndefined(outputType) {
  return typeof outputType != 'undefined';
}

function _isWritableStream(outputType) {
  return outputType?.writable !== false && typeof outputType?._write === 'function' && typeof outputType?._writableState === 'object';
}

function _writeStream(data, stream) {
  return new Promise((resolve, reject) => {
    stream.write(data, 'utf-8');
    stream.end();
    stream.on('finish', () => {
      resolve();
    });
    stream.on('error', error => {
      reject(error);
    });
  });
}

function _writeToConsole(data) {
  console.log(data);
}

var _default = Writer;
exports.default = _default;