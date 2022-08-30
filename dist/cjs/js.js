"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postcss_value_parser_1 = __importDefault(require("postcss-value-parser"));
const color_1 = require("./color");
const contrast_1 = require("./contrast");
const css_color_1 = require("./css-color");
function colorContrast(bg, fg, targetRatio, outputFormat = 'hex') {
    const processColor = (color) => {
        let output;
        if (typeof color === 'string') {
            const value = (0, postcss_value_parser_1.default)(color).nodes;
            if (value.length !== 1) {
                throw new Error('invalid color');
            }
            output = (0, css_color_1.parseCssColor)(value[0]);
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
            targetRatioNumber = contrast_1.contrastKeywords[targetRatio];
            if (!targetRatioNumber) {
                throw new Error(`invalid contrast ratio: ${targetRatio}`);
            }
        }
        else {
            targetRatioNumber = targetRatio;
        }
    }
    const color = (0, contrast_1.colorContrast)(bgColor, fgColors, targetRatioNumber);
    switch (outputFormat) {
        case 'hex':
            return `#${color.map((c) => Math.round(c).toString(16).padStart(2, '0')).join('')}`;
        case 'rgb-array':
            return color;
        case 'rgb':
            return `rgb(${color.map((c) => Math.round(c)).join(', ')})`;
        case 'hsl-array':
            return rgbToHsl(...(0, color_1.normalizeSRGB)(color));
        case 'hsl': {
            const [h, s, l] = rgbToHsl(...(0, color_1.normalizeSRGB)(color));
            return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
        }
    }
}
exports.default = colorContrast;
/** in: r, g, b in [0,1]; out: h in [0,360) and s,l in [0,1] */
function rgbToHsl(r, g, b) {
    let v = Math.max(r, g, b), c = v - Math.min(r, g, b), f = 1 - Math.abs(v + v - c - 1);
    let h = c && (v == r ? (g - b) / c : v == g ? 2 + (b - r) / c : 4 + (r - g) / c);
    return [60 * (h < 0 ? h + 6 : h), f ? c / f : 0, (v + v - c) / 2];
}
//# sourceMappingURL=js.js.map