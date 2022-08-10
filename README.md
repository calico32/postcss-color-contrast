# postcss-color-contrast

This very WIP PostCSS plugin implements a polyfill for the `color-contrast()` function, part of the extremely new [CSS Color Module Level 6](https://drafts.csswg.org/css-color-6) spec.

This plugin only supports literal colors (i.e. hex, `rgb()`, `hsl()`) and does not support `var()` or `calc()` expressions, and therefore must be placed near the end of the PostCSS chain.
