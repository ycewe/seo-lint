const RULE_ERRORS = {
  MISSING_ATTR: (count, tags, attr) =>
    `This HTML has ${count} <${tags}> tag without ${attr} attribute.`,
  MISSING_ATTR_WITH_VALUE: (count, tags, attr, value) =>
    `This HTML has ${count} <${tags}> tag without ${attr} attribute with "${value}".`,
  ABOVE_MAX: (max, tags) => `This HTML has more than ${max} <${tags}> tag.`,
  BELOW_MIN: (min, tags) => `This HTML has less than ${min} <${tags}> tag.`,
}

const CONFIG_ERRORS = {
  EMPTY_HTML: 'The HTML that you provided is empty.',
  INVALID_INPUT: 'Please provide a valid input.',
  INVALID_OUTPUT: 'Please provide a valid output.',
  INVALID_RULES:
    'The provided rules are invalid. Please refer to the README for an example.',
  INVALID_MIN_MAX:
    'Please provide a valid number for min/max rules and min has to be less than max.',
}

export { RULE_ERRORS, CONFIG_ERRORS }
