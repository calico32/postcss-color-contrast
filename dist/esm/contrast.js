// import { Color_XYZ } from './color'
import { convertSRGBtoXYZ, normalizeSRGB } from './color';
export const AAA = 7;
export const AAA_LARGE = 4.5;
export const AA = 4.5;
export const AA_LARGE = 3;
/**
 * The WCAG 2.1 contrast is calculated by the formula *contrast = (Yl + 0.05) / (Yd + 0.05)* where *Yd* is the luminance of the darker color in the pair and *Yl* is the luminance of the lighter color. The factor 0.05 represents the luminance contribution of the viewing flare.
 */
export const contrastRatioOf = (a, b) => {
    const aY = a[1];
    const bY = b[1];
    if (aY > bY) {
        return (aY + 0.05) / (bY + 0.05);
    }
    else {
        return (bY + 0.05) / (aY + 0.05);
    }
};
export const colorContrast = (bg, fg, targetRatio) => {
    const bgXYZ = convertSRGBtoXYZ(normalizeSRGB(bg));
    let tempWinner = null;
    let maxRatio = -Infinity;
    for (const fgColor of fg) {
        const fgXYZ = convertSRGBtoXYZ(normalizeSRGB(fgColor));
        const ratio = contrastRatioOf(bgXYZ, fgXYZ);
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
        const blackRatio = contrastRatioOf(bgXYZ, convertSRGBtoXYZ([0, 0, 0]));
        const whiteRatio = contrastRatioOf(bgXYZ, convertSRGBtoXYZ([1, 1, 1]));
        return blackRatio > whiteRatio ? [0, 0, 0] : [255, 255, 255];
    }
    if (!tempWinner) {
        throw new Error('no foreground colors provided to colorContrast()');
    }
    return tempWinner;
};
//# sourceMappingURL=contrast.js.map