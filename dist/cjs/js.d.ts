import { SRGB, SRGBA } from './color';
declare type Color = SRGB | SRGBA | string;
declare function colorContrast(bg: Color, fg: Color[], targetRatio?: number, outputFormat?: 'hex' | 'rgb' | 'hsl'): string;
declare function colorContrast(bg: Color, fg: Color[], targetRatio?: number, outputFormat?: 'rgb-array'): SRGB;
declare function colorContrast(bg: Color, fg: Color[], targetRatio?: number, outputFormat?: 'hsl-array'): [h: number, s: number, l: number];
export default colorContrast;
