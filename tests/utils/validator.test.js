import cheerio from 'cheerio'
import Validator from '@/utils/validator'
import { CONFIG_ERRORS } from '@/config/errors'

describe('validator.js', () => {
  describe('constructor()', () => {
    describe('when invalid rules are provided', () => {
      it('should throw an invalid rule error', () => {
        const subject = () => new Validator('rules')

        expect(subject).toThrowError(new Error(CONFIG_ERRORS.INVALID_RULES))
      })

      it('should throw an invalid rule error', () => {
        const subject = () => new Validator({})

        expect(subject).toThrowError(new Error(CONFIG_ERRORS.INVALID_RULES))
      })

      it('should throw an invalid rule error', () => {
        const subject = () => new Validator()

        expect(subject).toThrowError(new Error(CONFIG_ERRORS.INVALID_RULES))
      })
    })

    describe('when valid rules are provided', () => {
      it('should return a valid instance', () => {
        const subject = () => new Validator([])

        expect(subject).not.toThrowError()
      })
    })
  })

  describe('validate()', () => {
    const $ = cheerio.load(
      '<div><img /><a rel="noopener"><img /></a><a></a></div>'
    )

    describe('when tag max and/or min are provided', () => {
      it('should return an error when max is not obeyed', () => {
        const subject = new Validator([
          {
            tag: 'a',
            max: 1,
          },
        ])

        expect(subject.validate($('html'))).toEqual([
          'This HTML has more than 1 <a> tag.',
        ])
      })

      it('should return an error when min is not obeyed', () => {
        const subject = new Validator([
          {
            tag: 'a',
            min: 3,
          },
        ])

        expect(subject.validate($('html'))).toEqual([
          'This HTML has less than 3 <a> tag.',
        ])
      })

      it('should return an error when the min is not a number', () => {
        const subject = new Validator([
          {
            tag: 'a',
            min: 'a',
          },
        ])

        expect(subject.validate($('html'))).toEqual([
          CONFIG_ERRORS.INVALID_MIN_MAX,
        ])
      })

      it('should return an error when the min is more than max', () => {
        const subject = new Validator([
          {
            tag: 'a',
            min: 3,
            max: 1,
          },
        ])

        expect(subject.validate($('html'))).toEqual([
          CONFIG_ERRORS.INVALID_MIN_MAX,
        ])
      })

      it('should return empty array when the rules are valid and obeyed', () => {
        const subject = new Validator([
          {
            tag: 'a',
            min: '2',
          },
        ])

        expect(subject.validate($('html'))).toEqual([])
      })

      it('should return empty array when the rules are valid and obeyed', () => {
        const subject = new Validator([
          {
            tag: 'a',
            min: 2,
          },
        ])

        expect(subject.validate($('html'))).toEqual([])
      })

      it('should return empty array when the rules are valid and obeyed', () => {
        const subject = new Validator([
          {
            tag: 'a',
            min: 1,
            max: -1,
          },
        ])

        expect(subject.validate($('html'))).toEqual([])
      })
    })

    describe('when tag children are provided', () => {
      it('should return an error if the child do not obey the rules', () => {
        const subject = new Validator([
          {
            tag: 'a',
            children: [
              {
                tag: 'img',
                max: 0,
              },
            ],
          },
        ])

        expect(subject.validate($('html'))).toEqual([
          'This HTML has more than 0 <a>img> tag.',
        ])
      })

      it('should return empty array when the rules are valid and obeyed', () => {
        const subject = new Validator([
          {
            tag: 'a',
            children: [
              {
                tag: 'img',
                max: 1,
              },
            ],
          },
        ])

        // <img> in div is not affected
        expect(subject.validate($('html'))).toEqual([])
      })
    })

    describe('when tag attributes are provided', () => {
      it('should return an error when value is not obeyed', () => {
        const subject = new Validator([
          {
            tag: 'a',
            attributes: [
              {
                name: 'rel',
                value: 'noreferrer',
              },
            ],
          },
        ])

        expect(subject.validate($('html'))).toEqual([
          'This HTML has 1 <a> tag without rel attribute with "noreferrer".',
        ])
      })

      it('should return an error when min is not obeyed', () => {
        const subject = new Validator([
          {
            tag: 'a',
            attributes: [
              {
                name: 'rel',
                value: 'noopener',
                min: 2,
              },
            ],
          },
        ])

        expect(subject.validate($('html'))).toEqual([
          'This HTML has 1 <a> tag without rel attribute with "noopener".',
        ])
      })

      it('should return empty array when the rules are valid and obeyed', () => {
        const subject = new Validator([
          {
            tag: 'a',
            attributes: [
              {
                name: 'rel',
                value: 'noopener',
                min: 1,
              },
            ],
          },
        ])

        expect(subject.validate($('html'))).toEqual([])
      })
    })
  })
})
