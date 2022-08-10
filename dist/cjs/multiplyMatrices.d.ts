/**
 * Simple matrix (and vector) multiplication
 * Warning: No error handling for incompatible dimensions!
 * @author Lea Verou 2020 MIT License
 * @link https://drafts.csswg.org/css-color-4/multiply-matrices.js
 * @param A m × n matrix
 * @param B n × p matrix
 * @returns m × p matrix
 */
export declare function multiplyMatrices(A: number[] | number[][], B: number[] | number[][]): number[] | number[][];
