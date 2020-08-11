import fs from 'fs'
import Loader from '@/utils/loader'
import { CONFIG_ERRORS } from '@/config/errors'

describe('loader.js', () => {
  describe('load()', () => {
    describe('when a file path to a html is given', () => {
      const input = `${__dirname}/../__fixtures__/html/success.html`

      it('should return a valid html object', async () => {
        expect(await Loader.load(input)).toEqual(expect.any(Object))
      })
    })

    describe('when a stream input is given', () => {
      const input = fs.createReadStream(
        `${__dirname}/../__fixtures__/html/success.html`
      )

      it('should return a valid html object', async () => {
        expect(await Loader.load(input)).toEqual(expect.any(Object))
      })
    })

    describe('when a file path to an empty html is given', () => {
      const input = `${__dirname}/../__fixtures__/html/empty.html`

      it('should return a valid html object', async () => {
        await expect(Loader.load(input)).rejects.toThrowError(
          new Error(CONFIG_ERRORS.EMPTY_HTML)
        )
      })
    })

    describe('when an invalid input is given', () => {
      it('should throw an invalid input error', async () => {
        await expect(Loader.load(null)).rejects.toThrowError(
          new Error(CONFIG_ERRORS.INVALID_INPUT)
        )
      })

      it('should throw an invalid input error', async () => {
        await expect(Loader.load(1234)).rejects.toThrowError(
          new Error(CONFIG_ERRORS.INVALID_INPUT)
        )
      })

      it('should throw a file not found error', async () => {
        // error is thrown by node fs stream on error
        await expect(Loader.load('./text.txt')).rejects.toThrowError(
          /no such file or directory/
        )
      })
    })
  })

  describe('parseHTML()', () => {
    it('should return a cheerio html object when give a string', () => {
      const html = '<p>html</p>'

      expect(Loader.parseHTML(html).html()).toBe(
        '<head></head><body><p>html</p></body>'
      )
    })
  })
})
