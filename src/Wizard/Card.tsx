import {
  arrow,
  autoUpdate,
  flip,
  offset,
  type Side,
  shift,
  useFloating,
} from '@floating-ui/react-dom'
import { type KeyboardEvent, useId, useLayoutEffect, useRef, useState } from 'react'

import { resolveTarget } from './steps.js'
import type { WizardCloseReason, WizardLabels, WizardStep } from './types.js'

/** Distance between the target and the card; the connector fills it. */
const GAP = 24

const DEFAULT_LABELS: Required<WizardLabels> = {
  prev: 'Back',
  next: 'Next',
  finish: 'Finish',
  close: 'Close',
  counter: (step, total) => `${step} of ${total}`,
}

interface CardProps {
  step: WizardStep
  index: number
  total: number
  labels: WizardLabels | undefined
  scrollToTarget: boolean
  className: string | undefined
  onNavigate: (step: number) => void
  onClose: (reason: WizardCloseReason) => void
}

export function Card({
  step,
  index,
  total,
  labels,
  scrollToTarget,
  className,
  onNavigate,
  onClose,
}: CardProps) {
  const titleId = useId()
  const descriptionId = useId()
  const isFirst = index === 0
  const isLast = index === total - 1
  const text = { ...DEFAULT_LABELS, ...labels }
  const primary = isLast
    ? { label: text.finish, run: () => onClose('finish') }
    : { label: text.next, run: () => onNavigate(index + 1) }

  const target = useTarget(step, scrollToTarget)
  const { refs, style, side, connector } = usePosition(step, target)

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') onClose('escape')
    else if (event.key === 'ArrowRight' && !isLast) onNavigate(index + 1)
    else if (event.key === 'ArrowLeft' && !isFirst) onNavigate(index - 1)
  }

  return (
    <div
      ref={refs.setFloating}
      popover="manual"
      role="dialog"
      aria-labelledby={titleId}
      aria-describedby={step.description == null ? undefined : descriptionId}
      tabIndex={-1}
      className={className ? `Wizard ${className}` : 'Wizard'}
      data-side={side}
      style={style}
      onKeyDown={onKeyDown}
    >
      <div className="Wizard__Header">
        <span className="Wizard__Counter">{text.counter(index + 1, total)}</span>
        <button type="button" className="Wizard__Close" onClick={() => onClose('close')}>
          {text.close}
        </button>
      </div>
      <div id={titleId} className="Wizard__Title">
        {step.title}
      </div>
      {step.description != null && (
        <div id={descriptionId} className="Wizard__Description">
          {step.description}
        </div>
      )}
      <div className="Wizard__Footer">
        {!isFirst && (
          <button type="button" className="Wizard__Button" onClick={() => onNavigate(index - 1)}>
            {text.prev}
          </button>
        )}
        <button
          type="button"
          className="Wizard__Button Wizard__Button_primary"
          onClick={primary.run}
        >
          {primary.label}
        </button>
      </div>
      {connector}
    </div>
  )
}

/** Finds the step's element after commit and scrolls it into view. */
function useTarget(step: WizardStep, scrollToTarget: boolean): Element | null {
  const [target, setTarget] = useState<Element | null>(null)

  useLayoutEffect(() => {
    const element = resolveTarget(step.target)
    setTarget(element)
    if (element && scrollToTarget) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      element.scrollIntoView({
        block: 'center',
        inline: 'nearest',
        behavior: reduce ? 'auto' : 'smooth',
      })
    }
  }, [step.target, scrollToTarget])

  return target
}

/**
 * Positions the card next to the target, opens it in the top layer,
 * and moves focus into it for the lifetime of the card.
 * Without a target the card sits in the centre of the viewport.
 */
function usePosition(step: WizardStep, target: Element | null) {
  const connectorRef = useRef<HTMLDivElement>(null)
  const { refs, floatingStyles, placement, middlewareData } = useFloating({
    strategy: 'fixed',
    placement: step.placement ?? 'right',
    elements: { reference: target },
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(GAP),
      flip({ fallbackAxisSideDirection: 'end', padding: 8 }),
      shift({ padding: 8 }),
      arrow({ element: connectorRef }),
    ],
  })

  useLayoutEffect(() => {
    const dialog = refs.floating.current
    if (!dialog) return
    if (typeof dialog.showPopover === 'function') dialog.showPopover()
    const previous = document.activeElement
    dialog.focus({ preventScroll: true })
    return () => {
      if (previous instanceof HTMLElement) previous.focus({ preventScroll: true })
    }
  }, [refs.floating])

  if (!target) {
    return { refs, style: undefined, side: 'center' as const, connector: null }
  }

  const side = placement.split('-')[0] as Side
  const { x, y } = middlewareData.arrow ?? {}
  const connector = (
    <div
      ref={connectorRef}
      className="Wizard__Connector"
      style={side === 'left' || side === 'right' ? { top: y } : { left: x }}
    />
  )
  return { refs, style: floatingStyles, side, connector }
}
