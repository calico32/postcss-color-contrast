"use strict";
/**
 * Many functions taken from https://www.w3.org/TR/css-color-4/#color-conversion-code.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertXYZtoSRGB = exports.convertSRGBtoXYZ = exports.convertLinSRGBtoSRGB = exports.convertXYZtoLinSRGB = exports.convertLinSRGBtoXYZ = exports.convertSRGBtoLinSRGB = exports.denormalizeSRGB = exports.normalizeSRGB = exports.D65 = void 0;
const multiplyMatrices_1 = require("./multiplyMatrices");
exports.D65 = [0.3127 / 0.329, 1.0, (1.0 - 0.3127 - 0.329) / 0.329];
const normalizeSRGB = (c) => {
    return c.map((x) => x / 255);
};
exports.normalizeSRGB = normalizeSRGB;
const denormalizeSRGB = (c) => {
    return c.map((x) => x * 255);
};
exports.denormalizeSRGB = denormalizeSRGB;
const convertSRGBtoLinSRGB = (rgb) => {
    // convert an array of sRGB values
    // where in-gamut values are in the range [0 - 1]
    // to linear light (un-companded) form.
    // https://en.wikipedia.org/wiki/SRGB
    // Extended transfer function:
    // for negative values,  linear portion is extended on reflection of axis,
    // then reflected power function is used.
    return rgb.map((val) => {
        const sign = val < 0 ? -1 : 1;
        const abs = Math.abs(val);
        if (abs < 0.04045) {
            return val / 12.92;
        }
        return sign * Math.pow((abs + 0.055) / 1.055, 2.4);
    });
};
exports.convertSRGBtoLinSRGB = convertSRGBtoLinSRGB;
const convertLinSRGBtoXYZ = (rgb) => {
    // convert an array of linear-light sRGB values to CIE XYZ
    // using sRGB's own white, D65 (no chromatic adaptation)
    const M = [
        [0.41239079926595934, 0.357584339383878, 0.1804807884018343],
        [0.21263900587151027, 0.715168678767756, 0.07219231536073371],
        [0.01933081871559182, 0.11919477979462598, 0.9505321522496607],
    ];
    return (0, multiplyMatrices_1.multiplyMatrices)(M, rgb);
};
exports.convertLinSRGBtoXYZ = convertLinSRGBtoXYZ;
const convertXYZtoLinSRGB = (xyz) => {
    // convert XYZ to linear-light sRGB
    const M = [
        [3.2409699419045226, -1.537383177570094, -0.4986107602930034],
        [-0.9692436362808796, 1.8759675015077202, 0.04155505740717559],
        [0.05563007969699366, -0.20397695888897652, 1.0569715142428786],
    ];
    return (0, multiplyMatrices_1.multiplyMatrices)(M, xyz);
};
exports.convertXYZtoLinSRGB = convertXYZtoLinSRGB;
const convertLinSRGBtoSRGB = (RGB) => {
    // convert an array of linear-light sRGB values in the range 0.0-1.0
    // to gamma corrected form
    // https://en.wikipedia.org/wiki/SRGB
    // Extended transfer function:
    // For negative values, linear portion extends on reflection
    // of axis, then uses reflected pow below that
    return RGB.map((val) => {
        const sign = val < 0 ? -1 : 1;
        const abs = Math.abs(val);
        if (abs > 0.0031308) {
            return sign * (1.055 * Math.pow(abs, 1 / 2.4) - 0.055);
        }
        return 12.92 * val;
    });
};
exports.convertLinSRGBtoSRGB = convertLinSRGBtoSRGB;
const convertSRGBtoXYZ = (rgb) => (0, exports.convertLinSRGBtoXYZ)((0, exports.convertSRGBtoLinSRGB)(rgb));
exports.convertSRGBtoXYZ = convertSRGBtoXYZ;
const convertXYZtoSRGB = (xyz) => (0, exports.convertLinSRGBtoSRGB)((0, exports.convertXYZtoLinSRGB)(xyz));
exports.convertXYZtoSRGB = convertXYZtoSRGB;
//# sourceMappingURL=color.js.map