import { SRGB, SRGBA } from './color';
declare type Color = SRGB | SRGBA | string;
declare type ContrastRatio = number | 'aa' | 'aa-large' | 'aaa' | 'aaa-large';
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
declare function colorContrast(bg: Color, fg: Color[], targetRatio?: ContrastRatio, outputFormat?: 'hex'): string;
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
declare function colorContrast(bg: Color, fg: Color[], targetRatio?: ContrastRatio, outputFormat?: 'rgb'): string;
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
declare function colorContrast(bg: Color, fg: Color[], targetRatio?: ContrastRatio, outputFormat?: 'hsl'): string;
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
declare function colorContrast(bg: Color, fg: Color[], targetRatio?: ContrastRatio, outputFormat?: 'rgb-array'): SRGB;
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
declare function colorContrast(bg: Color, fg: Color[], targetRatio?: ContrastRatio, outputFormat?: 'hsl-array'): [h: number, s: number, l: number];
export default colorContrast;
