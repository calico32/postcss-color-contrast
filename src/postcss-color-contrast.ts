import valueParser, { DivNode, Node, SpaceNode } from 'postcss-value-parser'
import { SRGB } from './color'
import { colorContrast, contrastKeywords, ContrastRatio } from './contrast'
import { cssColorNames, parseCssColor } from './css-color'

// @ts-ignore - peer dependency missing types
import type { Declaration as DeclarationFull, PluginCreator as PluginCreatorFull } from 'postcss'
import { DeclarationStub, PluginCreatorStub } from './postcss'

type Declaration = any extends DeclarationFull ? DeclarationStub : DeclarationFull
type PluginCreator<T> = any extends PluginCreatorFull<T>
  ? PluginCreatorStub<T>
  : PluginCreatorFull<T>

/*
color-contrast() = color-contrast( <color> vs <color>#{2,}  [ to [<number> | AA | AA-large | AAA | AAA-large]]? )
CSS Color Module Level 6: https://drafts.csswg.org/css-color-6/
*/

class ParseFail extends Error {
  constructor(public message: string) {
    super('Failed to process color-contrast()')
  }
}

const expectNotNull = (node: Node | undefined): Node => {
  if (!node) {
    throw new ParseFail('expected node but found null')
  }
  return node!
}

const expectColor = (node: Node | undefined): SRGB => {
  expectNotNull(node)
  if (!node) return <SRGB>[0, 0, 0]

  if (node.type === 'word') {
    // possibly hex or named color
    if (!node.value.startsWith('#') && !(node.value in cssColorNames)) {
      throw new ParseFail('expected color, got word')
    }
  } else if (node.type === 'function') {
    const colorFunctions = ['rgb', 'hsl', 'rgba', 'hsla']

    if (!colorFunctions.includes(node.value)) {
      throw new ParseFail('expected color, got function')
    }
  } else {
    throw new ParseFail(`expected color, got ${node.type}`)
  }

  const color = parseCssColor(node)

  if (!color) {
    throw new ParseFail('invalid color')
  }
  if (color[3] !== 1) {
    throw new ParseFail('transparent colors are not supported')
  }

  return color.slice(0, 3) as SRGB
}

const expectType = (node: Node | undefined, type: Node['type']): Node => {
  node = expectNotNull(node)
  if (node.type !== type) {
    throw new ParseFail(`expected ${type} but found ${node.type}`)
  }
  return node
}

const expectValue = (node: Node | undefined, value: string): Node => {
  node = expectNotNull(node)
  if (node.value !== value) {
    throw new ParseFail(`expected ${value} but found ${node.value}`)
  }
  return node
}

const expectSpace = (node: Node | undefined): SpaceNode => {
  node = expectNotNull(node)
  if (node.type !== 'space') {
    throw new ParseFail(`expected space, got ${node.type}`)
  }
  return node as SpaceNode
}

const expectDivider = (node: Node | undefined): DivNode => {
  node = expectNotNull(node)
  if (node.type !== 'div') {
    throw new ParseFail(`expected divider but found ${node.type}`)
  }
  return node as DivNode
}

const postcssColorContrast: PluginCreator<{}> = (opts = {}) => ({
  postcssPlugin: 'postcss-color-contrast',
  Declaration(decl: Declaration) {
    if (decl.value.includes('color-contrast(')) {
      let resultColor: SRGB | undefined

      try {
        valueParser(decl.value).walk((node) => {
          if (node.type === 'function' && node.value === 'color-contrast') {
            const args = node.nodes.filter((n) => n.type !== 'comment')

            for (let i = 0; i < args.length; i++) {
              const node = args[i]
              if (node.type === 'space') {
                while (args[i + 1].type === 'space') {
                  const space = args.splice(i + 1, 1)
                  node.value += space[0].value
                }
              }
            }

            if (args.length) {
              if (args[0].type === 'space') args.shift()
              if (args.at(-1)?.type === 'space') args.pop()
            }

            if (args.length === 0) {
              throw new ParseFail('color-contrast(): no arguments provided')
            }

            const bg = expectColor(args.shift())

            expectSpace(args.shift())

            const vs = expectNotNull(args.shift())
            expectType(vs, 'word')
            expectValue(vs, 'vs')

            expectSpace(args.shift())

            const fg: SRGB[] = []
            while (true) {
              const color = expectColor(args.shift())
              fg.push(color)
              if (args.length === 0 || args[0].type === 'space') {
                // color list is over
                break
              }
              expectDivider(args.shift())
            }

            if (fg.length === 0) {
              throw new ParseFail('color-contrast(): no opposing colors provided')
            }

            let targetRatio: ContrastRatio | undefined
            if (args.length) {
              expectSpace(args.shift())

              const to = expectNotNull(args.shift())
              expectType(to, 'word')
              expectValue(to, 'to')

              expectSpace(args.shift())

              const target = expectNotNull(args.shift())
              expectType(target, 'word')
              if (target.value.toLowerCase() in contrastKeywords) {
                targetRatio = contrastKeywords[target.value.toLowerCase()]
              } else {
                try {
                  targetRatio = parseFloat(target.value)
                } catch (e) {
                  throw new ParseFail('color-contrast(): invalid target ratio')
                }
              }
            }

            resultColor = colorContrast(bg, fg, targetRatio)
            return
          }
        })
      } catch (e) {
        if (e instanceof ParseFail) {
          throw decl.error(e.message)
        } else {
          throw e
        }
      }

      if (!resultColor) {
        throw decl.error('color-contrast(): failed to process color-contrast()')
      }

      decl.value = `#${resultColor
        .map((c) => Math.round(c).toString(16).padStart(2, '0'))
        .join('')}`
    }
  },
})

postcssColorContrast.postcss = true

export default postcssColorContrast
