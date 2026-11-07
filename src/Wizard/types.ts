import type { ReactNode, RefObject } from 'react'

/**
 * Where a step points.
 * - string: CSS selector, resolved with `document.querySelector`.
 * - ref: React ref to the element.
 */
export type WizardTarget = string | RefObject<Element | null>

export type WizardPlacement = 'top' | 'right' | 'bottom' | 'left'

export interface WizardStep {
  target: WizardTarget
  title: ReactNode
  description?: ReactNode
  /** Preferred side. The card flips to the opposite side when it does not fit. Default: `right`. */
  placement?: WizardPlacement
}

/** Why the tour closed. */
export type WizardCloseReason = 'close' | 'escape' | 'finish'

export interface WizardLabels {
  prev?: ReactNode
  next?: ReactNode
  finish?: ReactNode
  close?: ReactNode
  /** Step counter, e.g. `(1, 5) => '1 of 5'`. */
  counter?: (step: number, total: number) => ReactNode
}

export interface WizardProps {
  steps: readonly WizardStep[]

  /** Controlled visibility. Pair with `onOpenChange`. */
  open?: boolean
  /** Initial visibility when uncontrolled. Default: `true`. */
  defaultOpen?: boolean
  onOpenChange?: (open: boolean, reason: WizardCloseReason) => void

  /** Controlled zero-based step index. Pair with `onStepChange`. */
  step?: number
  /** Initial step when uncontrolled. Default: `0`. */
  defaultStep?: number
  onStepChange?: (step: number) => void

  labels?: WizardLabels
  /** Scroll the target into view on each step. Default: `true`. */
  scrollToTarget?: boolean
  className?: string
}
