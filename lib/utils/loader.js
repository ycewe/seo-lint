"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _cheerio = _interopRequireDefault(require("cheerio"));

var _errors = require("../config/errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Loader {
  /**
   * Loads a HTML file or stream
   *
   * @static
   * @param {string | stream} input
   * @return {Promise}
   * @memberof Loader
   */
  static async load(input) {
    if (_isString(input)) {
      // create stream to minimize memory costs
      // https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback
      return await _readStream(_fs.default.createReadStream(input));
    } else if (_isReadableStream(input)) {
      return await _readStream(input);
    } else {
      throw new Error(_errors.CONFIG_ERRORS.INVALID_INPUT);
    }
  }
  /**
   * Parse a given HTML into a cheerio HTMl object
   *
   * @static
   * @param {string} html
   * @return {Object} cheerio html object
   * @memberof Loader
   */


  static parseHTML(html) {
    const $ = _cheerio.default.load(html);

    return $('html');
  }

} // private functions


function _isString(input) {
  return typeof input == 'string';
}

function _isReadableStream(input) {
  return input?.readable !== false && typeof input?._read == 'function' && typeof input?._readableState == 'object';
}

function _readStream(stream) {
  return new Promise((resolve, reject) => {
    let isFileEmpty = true;
    stream.on('data', data => {
      isFileEmpty = false;
      resolve(Loader.parseHTML(data));
    });
    stream.on('error', error => {
      isFileEmpty = false;
      reject(error);
    });
    stream.on('end', () => {
      isFileEmpty && reject(new Error(_errors.CONFIG_ERRORS.EMPTY_HTML));
    });
  });
}

var _default = Loader;
exports.default = _default;