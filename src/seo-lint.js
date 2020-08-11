import Loader from './utils/loader'
import Validator from './utils/validator'
import Writer from './utils/writer'
import defaultRules from './config/default-rules'

class SEOLint {
  constructor(options) {
    this.errors = []
    this.options = options
    this.validator = new Validator(this.options?.rules ?? defaultRules)
  }

  async lint(input) {
  async lint(input, output) {
    const $ = await Loader.load(input)

    // remove any repeated errors can could have been generated
    // due to repeated tags/attributes
    this.errors = new Set(this.validator.validate($))

    await Writer.write(this._errorsToString(), output ?? this.options?.output)

    return this._errorsToString()
  }

  // private methods

  _errorsToString() {
    return [...this.errors].join('\n')
  }
}

export default SEOLint
