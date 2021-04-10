const plugin = require('tailwindcss/plugin')
const { asValue, nameClass } = require('tailwindcss/jit/pluginUtils')

const pseudoElementPlugin = plugin(
  function ({ addVariant, addUtilities, matchUtilities, theme, variants, e }) {
    const pseudoElements = ['before', 'after']
    const values = theme('pseudoContent')

    pseudoElements.forEach((el) => {
      addVariant(el, ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`${el}${separator}${className}`)}::${el}`
        })
      })
    })

    addUtilities(
      [
        Object.entries(values).map(([key, value]) => {
          return {
            [`.${e(`pseudo-content-${key}`)}`]: {
              content: `${value}`,
            },
          }
        }),
      ],
      variants(['before', 'after'])
    )

    if (typeof matchUtilities !== 'undefined') {
      matchUtilities({
        'pseudo-content': (modifier, { theme }) => {
          let value = asValue(modifier, theme['pseudoContent'])

          if (value === undefined) {
            return []
          }

          value = value.startsWith('attr(') ? value : `"${value.replaceAll("_", " ")}"`

          return { [nameClass('pseudo-content', modifier)]: { 'content': `${value}` } }
        },
      })
    }
  },
  {
    theme: {
      pseudoContent: {
        empty: '""',
        space: '" "',
        required: '"* required"',
        asterisk: '"*"',
        ampersand: '"&"',
        and: '"and"',
        'oxford-ampersand': '", &"',
        'oxford-and': '", and"',
        comma: '","',
        middot: '"\\b7"',
        mdash: '"\\2014"',
        bar: '"|"',
        gt: '">"',
        lt: '"<"',
        both: 'attr(data-pseudo-content-both)',
        before: 'attr(data-pseudo-content-before)',
        after: 'attr(data-pseudo-content-after)'
      }
    },
    variants: {
      before: ['responsive'],
      after: ['responsive'],
    },
  }
)

module.exports = pseudoElementPlugin