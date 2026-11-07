import type { WizardTarget } from './types.js'

/** Keeps a step index inside `[0, total - 1]`. Returns `0` for an empty list. */
export function clampStep(step: number, total: number): number {
  return Math.max(0, Math.min(step, total - 1))
}

/** The step's element, or `null` when it is absent or not rendered (e.g. `display: none`). */
export function resolveTarget(target: WizardTarget): Element | null {
  const element = typeof target === 'string' ? document.querySelector(target) : target.current
  return element && isRendered(element) ? element : null
}

/** Browsers without `checkVisibility` (before 2024) treat every element as rendered. */
function isRendered(element: Element): boolean {
  return typeof element.checkVisibility !== 'function' || element.checkVisibility()
}
