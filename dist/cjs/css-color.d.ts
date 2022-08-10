/**
 * (c) Dean McNamee <dean@gmail.com>, 2012.
 * Original https://github.com/deanm/css-color-parser-js
//
*/
import { Node } from 'postcss-value-parser';
import { SRGBA } from './color';
export declare const cssColorNames: Record<string, SRGBA>;
export declare const parseCssColor: (input: Node) => SRGBA | null;
