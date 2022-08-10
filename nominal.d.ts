declare abstract class Nominal<Tag extends keyof never> {
  private static readonly $as$: unique symbol
  private [Nominal.$as$]: Record<Tag, true>
}
