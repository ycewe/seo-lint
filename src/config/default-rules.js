import { RULES } from './enums'

export default [
  {
    tag: 'img',
    attributes: [
      {
        name: 'alt',
        min: RULES.MUST_BE_ALL,
      },
    ],
  },
  {
    tag: 'a',
    attributes: [
      {
        name: 'rel',
        min: RULES.MUST_BE_ALL,
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
