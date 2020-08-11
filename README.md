# SEOLint
[![codecov](https://codecov.io/gh/ycewe/seo-lint/branch/master/graph/badge.svg)](https://codecov.io/gh/ycewe/seo-lint)
[![CircleCI](https://circleci.com/gh/ycewe/seo-lint.svg?style=shield&circle-token=f551e1a62352d8121065cbb49fe41d4b5b696188)]()

SEOLint is a tool for identifying SEO defects in any given HTML file.

## Installation
Prequisites: NodeJS >= v14.6.0

You can install SEOLint using npm:
```bash
$ npm install seo-lint
```

## Usage
You can see our default configuration [here](https://github.com/lucduong/seo-linter/#configs).

A basic example when used in code:
```js
import SEOLint from `seo-lint`

(async function main() {
  const seolint = new SEOLint()

  const results = await seolint.lint('path/to/html')
})().catch((error) => {
  console.error(error)
})
```

You may also provide SEO rules of your own choosing with:
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

## Configuration
The configuration provided has to be an array of objects. Each object must have a tag property.

Our default configuration is:
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


