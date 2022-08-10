/**
 * Many functions taken from https://www.w3.org/TR/css-color-4/#color-conversion-code.
 */
export declare const D65: number[];
export declare type SRGBA = [r: number, g: number, b: number, a: number] & Nominal<'SRGBA'>;
export declare type SRGB = [r: number, g: number, b: number] & Nominal<'SRGB'>;
export declare type LinSRGB = [r: number, g: number, b: number] & Nominal<'LinSRGB'>;
export declare type XYZ = [x: number, y: number, z: number] & Nominal<'XYZ'>;
export declare const normalizeSRGB: <T extends number[]>(c: T) => T;
export declare const denormalizeSRGB: <T extends number[]>(c: T) => T;
export declare const convertSRGBtoLinSRGB: (rgb: SRGB) => LinSRGB;
export declare const convertLinSRGBtoXYZ: (rgb: LinSRGB) => XYZ;
export declare const convertXYZtoLinSRGB: (xyz: XYZ) => LinSRGB;
export declare const convertLinSRGBtoSRGB: (RGB: LinSRGB) => SRGB;
export declare const convertSRGBtoXYZ: (rgb: SRGB) => XYZ;
export declare const convertXYZtoSRGB: (xyz: XYZ) => SRGB;
