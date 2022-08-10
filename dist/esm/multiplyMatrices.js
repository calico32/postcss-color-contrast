const isMatrix = (m) => {
    return Array.isArray(m) && Array.isArray(m[0]);
};
/**
 * Simple matrix (and vector) multiplication
 * Warning: No error handling for incompatible dimensions!
 * @author Lea Verou 2020 MIT License
 * @link https://drafts.csswg.org/css-color-4/multiply-matrices.js
 * @param A m × n matrix
 * @param B n × p matrix
 * @returns m × p matrix
 */
export function multiplyMatrices(A, B) {
    const m = A.length;
    let mA;
    if (!isMatrix(A)) {
        // A is vector, convert to [[a, b, c, ...]]
        mA = [A];
    }
    else {
        mA = A;
    }
    let mB;
    if (!isMatrix(B)) {
        // B is vector, convert to [[a], [b], [c], ...]]
        mB = B.map((x) => [x]);
    }
    else {
        mB = B;
    }
    const p = mB[0].length;
    const bCols = mB[0].map((_, i) => mB.map((x) => x[i])); // transpose B
    let product = mA.map((row) => bCols.map((col) => {
        if (!Array.isArray(row)) {
            return col.reduce((a, c) => a + c * row, 0);
        }
        return row.reduce((a, c, i) => a + c * (col[i] || 0), 0);
    }));
    if (m === 1) {
        product = product[0]; // Avoid [[a, b, c, ...]]
    }
    if (p === 1) {
        return product.map((x) => x[0]); // Avoid [[a], [b], [c], ...]]
    }
    return product;
}
//# sourceMappingURL=multiplyMatrices.js.map