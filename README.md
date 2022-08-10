# postcss-color-contrast

This very WIP PostCSS plugin implements a polyfill for the `color-contrast()` function, part of the extremely new [CSS Color Module Level 6](https://drafts.csswg.org/css-color-6) spec.

This plugin only supports literal colors (i.e. hex, `rgb()`, `hsl()`) and does not support `var()` or `calc()` expressions, and therefore must be placed near the end of the PostCSS chain.

## Examples

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

![](./image/black.png)

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
    "pick the first color
    that meets the target 
    contrast ratio"
  */
  color: #065f46; /* 5.41:1 */
}
```

</td>
<td>

![](./image/green.png)

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

![](./image/orange.png)

</td>
</tr>
