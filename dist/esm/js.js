import valueParser from 'postcss-value-parser';
import { normalizeSRGB } from './color';
import { colorContrast as cssColorContrast, contrastKeywords } from './contrast';
import { parseCssColor } from './css-color';
function colorContrast(bg, fg, targetRatio, outputFormat = 'hex') {
    const processColor = (color) => {
        let output;
        if (typeof color === 'string') {
            const value = valueParser(color).nodes;
            if (value.length !== 1) {
                throw new Error('invalid color');
            }
            output = parseCssColor(value[0]);
        }
        else {
            output = color.length === 3 ? [color[0], color[1], color[2], 1] : color;
        }
        if (!output) {
            throw new Error('invalid color');
        }
        if (output[3] !== 1) {
            throw new Error('transparent colors are not supported');
        }
        return [output[0], output[1], output[2]];
    };
    const bgColor = processColor(bg);
    const fgColors = fg.map(processColor);
    let targetRatioNumber;
    if (targetRatio) {
        if (typeof targetRatio === 'string') {
            targetRatioNumber = contrastKeywords[targetRatio];
            if (!targetRatioNumber) {
                throw new Error(`invalid contrast ratio: ${targetRatio}`);
            }
        }
        else {
            targetRatioNumber = targetRatio;
        }
    }
    const color = cssColorContrast(bgColor, fgColors, targetRatioNumber);
    switch (outputFormat) {
        case 'hex':
            return `#${color.map((c) => Math.round(c).toString(16).padStart(2, '0')).join('')}`;
        case 'rgb-array':
            return color;
        case 'rgb':
            return `rgb(${color.map((c) => Math.round(c)).join(', ')})`;
        case 'hsl-array':
            return rgbToHsl(...normalizeSRGB(color));
        case 'hsl': {
            const [h, s, l] = rgbToHsl(...normalizeSRGB(color));
            return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
        }
    }
}
export default colorContrast;
/** in: r, g, b in [0,1]; out: h in [0,360) and s,l in [0,1] */
function rgbToHsl(r, g, b) {
    let v = Math.max(r, g, b), c = v - Math.min(r, g, b), f = 1 - Math.abs(v + v - c - 1);
    let h = c && (v == r ? (g - b) / c : v == g ? 2 + (b - r) / c : 4 + (r - g) / c);
    return [60 * (h < 0 ? h + 6 : h), f ? c / f : 0, (v + v - c) / 2];
}
//# sourceMappingURL=js.js.map