import fs from 'fs'
import cheerio from 'cheerio'
import { CONFIG_ERRORS } from '../config/errors'

class Loader {
  static async load(input) {
    if (_isString(input)) {
      // create stream to minimize memory costs
      // https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback
      return await _readStream(fs.createReadStream(input))
    } else if (_isReadableStream(input)) {
      return await _readStream(input)
    } else {
      throw new Error(CONFIG_ERRORS.INVALID_INPUT)
    }
  }

  static parseHTML(html) {
    const $ = cheerio.load(html)

    return $('html')
  }
}

// private functions

function _isString(input) {
  return typeof input == 'string'
}

function _isReadableStream(input) {
  return (
    input?.readable !== false &&
    typeof input?._read == 'function' &&
    typeof input?._readableState == 'object'
  )
}

function _readStream(stream) {
  return new Promise((resolve, reject) => {
    let isFileEmpty = true

    stream.on('data', (data) => {
      isFileEmpty = false

      resolve(Loader.parseHTML(data))
    })

    stream.on('error', (error) => {
      isFileEmpty = false

      reject(error)
    })

    stream.on('end', () => {
      isFileEmpty && reject(new Error(CONFIG_ERRORS.EMPTY_HTML))
    })
  })
}

export default Loader
