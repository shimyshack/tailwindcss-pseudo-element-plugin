# @shimyshack/tailwindcss-pseudo-element-plugin

A plugin that provides `before` and `after` variants as well as `pseudo-content-{value}` utility classes to Tailwind CSS.


## Installation

Install the plugin from npm:

```sh
# Using npm
npm install @shimyshack/tailwindcss-pseudo-element-plugin

# Using Yarn
yarn add @shimyshack/tailwindcss-pseudo-element-plugin
```

Then add the plugin to your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('@shimyshack/tailwindcss-pseudo-element-plugin'),
    // ...
  ],
}
```

## Usage

Use the `before` and `after` variants to style the `::before` and `::after` pseudo elements.

Use the `pseudo-content-{value}` utilities to specify the content of the pseudo element::

```html
<label
  class="after:inline-block after:text-red-500 after:text-xs after:ml-1 after:font-bold after:pseudo-content-asterisk xl:after:pseudo-content-required"
>
  Field Name
</label>
```

You can even use your own custom content. Spaces must be underscore characters:

```html
<div class="before:block before:bg-red-500 before:psuedo-content-[Whatever_you_want_to_say]">
  ...
</div>
```

## Configuration

You can configure which values are generated by using the `pseudoContent` key and you can configure which variants are generated by this plugin under the `before` and `after` keys in your `tailwind.config.js` file.:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      pseudoContent: {
        empty: '',
        space: ' ',
        asterisk: '*',
        required: 'required',
      }
    }
  },
  variants: {
    before: ['responsive', 'hover'],
    after: ['responsive', 'hover']
  }
}
```