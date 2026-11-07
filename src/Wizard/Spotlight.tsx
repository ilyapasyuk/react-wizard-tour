import { autoUpdate } from '@floating-ui/react-dom'
import { useLayoutEffect, useRef } from 'react'

/** Space between the target and the outline. */
const PAD = 6

interface SpotlightProps {
  target: Element | null
  moving: boolean
}

/**
 * Outlines the target and dims the rest of the page with one huge box-shadow.
 * The element ignores the pointer and a shadow is not hit-tested, so the page stays clickable.
 * It stays mounted without a target so that it opens in the top layer before the card.
 */
export function Spotlight({ target, moving }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const element = ref.current
    if (element && typeof element.showPopover === 'function') element.showPopover()
  }, [])

  useLayoutEffect(() => {
    const element = ref.current
    if (!element || !target) return
    // Writes styles directly: it runs on every scroll frame and must not re-render React.
    return autoUpdate(target, element, () => {
      const box = target.getBoundingClientRect()
      element.style.translate = `${box.left - PAD}px ${box.top - PAD}px`
      element.style.width = `${box.width + PAD * 2}px`
      element.style.height = `${box.height + PAD * 2}px`
    })
  }, [target])

  return (
    <div
      ref={ref}
      popover="manual"
      aria-hidden="true"
      className="Wizard__Spotlight"
      data-active={target ? true : undefined}
      data-moving={moving || undefined}
    />
  )
}
