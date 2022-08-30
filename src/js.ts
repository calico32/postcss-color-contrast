import valueParser from 'postcss-value-parser'
import { normalizeSRGB, SRGB, SRGBA } from './color'
import { colorContrast as cssColorContrast, contrastKeywords } from './contrast'
import { parseCssColor } from './css-color'

type Color = SRGB | SRGBA | string
type ContrastRatio = number | 'aa' | 'aa-large' | 'aaa' | 'aaa-large'

/**
 * `colorContrast()` selects the most contrasting color to a given color from a
 * list.
 *
 * **hex output**: returns a string in the form `#RRGGBB`
 *
 * From the [CSS Color Module Level
 * 6](https://drafts.csswg.org/css-color-6/#colorcontrast) spec:
 *
 * > This function takes, firstly, a single color (typically a background, but
 * not necessarily), secondly, a list of two or more colors, and thirdly, an
 * optional target [luminance
 * contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum).
 *
 * > It returns the first color in the list to meet or exceed the specified
 * target contrast or, if no target is given, the color in the list with the
 * greatest contrast.
 *
 * @param bg the single color to contrast against
 * @param fg the list of colors to choose from
 * @param targetRatio the target contrast ratio, as a number (1-21) or a string
 * (aa, aa-large, aaa, aaa-large)
 * @param outputFormat the output format, as a string (hex, rgb-array, rgb,
 * hsl-array, hsl)
 * @returns the resulting color (described above), in the specified format
 */
function colorContrast(
  bg: Color,
  fg: Color[],
  targetRatio?: ContrastRatio,
  outputFormat?: 'hex'
): string
/**
 * `colorContrast()` selects the most contrasting color to a given color from a
 * list.
 *
 * **rgb output**: returns a string in the form `rgb(r, g, b)`
 *
 * From the [CSS Color Module Level
 * 6](https://drafts.csswg.org/css-color-6/#colorcontrast) spec:
 *
 * > This function takes, firstly, a single color (typically a background, but
 * not necessarily), secondly, a list of two or more colors, and thirdly, an
 * optional target [luminance
 * contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum).
 *
 * > It returns the first color in the list to meet or exceed the specified
 * target contrast or, if no target is given, the color in the list with the
 * greatest contrast.
 *
 * @param bg the single color to contrast against
 * @param fg the list of colors to choose from
 * @param targetRatio the target contrast ratio, as a number (1-21) or a string
 * (aa, aa-large, aaa, aaa-large)
 * @param outputFormat the output format, as a string (hex, rgb-array, rgb,
 * hsl-array, hsl)
 * @returns the resulting color (described above), in the specified format
 */
function colorContrast(
  bg: Color,
  fg: Color[],
  targetRatio?: ContrastRatio,
  outputFormat?: 'rgb'
): string
/**
 * `colorContrast()` selects the most contrasting color to a given color from a
 * list.
 *
 * **hsl output**: returns a string in the form `hsl(h, s%, l%)`, where h, s,
 * and l are rounded to the nearest integer
 *
 * From the [CSS Color Module Level
 * 6](https://drafts.csswg.org/css-color-6/#colorcontrast) spec:
 *
 * > This function takes, firstly, a single color (typically a background, but
 * not necessarily), secondly, a list of two or more colors, and thirdly, an
 * optional target [luminance
 * contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum).
 *
 * > It returns the first color in the list to meet or exceed the specified
 * target contrast or, if no target is given, the color in the list with the
 * greatest contrast.
 *
 * @param bg the single color to contrast against
 * @param fg the list of colors to choose from
 * @param targetRatio the target contrast ratio, as a number (1-21) or a string
 * (aa, aa-large, aaa, aaa-large)
 * @param outputFormat the output format, as a string (hex, rgb-array, rgb,
 * hsl-array, hsl)
 * @returns the resulting color (described above), in the specified format
 */
function colorContrast(
  bg: Color,
  fg: Color[],
  targetRatio?: ContrastRatio,
  outputFormat?: 'hsl'
): string
/**
 * `colorContrast()` selects the most contrasting color to a given color from a
 * list.
 *
 * **rgb-array output**: returns an array of three numbers in the form `[r, g,
 * b]`, where r, g, and b are integers in the range [0, 255]
 *
 * From the [CSS Color Module Level
 * 6](https://drafts.csswg.org/css-color-6/#colorcontrast) spec:
 *
 * > This function takes, firstly, a single color (typically a background, but
 * not necessarily), secondly, a list of two or more colors, and thirdly, an
 * optional target [luminance
 * contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum).
 *
 * > It returns the first color in the list to meet or exceed the specified
 * target contrast or, if no target is given, the color in the list with the
 * greatest contrast.
 *
 * @param bg the single color to contrast against
 * @param fg the list of colors to choose from
 * @param targetRatio the target contrast ratio, as a number (1-21) or a string
 * (aa, aa-large, aaa, aaa-large)
 * @param outputFormat the output format, as a string (hex, rgb-array, rgb,
 * hsl-array, hsl)
 * @returns the resulting color (described above), in the specified format
 */
function colorContrast(
  bg: Color,
  fg: Color[],
  targetRatio?: ContrastRatio,
  outputFormat?: 'rgb-array'
): SRGB
/**
 * `colorContrast()` selects the most contrasting color to a given color from a
 * list.
 *
 * **hsl-array output**: returns an array of three numbers in the form `[h, s,
 * l]`, where h, s, and l are floating point numbers **(not rounded)** in the
 * range [0, 360), [0, 1], and [0, 1] respectively
 *
 * From the [CSS Color Module Level
 * 6](https://drafts.csswg.org/css-color-6/#colorcontrast) spec:
 *
 * > This function takes, firstly, a single color (typically a background, but
 * not necessarily), secondly, a list of two or more colors, and thirdly, an
 * optional target [luminance
 * contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum).
 *
 * > It returns the first color in the list to meet or exceed the specified
 * target contrast or, if no target is given, the color in the list with the
 * greatest contrast.
 *
 * @param bg the single color to contrast against
 * @param fg the list of colors to choose from
 * @param targetRatio the target contrast ratio, as a number (1-21) or a string
 * (aa, aa-large, aaa, aaa-large)
 * @param outputFormat the output format, as a string (hex, rgb-array, rgb,
 * hsl-array, hsl)
 * @returns the resulting color (described above), in the specified format
 */
function colorContrast(
  bg: Color,
  fg: Color[],
  targetRatio?: ContrastRatio,
  outputFormat?: 'hsl-array'
): [h: number, s: number, l: number]
/**
 * `colorContrast()` selects the most contrasting color to a given color from a
 * list.
 *
 * From the [CSS Color Module Level
 * 6](https://drafts.csswg.org/css-color-6/#colorcontrast) spec:
 *
 * > This function takes, firstly, a single color (typically a background, but
 * not necessarily), secondly, a list of two or more colors, and thirdly, an
 * optional target [luminance
 * contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum).
 *
 * > It returns the first color in the list to meet or exceed the specified
 * target contrast or, if no target is given, the color in the list with the
 * greatest contrast.
 *
 * @param bg the single color to contrast against
 * @param fg the list of colors to choose from
 * @param targetRatio the target contrast ratio, as a number (1-21) or a string
 * (aa, aa-large, aaa, aaa-large)
 * @param outputFormat the output format, as a string (hex, rgb-array, rgb,
 * hsl-array, hsl)
 * @returns the resulting color (described above), in the specified format
 */
function colorContrast(
  bg: Color,
  fg: Color[],
  targetRatio?: ContrastRatio,
  outputFormat: 'hex' | 'rgb-array' | 'rgb' | 'hsl-array' | 'hsl' = 'hex'
): string | SRGB | [h: number, s: number, l: number] {
  const processColor = (color: Color): SRGB => {
    let output: SRGBA | null
    if (typeof color === 'string') {
      const value = valueParser(color).nodes
      if (value.length !== 1) {
        throw new Error('invalid color')
      }
      output = parseCssColor(value[0])
    } else {
      output = color.length === 3 ? [color[0], color[1], color[2], 1] : color
    }

    if (!output) {
      throw new Error('invalid color')
    }

    if (output[3] !== 1) {
      throw new Error('transparent colors are not supported')
    }

    return [output[0], output[1], output[2]]
  }

  if (fg.length < 2) {
    throw new Error('at least two fg colors are required')
  }

  const bgColor = processColor(bg)
  const fgColors = fg.map(processColor)

  let targetRatioNumber
  if (targetRatio) {
    if (typeof targetRatio === 'string') {
      targetRatioNumber = contrastKeywords[targetRatio]
      if (!targetRatioNumber) {
        throw new Error(`invalid contrast ratio: ${targetRatio}`)
      }
    } else {
      targetRatioNumber = targetRatio
    }
  }

  const color = cssColorContrast(bgColor, fgColors, targetRatioNumber)

  switch (outputFormat) {
    case 'hex':
      return `#${color.map((c) => Math.round(c).toString(16).padStart(2, '0')).join('')}`
    case 'rgb-array':
      return color
    case 'rgb':
      return `rgb(${color.map((c) => Math.round(c)).join(', ')})`
    case 'hsl-array':
      return rgbToHsl(...normalizeSRGB(color))
    case 'hsl': {
      const [h, s, l] = rgbToHsl(...normalizeSRGB(color))
      return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
    }
  }
}

export default colorContrast

/** in: r, g, b in [0,1]; out: h in [0,360) and s,l in [0,1] */
function rgbToHsl(r: number, g: number, b: number): [h: number, s: number, l: number] {
  let v = Math.max(r, g, b),
    c = v - Math.min(r, g, b),
    f = 1 - Math.abs(v + v - c - 1)
  let h = c && (v == r ? (g - b) / c : v == g ? 2 + (b - r) / c : 4 + (r - g) / c)
  return [60 * (h < 0 ? h + 6 : h), f ? c / f : 0, (v + v - c) / 2]
}
