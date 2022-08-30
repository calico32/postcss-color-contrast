// import { Color_XYZ } from './color'

import { convertSRGBtoXYZ, normalizeSRGB, SRGB, XYZ } from './color'

export type ContrastRatio = number

export const AAA: ContrastRatio = 7
export const AAA_LARGE: ContrastRatio = 4.5
export const AA: ContrastRatio = 4.5
export const AA_LARGE: ContrastRatio = 3

export const contrastKeywords: Record<string, ContrastRatio> = {
  aa: AA,
  'aa-large': AA_LARGE,
  aaa: AAA,
  'aaa-large': AAA_LARGE,
}

/**
 * The WCAG 2.1 contrast is calculated by the formula *contrast = (Yl + 0.05) / (Yd + 0.05)* where *Yd* is the luminance of the darker color in the pair and *Yl* is the luminance of the lighter color. The factor 0.05 represents the luminance contribution of the viewing flare.
 */
export const contrastRatioOf = (a: XYZ, b: XYZ): ContrastRatio => {
  const aY = a[1]
  const bY = b[1]

  if (aY > bY) {
    return (aY + 0.05) / (bY + 0.05)
  } else {
    return (bY + 0.05) / (aY + 0.05)
  }
}

export const colorContrast = (bg: SRGB, fg: SRGB[], targetRatio?: ContrastRatio): SRGB => {
  const bgXYZ = convertSRGBtoXYZ(normalizeSRGB(bg))

  let tempWinner = null
  let maxRatio = -Infinity
  for (const fgColor of fg) {
    const fgXYZ = convertSRGBtoXYZ(normalizeSRGB(fgColor))
    const ratio = contrastRatioOf(bgXYZ, fgXYZ)
    if (targetRatio && ratio >= targetRatio) {
      return fgColor
    } else if (ratio > maxRatio) {
      maxRatio = ratio
      tempWinner = fgColor
    }
  }

  if (targetRatio) {
    // no color found, use black or white
    const blackRatio = contrastRatioOf(bgXYZ, convertSRGBtoXYZ(<SRGB>[0, 0, 0]))
    const whiteRatio = contrastRatioOf(bgXYZ, convertSRGBtoXYZ(<SRGB>[1, 1, 1]))
    return blackRatio > whiteRatio ? <SRGB>[0, 0, 0] : <SRGB>[255, 255, 255]
  }

  if (!tempWinner) {
    throw new Error('no foreground colors provided to colorContrast()')
  }

  return tempWinner
}
