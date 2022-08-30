import { SRGB, XYZ } from './color';
export declare type ContrastRatio = number;
export declare const AAA: ContrastRatio;
export declare const AAA_LARGE: ContrastRatio;
export declare const AA: ContrastRatio;
export declare const AA_LARGE: ContrastRatio;
export declare const contrastKeywords: Record<string, ContrastRatio>;
/**
 * The WCAG 2.1 contrast is calculated by the formula *contrast = (Yl + 0.05) / (Yd + 0.05)* where *Yd* is the luminance of the darker color in the pair and *Yl* is the luminance of the lighter color. The factor 0.05 represents the luminance contribution of the viewing flare.
 */
export declare const contrastRatioOf: (a: XYZ, b: XYZ) => ContrastRatio;
export declare const colorContrast: (bg: SRGB, fg: SRGB[], targetRatio?: number | undefined) => SRGB;
