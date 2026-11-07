import { useState } from 'react'

import { Card } from './Card.js'
import { clampStep } from './steps.js'
import type { WizardCloseReason, WizardProps } from './types.js'

export function Wizard({
  steps,
  open: openProp,
  defaultOpen = true,
  onOpenChange,
  step: stepProp,
  defaultStep = 0,
  onStepChange,
  labels,
  scrollToTarget = true,
  className,
}: WizardProps) {
  const [openState, setOpenState] = useState(defaultOpen)
  const [stepState, setStepState] = useState(defaultStep)
  const open = openProp ?? openState
  const index = clampStep(stepProp ?? stepState, steps.length)
  const step = steps[index]

  if (!open || !step) {
    return null
  }

  const close = (reason: WizardCloseReason) => {
    setOpenState(false)
    onOpenChange?.(false, reason)
  }

  const goTo = (next: number) => {
    setStepState(next)
    onStepChange?.(next)
  }

  return (
    <Card
      step={step}
      index={index}
      total={steps.length}
      labels={labels}
      scrollToTarget={scrollToTarget}
      className={className}
      onNavigate={goTo}
      onClose={close}
    />
  )
}
