export interface DeclarationStub {
  type: 'decl'
  parent: unknown | undefined
  raws: unknown

  error(message: string, options?: object): Error
  warn(result: unknown, text: string, opts?: object): any

  prop: string
  value: string
  important: boolean
  variable: boolean
}

type DeclarationProcessorStub = (decl: DeclarationStub, helper: unknown) => Promise<void> | void

interface ProcessorsStub {
  Declaration?: DeclarationProcessorStub | { [prop: string]: DeclarationProcessorStub }
  DeclarationExit?: DeclarationProcessorStub | { [prop: string]: DeclarationProcessorStub }
}

export interface PluginStub extends ProcessorsStub {
  postcssPlugin: string
}

export interface PluginCreatorStub<PluginOptions> {
  (opts?: PluginOptions): PluginStub
  postcss: true
}
