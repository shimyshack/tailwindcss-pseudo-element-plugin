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

    const getContentValue = (value) => {
      const val = `"${value}"`
      return val
    }

    addUtilities(
      [
        Object.entries(values).map(([key, value]) => {
          return {
            [`.${e(`pseudo-content-${key}`)}`]: {
              content: `${getContentValue(value)}`,
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

          return { [nameClass('pseudo-content', modifier)]: { 'content': `${getContentValue(value)}` } }
        },
      })
    }
  },
  {
    theme: {
      pseudoContent: {
        empty: '',
        space: ' ',
        required: '* required',
        asterisk: '*',
        ampersand: '&',
        and: 'and',
        'oxford-ampersand': ', &',
        'oxford-and': ', and',
        comma: ',',
        middot: '\\b7',
        mdash: '\\2014',
        bar: '|',
      }
    },
    variants: {
      before: ['responsive'],
      after: ['responsive'],
    },
  }
)

module.exports = pseudoElementPlugin