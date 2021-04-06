const plugin = require('tailwindcss/plugin')
const { asValue, nameClass } = require('tailwindcss/jit/pluginUtils')

const pseudoElementPlugin = plugin(
  function ({ addVariant, addUtilities, matchUtilities, theme, variants, e }) {
    const values = theme('pseudoContent')

    addVariant('before', ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `.${e(`before${separator}${className}`)}::before`
      })
    })

    addVariant('after', ({ modifySelectors, separator }) => {
      modifySelectors(({ className }) => {
        return `.${e(`after${separator}${className}`)}::after`
      })
    })

    addUtilities(
      [
        Object.entries(values).map(([key, value]) => {
          return {
            [`.${e(`pseudo-content-${key}`)}`]: {
              content: `"${value}"`,
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

          return { [nameClass('pseudo-content', modifier)]: { 'content': `"${value.replaceAll('_', ' ')}"` } }
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
        asterisk: '*'
      }
    },
    variants: {
      before: ['responsive'],
      after: ['responsive'],
    },
  }
)

module.exports = pseudoElementPlugin