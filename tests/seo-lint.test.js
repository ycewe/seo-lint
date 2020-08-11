import fs from 'fs'
import SEOLint from '@/seo-lint'

describe('seo-lint.js', () => {
  describe('lint()', () => {
    const failureHTMLOutput =
      'This HTML has 2 <img> tag without alt attribute.\n' +
      'This HTML has 1 <a> tag without rel attribute.\n' +
      'This HTML has less than 1 <head>title> tag.\n' +
      'This HTML has 1 <head>meta> tag without name attribute with "description".\n' +
      'This HTML has 1 <head>meta> tag without name attribute with "keywords".\n' +
      'This HTML has more than 15 <strong> tag.\n' +
      'This HTML has more than 1 <h1> tag.'

    describe('when file input is provided', () => {
      describe('when the default rules are used', () => {
        describe('when no output is provided to the instance', () => {
          const subject = new SEOLint()

          it('should return an empty array when the rules are obeyed ', async () => {
            expect(
              await subject.lint(`${__dirname}/__fixtures__/html/success.html`)
            ).toBe('')
          })

          it('should return errors when the rules are violated', async () => {
            expect(
              await subject.lint(`${__dirname}/__fixtures__/html/failure.html`)
            ).toBe(failureHTMLOutput)
          })

          describe('when a "console" output is provide to lint()', () => {
            global.console.log = jest.fn()

            it('should return errors when the rules are violated to "console"', async () => {
              await subject.lint(
                `${__dirname}/__fixtures__/html/failure.html`,
                'console'
              )

              expect(global.console.log).toHaveBeenCalledTimes(1)
              expect(global.console.log).toHaveBeenCalledWith(failureHTMLOutput)
            })
          })
        })

        describe('when a file path output is provided to the instance', () => {
          const output = `${__dirname}/__output__/seo-lint-file-path.txt`
          const subject = new SEOLint({ output })

          it('should print error onto a file', async () => {
            await subject.lint(`${__dirname}/__fixtures__/html/failure.html`)

            fs.readFile(output, 'utf8', (_, data) => {
              expect(data).toBe(failureHTMLOutput)
            })
          })

          describe('when a "console" output is provide to lint()', () => {
            global.console.log = jest.fn()

            it('should return errors when the rules are violated to "console"', async () => {
              await subject.lint(
                `${__dirname}/__fixtures__/html/failure.html`,
                'console'
              )

              expect(global.console.log).toHaveBeenCalledTimes(1)
              expect(global.console.log).toHaveBeenCalledWith(failureHTMLOutput)
            })
          })
        })

        describe('when a writable stream output is provided to the instance', () => {
          const output = `${__dirname}/__output__/seo-lint-writable-stream.txt`
          const subject = new SEOLint({ output: fs.createWriteStream(output) })

          it('should print output onto a file', async () => {
            await subject.lint(`${__dirname}/__fixtures__/html/failure.html`)

            fs.readFile(output, 'utf8', (_, data) => {
              expect(data).toBe(failureHTMLOutput)
            })
          })
        })

        describe('when a "console" output is provided to the instance', () => {
          const subject = new SEOLint({ output: 'console' })

          it('should print output to console', async () => {
            global.console.log = jest.fn()

            await subject.lint(`${__dirname}/__fixtures__/html/failure.html`)

            expect(global.console.log).toHaveBeenCalledTimes(1)
            expect(global.console.log).toHaveBeenCalledWith(failureHTMLOutput)
          })
        })
      })

      describe('when custom rules are provided', () => {
        const subject = new SEOLint({
          rules: [
            {
              tag: 'p',
              min: 2,
            },
          ],
        })

        it('should return an empty array when the rules are obeyed ', async () => {
          expect(
            await subject.lint(`${__dirname}/__fixtures__/html/success.html`)
          ).toBe('')
        })

        it('should return errors when the rules are violated', async () => {
          expect(
            await subject.lint(`${__dirname}/__fixtures__/html/failure.html`)
          ).toBe('This HTML has less than 2 <p> tag.')
        })
      })
    })

    describe('when a readable stream input is provided', () => {
      const subject = new SEOLint()

      it('should return errors when the rules are violated', async () => {
        expect(
          await subject.lint(
            fs.createReadStream(`${__dirname}/__fixtures__/html/failure.html`)
          )
        ).toBe(failureHTMLOutput)
      })
    })
  })
})
