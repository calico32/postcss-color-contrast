"use strict";
// import { Color_XYZ } from './color'
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorContrast = exports.contrastRatioOf = exports.AA_LARGE = exports.AA = exports.AAA_LARGE = exports.AAA = void 0;
const color_1 = require("./color");
exports.AAA = 7;
exports.AAA_LARGE = 4.5;
exports.AA = 4.5;
exports.AA_LARGE = 3;
/**
 * The WCAG 2.1 contrast is calculated by the formula *contrast = (Yl + 0.05) / (Yd + 0.05)* where *Yd* is the luminance of the darker color in the pair and *Yl* is the luminance of the lighter color. The factor 0.05 represents the luminance contribution of the viewing flare.
 */
const contrastRatioOf = (a, b) => {
    const aY = a[1];
    const bY = b[1];
    if (aY > bY) {
        return (aY + 0.05) / (bY + 0.05);
    }
    else {
        return (bY + 0.05) / (aY + 0.05);
    }
};
exports.contrastRatioOf = contrastRatioOf;
const colorContrast = (bg, fg, targetRatio) => {
    const bgXYZ = (0, color_1.convertSRGBtoXYZ)((0, color_1.normalizeSRGB)(bg));
    let tempWinner = null;
    let maxRatio = -Infinity;
    for (const fgColor of fg) {
        const fgXYZ = (0, color_1.convertSRGBtoXYZ)((0, color_1.normalizeSRGB)(fgColor));
        const ratio = (0, exports.contrastRatioOf)(bgXYZ, fgXYZ);
        if (targetRatio && ratio >= targetRatio) {
            return fgColor;
        }
        else if (ratio > maxRatio) {
            maxRatio = ratio;
            tempWinner = fgColor;
        }
    }
    if (targetRatio) {
        // no color found, use black or white
        const blackRatio = (0, exports.contrastRatioOf)(bgXYZ, (0, color_1.convertSRGBtoXYZ)([0, 0, 0]));
        const whiteRatio = (0, exports.contrastRatioOf)(bgXYZ, (0, color_1.convertSRGBtoXYZ)([1, 1, 1]));
        return blackRatio > whiteRatio ? [0, 0, 0] : [255, 255, 255];
    }
    if (!tempWinner) {
        throw new Error('no foreground colors provided to colorContrast()');
    }
    return tempWinner;
};
exports.colorContrast = colorContrast;
//# sourceMappingURL=contrast.js.map