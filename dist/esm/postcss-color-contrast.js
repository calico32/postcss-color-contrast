import valueParser from 'postcss-value-parser';
import { AA, AAA, AAA_LARGE, AA_LARGE, colorContrast } from './contrast';
import { cssColorNames, parseCssColor } from './css-color';
/*
color-contrast() = color-contrast( <color> vs <color>#{2,}  [ to [<number> | AA | AA-large | AAA | AAA-large]]? )
CSS Color Module Level 6: https://drafts.csswg.org/css-color-6/
*/
const contrastKeywords = {
    aa: AA,
    'aa-large': AA_LARGE,
    aaa: AAA,
    'aaa-large': AAA_LARGE,
};
class ParseFail extends Error {
    constructor(message) {
        super('Failed to process color-contrast()');
        this.message = message;
    }
}
const expectNotNull = (node) => {
    if (!node) {
        throw new ParseFail('expected node but found null');
    }
    return node;
};
const expectColor = (node) => {
    expectNotNull(node);
    if (!node)
        return [0, 0, 0];
    if (node.type === 'word') {
        // possibly hex or named color
        if (!node.value.startsWith('#') && !(node.value in cssColorNames)) {
            throw new ParseFail('expected color, got word');
        }
    }
    else if (node.type === 'function') {
        const colorFunctions = ['rgb', 'hsl', 'rgba', 'hsla'];
        if (!colorFunctions.includes(node.value)) {
            throw new ParseFail('expected color, got function');
        }
    }
    else {
        throw new ParseFail(`expected color, got ${node.type}`);
    }
    const color = parseCssColor(node);
    if (!color) {
        throw new ParseFail('invalid color');
    }
    if (color[3] !== 1) {
        throw new ParseFail('transparent colors are not supported');
    }
    return color.slice(0, 3);
};
const expectType = (node, type) => {
    node = expectNotNull(node);
    if (node.type !== type) {
        throw new ParseFail(`expected ${type} but found ${node.type}`);
    }
    return node;
};
const expectValue = (node, value) => {
    node = expectNotNull(node);
    if (node.value !== value) {
        throw new ParseFail(`expected ${value} but found ${node.value}`);
    }
    return node;
};
const expectSpace = (node) => {
    node = expectNotNull(node);
    if (node.type !== 'space') {
        throw new ParseFail(`expected space, got ${node.type}`);
    }
    return node;
};
const expectDivider = (node) => {
    node = expectNotNull(node);
    if (node.type !== 'div') {
        throw new ParseFail(`expected divider but found ${node.type}`);
    }
    return node;
};
const postcssColorContrast = (opts = {}) => ({
    postcssPlugin: 'postcss-color-contrast',
    Declaration(decl) {
        if (decl.value.includes('color-contrast(')) {
            let resultColor;
            try {
                valueParser(decl.value).walk((node) => {
                    if (node.type === 'function' && node.value === 'color-contrast') {
                        const args = node.nodes.filter((n) => n.type !== 'comment');
                        for (let i = 0; i < args.length; i++) {
                            const node = args[i];
                            if (node.type === 'space') {
                                while (args[i + 1].type === 'space') {
                                    const space = args.splice(i + 1, 1);
                                    node.value += space[0].value;
                                }
                            }
                        }
                        if (args.length) {
                            if (args[0].type === 'space')
                                args.shift();
                            if (args.at(-1)?.type === 'space')
                                args.pop();
                        }
                        if (args.length === 0) {
                            throw new ParseFail('color-contrast(): no arguments provided');
                        }
                        const bg = expectColor(args.shift());
                        expectSpace(args.shift());
                        const vs = expectNotNull(args.shift());
                        expectType(vs, 'word');
                        expectValue(vs, 'vs');
                        expectSpace(args.shift());
                        const fg = [];
                        while (true) {
                            const color = expectColor(args.shift());
                            fg.push(color);
                            if (args.length === 0 || args[0].type === 'space') {
                                // color list is over
                                break;
                            }
                            expectDivider(args.shift());
                        }
                        if (fg.length === 0) {
                            throw new ParseFail('color-contrast(): no opposing colors provided');
                        }
                        let targetRatio;
                        if (args.length) {
                            expectSpace(args.shift());
                            const to = expectNotNull(args.shift());
                            expectType(to, 'word');
                            expectValue(to, 'to');
                            expectSpace(args.shift());
                            const target = expectNotNull(args.shift());
                            expectType(target, 'word');
                            if (target.value.toLowerCase() in contrastKeywords) {
                                targetRatio = contrastKeywords[target.value.toLowerCase()];
                            }
                            else {
                                try {
                                    targetRatio = parseFloat(target.value);
                                }
                                catch (e) {
                                    throw new ParseFail('color-contrast(): invalid target ratio');
                                }
                            }
                        }
                        resultColor = colorContrast(bg, fg, targetRatio);
                        return;
                    }
                });
            }
            catch (e) {
                if (e instanceof ParseFail) {
                    throw decl.error(e.message);
                }
                else {
                    throw e;
                }
            }
            if (!resultColor) {
                throw decl.error('color-contrast(): failed to process color-contrast()');
            }
            decl.value = `#${resultColor
                .map((c) => Math.round(c).toString(16).padStart(2, '0'))
                .join('')}`;
        }
    },
});
postcssColorContrast.postcss = true;
export default postcssColorContrast;
//# sourceMappingURL=postcss-color-contrast.js.map