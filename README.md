# postcss-color-contrast

<p>
  <img src="https://img.shields.io/npm/v/postcss-color-contrast">
  <img src="https://img.shields.io/bundlephobia/min/postcss-color-contrast">
</p>

This very WIP PostCSS plugin implements a polyfill for the `color-contrast()` function, part of the extremely new [CSS Color Module Level 6](https://drafts.csswg.org/css-color-6) spec.

Because the color is computed at compile-time, this plugin only supports literal colors (i.e. hex, `rgb()`, `hsl()`) and does not support `var()` or `calc()` expressions, `currentColor`, etc., and therefore must be placed near the end of the PostCSS chain.

No guarantees are made about the spec-compliance of this plugin, but I tried my best.

## TL;DR Spec behavior

### Syntax

```css
selector {
  color: color-contrast(<color> vs <color>, <color>[, ...] [to <number> | AA | AA-large | AAA | AAA-large]);
}
```

I'll call the first color the "background", the list of colors the "foreground" colors, and the number/keyword the "target ratio".

### Semantics

**No target ratio: `color-contrast(<color> vs <color>, <color>[, ...])`**

- The foreground color that has the highest contrast ratio with the background color is used.

**Target ratio: `color-contrast(<color> vs <color>, <color>[, ...] to <number> | AA | AA-large | AAA | AAA-large)`**

- The first foreground color in the list that has a contrast ratio greater than or equal to the target ratio is used.
- AA-large is the same as `3`.
- AA is the same as `4.5`.
- AAA-large is the same as `4.5`.
- AAA is the same as `7`.

## Usage

```sh
npm install --save-dev postcss-color-contrast
yarn add -D postcss-color-contrast
```

In your `postcss.config.js` file:

```js
module.exports = {
  plugins: [
    require('postcss-color-contrast'),
  ],
};
```

Or programmatically:

```js
const postcss = require('postcss')

postcss([
  // ... other plugins here
  require('postcss-color-contrast'),
  // ... maybe more plugins here
]).process(css)
```

## Examples

*Arguments to `color-contrast()` wrapped onto multiple lines for clarity.*

<table>
<tr><th>Input</th><th>Output</th><th>Image</th></tr>
<tr>
<td>

```css
.container {
  background-color: #0f172a;
  color: color-contrast(
    #0f172a vs 
    #e5e5e5, #171717
  );
}
```

</td>
<td>

```css
.container {
  background-color: #0f172a;
  /*
    picks the color in the list 
    (after "vs") that has the
    highest contrast ratio with
    the first color
  */
  color: #e5e5e5;
}
```

</td>
<td>

![](./img/black.png)

</td>
</tr>
<tr>
<td>

```css
.container {
  background-color: #6ee7b7;
  color: color-contrast(
    #6ee7b7 vs 
    #ecfdf5, #d1fae5,
    #a7f3d0, #6ee7b7,
    #34d399, #10b981,
    #059669, #047857,
    #065f46, #064e3b 
    to AA
  );
}
```

</td>
<td>

```css
.container {
  background-color: #6ee7b7;
  /*
    with a target contrast:
    picks the first color
    that meets or exceeds 
    the target contrast ratio
  */
  color: #065f46; /* 5.41:1 */
}
```

</td>
<td>

![](./img/green.png)

</td>
</tr>
<tr>
<td>

```css
.container {
  background-color: #c2410c;
  color: color-contrast(
    #c2410c vs 
    #e5e5e5, #171717 
    to AA
  );
}
```

</td>

<td>

```css
.container {
  background-color: #c2410c;
  /* 
    defaults to black or white 
    if the target contrast cannot 
    be met with the provided colors 
  */
  color: #fff;
}
```

</td>

<td>

![](./img/orange.png)

</td>
</tr>
