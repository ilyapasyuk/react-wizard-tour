import type { WizardTarget } from './types.js'

/** Keeps a step index inside `[0, total - 1]`. Returns `0` for an empty list. */
export function clampStep(step: number, total: number): number {
  return Math.max(0, Math.min(step, total - 1))
}

export function resolveTarget(target: WizardTarget): Element | null {
  return typeof target === 'string' ? document.querySelector(target) : target.current
}
