/**
 * (c) Dean McNamee <dean@gmail.com>, 2012.
 * Original https://github.com/deanm/css-color-parser-js
//
*/
import { FunctionNode, Node } from 'postcss-value-parser'
import { SRGBA } from './color'

// http://www.w3.org/TR/css3-color/
export const cssColorNames: Record<string, SRGBA> = {
  transparent: <SRGBA>[0, 0, 0, 0],
  aliceblue: <SRGBA>[240, 248, 255, 1],
  antiquewhite: <SRGBA>[250, 235, 215, 1],
  aqua: <SRGBA>[0, 255, 255, 1],
  aquamarine: <SRGBA>[127, 255, 212, 1],
  azure: <SRGBA>[240, 255, 255, 1],
  beige: <SRGBA>[245, 245, 220, 1],
  bisque: <SRGBA>[255, 228, 196, 1],
  black: <SRGBA>[0, 0, 0, 1],
  blanchedalmond: <SRGBA>[255, 235, 205, 1],
  blue: <SRGBA>[0, 0, 255, 1],
  blueviolet: <SRGBA>[138, 43, 226, 1],
  brown: <SRGBA>[165, 42, 42, 1],
  burlywood: <SRGBA>[222, 184, 135, 1],
  cadetblue: <SRGBA>[95, 158, 160, 1],
  chartreuse: <SRGBA>[127, 255, 0, 1],
  chocolate: <SRGBA>[210, 105, 30, 1],
  coral: <SRGBA>[255, 127, 80, 1],
  cornflowerblue: <SRGBA>[100, 149, 237, 1],
  cornsilk: <SRGBA>[255, 248, 220, 1],
  crimson: <SRGBA>[220, 20, 60, 1],
  cyan: <SRGBA>[0, 255, 255, 1],
  darkblue: <SRGBA>[0, 0, 139, 1],
  darkcyan: <SRGBA>[0, 139, 139, 1],
  darkgoldenrod: <SRGBA>[184, 134, 11, 1],
  darkgray: <SRGBA>[169, 169, 169, 1],
  darkgreen: <SRGBA>[0, 100, 0, 1],
  darkgrey: <SRGBA>[169, 169, 169, 1],
  darkkhaki: <SRGBA>[189, 183, 107, 1],
  darkmagenta: <SRGBA>[139, 0, 139, 1],
  darkolivegreen: <SRGBA>[85, 107, 47, 1],
  darkorange: <SRGBA>[255, 140, 0, 1],
  darkorchid: <SRGBA>[153, 50, 204, 1],
  darkred: <SRGBA>[139, 0, 0, 1],
  darksalmon: <SRGBA>[233, 150, 122, 1],
  darkseagreen: <SRGBA>[143, 188, 143, 1],
  darkslateblue: <SRGBA>[72, 61, 139, 1],
  darkslategray: <SRGBA>[47, 79, 79, 1],
  darkslategrey: <SRGBA>[47, 79, 79, 1],
  darkturquoise: <SRGBA>[0, 206, 209, 1],
  darkviolet: <SRGBA>[148, 0, 211, 1],
  deeppink: <SRGBA>[255, 20, 147, 1],
  deepskyblue: <SRGBA>[0, 191, 255, 1],
  dimgray: <SRGBA>[105, 105, 105, 1],
  dimgrey: <SRGBA>[105, 105, 105, 1],
  dodgerblue: <SRGBA>[30, 144, 255, 1],
  firebrick: <SRGBA>[178, 34, 34, 1],
  floralwhite: <SRGBA>[255, 250, 240, 1],
  forestgreen: <SRGBA>[34, 139, 34, 1],
  fuchsia: <SRGBA>[255, 0, 255, 1],
  gainsboro: <SRGBA>[220, 220, 220, 1],
  ghostwhite: <SRGBA>[248, 248, 255, 1],
  gold: <SRGBA>[255, 215, 0, 1],
  goldenrod: <SRGBA>[218, 165, 32, 1],
  gray: <SRGBA>[128, 128, 128, 1],
  green: <SRGBA>[0, 128, 0, 1],
  greenyellow: <SRGBA>[173, 255, 47, 1],
  grey: <SRGBA>[128, 128, 128, 1],
  honeydew: <SRGBA>[240, 255, 240, 1],
  hotpink: <SRGBA>[255, 105, 180, 1],
  indianred: <SRGBA>[205, 92, 92, 1],
  indigo: <SRGBA>[75, 0, 130, 1],
  ivory: <SRGBA>[255, 255, 240, 1],
  khaki: <SRGBA>[240, 230, 140, 1],
  lavender: <SRGBA>[230, 230, 250, 1],
  lavenderblush: <SRGBA>[255, 240, 245, 1],
  lawngreen: <SRGBA>[124, 252, 0, 1],
  lemonchiffon: <SRGBA>[255, 250, 205, 1],
  lightblue: <SRGBA>[173, 216, 230, 1],
  lightcoral: <SRGBA>[240, 128, 128, 1],
  lightcyan: <SRGBA>[224, 255, 255, 1],
  lightgoldenrodyellow: <SRGBA>[250, 250, 210, 1],
  lightgray: <SRGBA>[211, 211, 211, 1],
  lightgreen: <SRGBA>[144, 238, 144, 1],
  lightgrey: <SRGBA>[211, 211, 211, 1],
  lightpink: <SRGBA>[255, 182, 193, 1],
  lightsalmon: <SRGBA>[255, 160, 122, 1],
  lightseagreen: <SRGBA>[32, 178, 170, 1],
  lightskyblue: <SRGBA>[135, 206, 250, 1],
  lightslategray: <SRGBA>[119, 136, 153, 1],
  lightslategrey: <SRGBA>[119, 136, 153, 1],
  lightsteelblue: <SRGBA>[176, 196, 222, 1],
  lightyellow: <SRGBA>[255, 255, 224, 1],
  lime: <SRGBA>[0, 255, 0, 1],
  limegreen: <SRGBA>[50, 205, 50, 1],
  linen: <SRGBA>[250, 240, 230, 1],
  magenta: <SRGBA>[255, 0, 255, 1],
  maroon: <SRGBA>[128, 0, 0, 1],
  mediumaquamarine: <SRGBA>[102, 205, 170, 1],
  mediumblue: <SRGBA>[0, 0, 205, 1],
  mediumorchid: <SRGBA>[186, 85, 211, 1],
  mediumpurple: <SRGBA>[147, 112, 219, 1],
  mediumseagreen: <SRGBA>[60, 179, 113, 1],
  mediumslateblue: <SRGBA>[123, 104, 238, 1],
  mediumspringgreen: <SRGBA>[0, 250, 154, 1],
  mediumturquoise: <SRGBA>[72, 209, 204, 1],
  mediumvioletred: <SRGBA>[199, 21, 133, 1],
  midnightblue: <SRGBA>[25, 25, 112, 1],
  mintcream: <SRGBA>[245, 255, 250, 1],
  mistyrose: <SRGBA>[255, 228, 225, 1],
  moccasin: <SRGBA>[255, 228, 181, 1],
  navajowhite: <SRGBA>[255, 222, 173, 1],
  navy: <SRGBA>[0, 0, 128, 1],
  oldlace: <SRGBA>[253, 245, 230, 1],
  olive: <SRGBA>[128, 128, 0, 1],
  olivedrab: <SRGBA>[107, 142, 35, 1],
  orange: <SRGBA>[255, 165, 0, 1],
  orangered: <SRGBA>[255, 69, 0, 1],
  orchid: <SRGBA>[218, 112, 214, 1],
  palegoldenrod: <SRGBA>[238, 232, 170, 1],
  palegreen: <SRGBA>[152, 251, 152, 1],
  paleturquoise: <SRGBA>[175, 238, 238, 1],
  palevioletred: <SRGBA>[219, 112, 147, 1],
  papayawhip: <SRGBA>[255, 239, 213, 1],
  peachpuff: <SRGBA>[255, 218, 185, 1],
  peru: <SRGBA>[205, 133, 63, 1],
  pink: <SRGBA>[255, 192, 203, 1],
  plum: <SRGBA>[221, 160, 221, 1],
  powderblue: <SRGBA>[176, 224, 230, 1],
  purple: <SRGBA>[128, 0, 128, 1],
  rebeccapurple: <SRGBA>[102, 51, 153, 1],
  red: <SRGBA>[255, 0, 0, 1],
  rosybrown: <SRGBA>[188, 143, 143, 1],
  royalblue: <SRGBA>[65, 105, 225, 1],
  saddlebrown: <SRGBA>[139, 69, 19, 1],
  salmon: <SRGBA>[250, 128, 114, 1],
  sandybrown: <SRGBA>[244, 164, 96, 1],
  seagreen: <SRGBA>[46, 139, 87, 1],
  seashell: <SRGBA>[255, 245, 238, 1],
  sienna: <SRGBA>[160, 82, 45, 1],
  silver: <SRGBA>[192, 192, 192, 1],
  skyblue: <SRGBA>[135, 206, 235, 1],
  slateblue: <SRGBA>[106, 90, 205, 1],
  slategray: <SRGBA>[112, 128, 144, 1],
  slategrey: <SRGBA>[112, 128, 144, 1],
  snow: <SRGBA>[255, 250, 250, 1],
  springgreen: <SRGBA>[0, 255, 127, 1],
  steelblue: <SRGBA>[70, 130, 180, 1],
  tan: <SRGBA>[210, 180, 140, 1],
  teal: <SRGBA>[0, 128, 128, 1],
  thistle: <SRGBA>[216, 191, 216, 1],
  tomato: <SRGBA>[255, 99, 71, 1],
  turquoise: <SRGBA>[64, 224, 208, 1],
  violet: <SRGBA>[238, 130, 238, 1],
  wheat: <SRGBA>[245, 222, 179, 1],
  white: <SRGBA>[255, 255, 255, 1],
  whitesmoke: <SRGBA>[245, 245, 245, 1],
  yellow: <SRGBA>[255, 255, 0, 1],
  yellowgreen: <SRGBA>[154, 205, 50, 1],
}

const clampByte = (i: number): number => {
  // Clamp to integer 0 .. 255.
  i = Math.round(i) // Seems to be what Chrome does (vs truncation).
  return i < 0 ? 0 : i > 255 ? 255 : i
}

const clampFloat = (f: number): number => {
  // Clamp to float 0.0 .. 1.0.
  return f < 0 ? 0 : f > 1 ? 1 : f
}

const parseCssInt = (intOrPercentage: string): number => {
  // int or percentage.
  if (intOrPercentage.at(-1) === '%') return clampByte((parseFloat(intOrPercentage) / 100) * 255)
  return clampByte(parseInt(intOrPercentage))
}

const parseCssFloat = (floatOrPercentage: string) => {
  // float or percentage.
  if (floatOrPercentage.at(-1) === '%') return clampFloat(parseFloat(floatOrPercentage) / 100)
  return clampFloat(parseFloat(floatOrPercentage))
}

const cssHueToRGB = (m1: number, m2: number, h: number) => {
  if (h < 0) h += 1
  else if (h > 1) h -= 1

  if (h * 6 < 1) return m1 + (m2 - m1) * h * 6
  if (h * 2 < 1) return m2
  if (h * 3 < 2) return m1 + (m2 - m1) * (2 / 3 - h) * 6
  return m1
}

const parseFunction = (fn: FunctionNode): [name: string, args: string[]] => {
  const nodes = fn.nodes.filter((n) => n.type !== 'comment')

  let args: string[] = []
  if (nodes.some((node) => node.type === 'div')) {
    if (nodes.some((node, i) => node.type === 'space')) {
      throw new Error('Unexpected space in function')
    }

    if (nodes.length && nodes[0].type === 'div') {
      throw new Error('Unexpected div in function')
    }

    while (true) {
      if (nodes.length === 0) break
      const node = nodes.shift()!
      if (node.type === 'div') {
        throw new Error('Unexpected div in function')
      }
      args.push(node.value)
      const div = nodes.shift()
      if (!div) break
      if (div.type !== 'div') {
        throw new Error(`Unexpected ${div.type} in function`)
      }
    }
  } else {
    args = nodes.filter((node) => node.type !== 'space').map((node) => node.value)
  }

  return [fn.value, args]
}

export const parseCssColor = (input: Node): SRGBA | null => {
  if (input.type === 'word') {
    const value = input.value.toLowerCase()
    if (value in cssColorNames) return <SRGBA>[...cssColorNames[value]]

    // #abc and #abc123 syntax.
    if (value.startsWith('#')) {
      if (value.length === 4) {
        const iv = parseInt(value.substring(1), 16)
        if (!(iv >= 0 && iv <= 0xfff)) return null

        return <SRGBA>[
          ((iv & 0xf00) >> 4) | ((iv & 0xf00) >> 8),
          (iv & 0xf0) | ((iv & 0xf0) >> 4),
          (iv & 0xf) | ((iv & 0xf) << 4),
          1,
        ]
      } else if (value.length === 7) {
        const iv = parseInt(value.substring(1), 16)
        if (!(iv >= 0 && iv <= 0xffffff)) return null

        return <SRGBA>[(iv & 0xff0000) >> 16, (iv & 0xff00) >> 8, iv & 0xff, 1]
      } else if (value.length === 9) {
        const iv = parseInt(value.substring(1), 16)
        if (!(iv >= 0 && iv <= 0xffffffff)) return null

        return <SRGBA>[
          (iv & 0xff000000) >> 24,
          (iv & 0xff0000) >> 16,
          (iv & 0xff00) >> 8,
          iv & 0xff,
        ]
      }

      return null
    }

    return null
  }

  if (input.type === 'function') {
    const [name, args] = parseFunction(input)
    let alpha = 1
    switch (name) {
      case 'rgba':
        if (args.length !== 4) return null
        alpha = parseCssFloat(args.pop()!)
      case 'rgb':
        if (args.length !== 3) return null
        return <SRGBA>[parseCssInt(args[0]), parseCssInt(args[1]), parseCssInt(args[2]), alpha]
      case 'hsla':
        if (args.length !== 4) return null
        alpha = parseCssFloat(args.pop()!)
      case 'hsl':
        if (args.length !== 3) return null
        const h = (((parseFloat(args[0]) % 360) + 360) % 360) / 360

        if (args[1].at(-1) !== '%') return null
        if (args[2].at(-1) !== '%') return null

        const s = parseCssFloat(args[1])
        const l = parseCssFloat(args[2])
        const m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s
        const m1 = l * 2 - m2
        return <SRGBA>[
          clampByte(cssHueToRGB(m1, m2, h + 1 / 3) * 255),
          clampByte(cssHueToRGB(m1, m2, h) * 255),
          clampByte(cssHueToRGB(m1, m2, h - 1 / 3) * 255),
          alpha,
        ]
    }
  }

  return null
}
