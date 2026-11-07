import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef, useState } from 'react'
import { vi } from 'vitest'

import { Wizard, type WizardProps, type WizardStep } from '.'

const steps: WizardStep[] = [
  { target: '#one', title: 'First', description: 'First description' },
  { target: '#two', title: 'Second' },
  { target: '#three', title: 'Third' },
]

function renderTour(props: Partial<WizardProps> = {}) {
  const user = userEvent.setup()
  const utils = render(
    <>
      <button type="button" id="one">
        one
      </button>
      <button type="button" id="two">
        two
      </button>
      <button type="button" id="three">
        three
      </button>
      <Wizard steps={steps} {...props} />
    </>,
  )
  return { user, ...utils }
}

/** A page that starts the tour from a button and owns its visibility. */
function ControlledTour() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Start tour
      </button>
      <Wizard steps={steps} open={open} onOpenChange={setOpen} />
    </>
  )
}

const dialog = () => screen.queryByRole('dialog')
const button = (name: string) => screen.getByRole('button', { name })

describe('Wizard', () => {
  it('shows the first step as a dialog named by its title', () => {
    renderTour()
    expect(dialog()).toHaveClass('Wizard')
    expect(dialog()).not.toHaveAttribute('data-side', 'center')
    expect(screen.getByRole('dialog', { name: 'First' })).toHaveAccessibleDescription(
      'First description',
    )
    expect(screen.getByText('1 of 3')).toBeInTheDocument()
  })

  it('walks forward and back through the steps', async () => {
    const onStepChange = vi.fn()
    const { user } = renderTour({ onStepChange })

    expect(screen.queryByRole('button', { name: 'Back' })).not.toBeInTheDocument()
    await user.click(button('Next'))
    expect(dialog()).toHaveAccessibleName('Second')
    expect(screen.getByText('2 of 3')).toBeInTheDocument()

    await user.click(button('Back'))
    expect(dialog()).toHaveAccessibleName('First')
    expect(onStepChange.mock.calls).toEqual([[1], [0]])
  })

  it('offers Finish on the last step and closes with reason "finish"', async () => {
    const onOpenChange = vi.fn()
    const { user } = renderTour({ onOpenChange, defaultStep: 2 })

    expect(screen.queryByRole('button', { name: 'Next' })).not.toBeInTheDocument()
    await user.click(button('Finish'))
    expect(dialog()).not.toBeInTheDocument()
    expect(onOpenChange).toHaveBeenCalledWith(false, 'finish')
  })

  it('closes without any callbacks when uncontrolled', async () => {
    const errors: unknown[] = []
    const onError = (event: ErrorEvent) => errors.push(event.error)
    window.addEventListener('error', onError)
    try {
      const { user } = renderTour()
      await user.click(button('Close'))
      expect(dialog()).not.toBeInTheDocument()
      expect(errors).toEqual([])
    } finally {
      window.removeEventListener('error', onError)
    }
  })

  it('closes with the close button', async () => {
    const onOpenChange = vi.fn()
    const { user } = renderTour({ onOpenChange })

    await user.click(button('Close'))
    expect(dialog()).not.toBeInTheDocument()
    expect(onOpenChange).toHaveBeenCalledWith(false, 'close')
  })

  it('supports the keyboard: Escape closes, arrows navigate', async () => {
    const onOpenChange = vi.fn()
    const { user } = renderTour({ onOpenChange })

    await user.keyboard('{ArrowRight}')
    expect(dialog()).toHaveAccessibleName('Second')
    await user.keyboard('{ArrowLeft}')
    expect(dialog()).toHaveAccessibleName('First')
    await user.keyboard('{ArrowLeft}')
    expect(dialog()).toHaveAccessibleName('First')

    await user.keyboard('{Escape}')
    expect(dialog()).not.toBeInTheDocument()
    expect(onOpenChange).toHaveBeenCalledWith(false, 'escape')
  })

  it('does not finish the tour with ArrowRight on the last step', async () => {
    const onOpenChange = vi.fn()
    const { user } = renderTour({ onOpenChange, defaultStep: 2 })

    await user.keyboard('{ArrowRight}')
    expect(dialog()).toHaveAccessibleName('Third')
    expect(onOpenChange).not.toHaveBeenCalled()
  })

  it('follows a controlled step and only requests changes', async () => {
    const onStepChange = vi.fn()
    const { user, rerender } = renderTour({ step: 0, onStepChange })

    await user.click(button('Next'))
    expect(onStepChange).toHaveBeenCalledWith(1)
    expect(dialog()).toHaveAccessibleName('First')

    rerender(<Wizard steps={steps} step={2} onStepChange={onStepChange} />)
    expect(dialog()).toHaveAccessibleName('Third')
  })

  it('follows controlled visibility', async () => {
    const user = userEvent.setup()
    render(<ControlledTour />)

    expect(dialog()).not.toBeInTheDocument()
    await user.click(button('Start tour'))
    expect(dialog()).toBeInTheDocument()
    await user.click(button('Close'))
    expect(dialog()).not.toBeInTheDocument()
    await user.click(button('Start tour'))
    expect(dialog()).toBeInTheDocument()
  })

  it('clamps a step index that is out of range', () => {
    renderTour({ step: 10 })
    expect(dialog()).toHaveAccessibleName('Third')
  })

  it('renders nothing without steps', () => {
    render(<Wizard steps={[]} />)
    expect(dialog()).not.toBeInTheDocument()
  })

  it('renders a string title as text, never as HTML', () => {
    render(<Wizard steps={[{ target: 'body', title: '<img src=x onerror=alert(1)>' }]} />)
    expect(dialog()).toHaveAccessibleName('<img src=x onerror=alert(1)>')
    expect(document.querySelector('img')).toBeNull()
  })

  it('accepts rich titles and custom labels', () => {
    render(
      <Wizard
        steps={[{ target: 'body', title: <strong>Bold</strong> }]}
        labels={{ finish: 'Done', close: 'Skip', counter: (s, t) => `${s}/${t}` }}
      />,
    )
    expect(dialog()).toHaveAccessibleName('Bold')
    expect(button('Done')).toBeInTheDocument()
    expect(button('Skip')).toBeInTheDocument()
    expect(screen.getByText('1/1')).toBeInTheDocument()
  })

  it('scrolls the target into view, found by selector or by ref', async () => {
    const ref = createRef<HTMLDivElement>()
    const user = userEvent.setup()
    render(
      <>
        <p id="by-selector">a</p>
        <div ref={ref}>b</div>
        <Wizard
          steps={[
            { target: '#by-selector', title: 'Selector' },
            { target: ref, title: 'Ref' },
          ]}
        />
      </>,
    )
    const scrolled = vi.mocked(Element.prototype.scrollIntoView)
    expect(scrolled.mock.contexts.at(-1)).toBe(document.getElementById('by-selector'))

    await user.click(button('Next'))
    expect(scrolled.mock.contexts.at(-1)).toBe(ref.current)
  })

  it('scrolls smoothly to the centre of the viewport', () => {
    renderTour()
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
      block: 'center',
      inline: 'nearest',
      behavior: 'smooth',
    })
  })

  it('jumps without animation when the user prefers reduced motion', () => {
    const matchMedia = window.matchMedia
    window.matchMedia = (query: string) =>
      ({ matches: query === '(prefers-reduced-motion: reduce)' }) as MediaQueryList
    try {
      renderTour()
      expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith(
        expect.objectContaining({ behavior: 'auto' }),
      )
    } finally {
      window.matchMedia = matchMedia
    }
  })

  it('keeps the card out of the page tab order', async () => {
    const { user } = renderTour()
    await user.tab()
    expect(button('Close')).toHaveFocus()
  })

  it('adds a custom class next to the base class', () => {
    renderTour({ className: 'my-tour' })
    expect(dialog()).toHaveClass('Wizard', 'my-tour')
  })

  it('does not scroll when scrollToTarget is false', () => {
    renderTour({ scrollToTarget: false })
    expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled()
  })

  it('still shows the step when its target is missing', () => {
    render(<Wizard steps={[{ target: '#nowhere', title: 'Lost' }]} />)
    expect(dialog()).toHaveAccessibleName('Lost')
    expect(dialog()).toHaveAttribute('data-side', 'center')
  })

  it('moves focus into the dialog and returns it on close', async () => {
    const user = userEvent.setup()
    render(<ControlledTour />)

    await user.click(button('Start tour'))
    expect(dialog()).toContainElement(document.activeElement as HTMLElement)

    await user.keyboard('{Escape}')
    expect(button('Start tour')).toHaveFocus()
  })

  it('opens in the top layer when the Popover API exists', () => {
    const showPopover = vi.fn()
    HTMLElement.prototype.showPopover = showPopover
    try {
      renderTour()
      expect(showPopover).toHaveBeenCalled()
      expect(showPopover.mock.contexts[0]).toHaveAttribute('popover', 'manual')
    } finally {
      // @ts-expect-error jsdom has no Popover API; remove the stub
      delete HTMLElement.prototype.showPopover
    }
  })

  it('keeps working after the target list changes length', () => {
    const { rerender } = renderTour({ defaultStep: 2 })
    act(() => rerender(<Wizard steps={steps.slice(0, 1)} defaultStep={2} />))
    expect(dialog()).toHaveAccessibleName('First')
  })
})
