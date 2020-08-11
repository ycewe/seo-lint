import fs from 'fs'
import Writer from '@/utils/writer'
import { OUTPUT } from '@/config/enums'
import { CONFIG_ERRORS } from '@/config/errors'

describe('writer.js', () => {
  describe('write()', () => {
    describe('when a valid output type is provided', () => {
      describe('when it`s "console"', () => {
        const output = 'console'

        it('should print output on console', async () => {
          global.console.log = jest.fn()

          await Writer.write(output, OUTPUT.CONSOLE)

          expect(global.console.log).toHaveBeenCalledTimes(1)
          expect(global.console.log).toHaveBeenCalledWith(output)
        })
      })

      describe('when it`s a writable stream', () => {
        const output = 'writable stream'
        const filePath = `${__dirname}/../__output__/writer-writable-stream.txt`

        it('should return output to a file', async () => {
          await Writer.write(output, fs.createWriteStream(filePath))

          fs.readFile(filePath, 'utf8', (_, data) => {
            expect(data).toBe(output)
          })
        })
      })

      describe('when it`s a file path', () => {
        const output = 'file path'
        const filePath = `${__dirname}/../__output__/writer-file-path.txt`

        it('should return output to a file', async () => {
          await Writer.write(output, filePath)

          fs.readFile(filePath, 'utf8', (_, data) => {
            expect(data).toBe(output)
          })
        })
      })
    })

    describe('when an invalid output type is provided', () => {
      const output = 'invalid'

      it('should throw an invalid output error', async () => {
        await expect(Writer.write(output, {})).rejects.toThrowError(
          new Error(CONFIG_ERRORS.INVALID_OUTPUT)
        )
      })

      it('should throw an invalid output error', async () => {
        await expect(Writer.write(output, null)).rejects.toThrowError(
          new Error(CONFIG_ERRORS.INVALID_OUTPUT)
        )
      })

      it('should throw a file not found error', async () => {
        // error is thrown by node fs stream on error
        await expect(Writer.write('output', '')).rejects.toThrowError(
          /no such file or directory/
        )
      })
    })

    describe('when no output type is provided', () => {
      const output = 'valid'

      it('should not return any output', async () => {
        await expect(Writer.write(output)).resolves.not.toThrowError()
      })
    })
  })
})
