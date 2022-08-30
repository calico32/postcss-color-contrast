import { SRGB, SRGBA } from './color';
declare type Color = SRGB | SRGBA | string;
declare type ContrastRatio = number | 'aa' | 'aa-large' | 'aaa' | 'aaa-large';
declare function colorContrast(bg: Color, fg: Color[], targetRatio?: ContrastRatio, outputFormat?: 'hex' | 'rgb' | 'hsl'): string;
declare function colorContrast(bg: Color, fg: Color[], targetRatio?: ContrastRatio, outputFormat?: 'rgb-array'): SRGB;
declare function colorContrast(bg: Color, fg: Color[], targetRatio?: ContrastRatio, outputFormat?: 'hsl-array'): [h: number, s: number, l: number];
export default colorContrast;
