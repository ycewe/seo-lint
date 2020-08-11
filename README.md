# SEOLint
[![codecov](https://codecov.io/gh/ycewe/seo-lint/branch/master/graph/badge.svg?token=Z6OWHBIUC8)](https://codecov.io/gh/ycewe/seo-lint) [![CircleCI](https://circleci.com/gh/ycewe/seo-lint.svg?style=shield&circle-token=f551e1a62352d8121065cbb49fe41d4b5b696188)]()

SEOLint is a tool for identifying SEO defects in any given HTML file.

# Installation
Prequisites: NodeJS >= v14.6.0

You can install SEOLint using npm:
```bash
$ npm install seo-lint
```

# Usage
You can see our default configuration [here](https://github.com/lucduong/seo-linter/#configs).

A basic example when used in code:
```js
const { SEOLint } = require('seo-lint');
  
(async function main() {
  const seolint = new SEOLint();

  const results = await seolint.lint('index.html');

})().catch((error) => {
  console.error(error);
})
```
From above, results will store the validation outcome in the form of a string which you may log it or stream it into another file.

# Configuration
## Rules
The configuration provided has to be an array of objects. Each object has the following
| Options     | Description                             | Value                           |
| ---         | ---                                     | ---                             |
| tag         | Name of a HTML tag                      | string                          |
| min         | Minimum number of appearance (optional) | any positive integer, -1, 1, Infinity |
| max         | Maximum number of appearance (optional) | any positive integer, -1, 1, Infinity |
| attributes  | HTML tag attributes (optional)          | array of objects, [{}, {}, ... {}] |
| children    | Exact order of tag nesting (optional)   | array of objects, [{}, {}, ... {}] |
| name        | Attribute only. Name of the tag attribute   | string                      |
| value       | Attribute only. Value of the tag attribute  | string                      |

The numbers for min and max can mean the following:
* \>=`0`: The maximum or mimimum number of tag in the HTML document
* `-1`: Ignore the maximum or minimum amount (leaving it blank does the same)
* `Infinity`: Applies rule to all tag attributes. For tags (not attribute), it has the same effect as `-1`.

You may refer to our default configuration:
```js
[
  {
    tag: 'img',
    attributes: [
      {
        name: 'alt',
        min: Infinity,
      },
    ],
  },
  {
    tag: 'a',
    attributes: [
      {
        name: 'rel',
        min: Infinity,
      },
    ],
  },
  {
    tag: 'head',
    children: [
      {
        tag: 'title',
        min: 1,
      },
      {
        tag: 'meta',
        attributes: [
          {
            name: 'name',
            value: 'description',
            min: 1,
          },
        ],
      },
      {
        tag: 'meta',
        attributes: [
          {
            name: 'name',
            value: 'keywords',
            min: 1,
          },
        ],
      },
    ],
  },
  {
    tag: 'strong',
    max: 15,
  },
  {
    tag: 'h1',
    max: 1,
  },
]
```

You can overwrite the rules by providing your own SEO rules to the instance as a object property:
```js
  const seolint = new SEOLint({
    rules: [
      {
        tag: 'strong',
        max: 15
      }
    ]
  })
```

## Instance
```js
new SEOLint({ rules, output })
```

The instance accepts the following object properties:
| Options     | Description                     | Value |
| ---         | ---                             | ---   |
| rules       | An array of objects (optional). This will overwrite all the default rules. | array of objects, [{}, {}, ... {}]  |
| output      | Choice of output. Always returns error in code. Defaults to none. (optional)    | `console`, `/path/to/output.txt`, node writable stream  |

## Method
```js
await seoLint.lint(input, output)
```

The method accepts the following object properties:
| Options     | Description                     | Value |
| ---         | ---                             | ---   |
| input       | The HTML document to be linted  | `path/to/file.html`, node readable stream |
| output      | Choice of output. Always returns error in code. Defaults to none. This will always overwrite the instance output as it's for logging files separately (optional)    | `console`, `/path/to/output.txt`, node writable stream  |

# Development

This repository uses [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)

Each commit should follow the above convention.

For release, we use [standard version](https://github.com/conventional-changelog/standard-version) which is incorporated in:
```
npm run release
```

# License
Unlicensed
