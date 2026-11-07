import { render, screen } from '@testing-library/react'
import { useState } from 'react'
import { page, userEvent } from 'vitest/browser'

import './style.css'
import { Wizard, type WizardPlacement } from '.'

const box = (el: Element) => el.getBoundingClientRect()
/** Layout is rounded to whole pixels: allow 1px. */
const expectNear = (actual: number, expected: number) =>
  expect(Math.abs(actual - expected)).toBeLessThanOrEqual(1)

const getTarget = () => {
  const target = document.getElementById('target')
  if (!target) throw new Error('#target is not rendered')
  return target
}

const dialog = () => screen.getByRole('dialog')
const connector = () => dialog().querySelector('.Wizard__Connector') as HTMLElement

/** A 100×40 target at a fixed spot in the viewport. */
function renderAt(left: number, top: number, placement?: WizardPlacement) {
  return render(
    <>
      <div id="target" style={{ position: 'fixed', left, top, width: 100, height: 40 }} />
      <Wizard steps={[{ target: '#target', title: 'Here', placement }]} scrollToTarget={false} />
    </>,
  )
}

/** Waits until floating-ui has placed the card. */
const placed = () => expect.poll(() => box(dialog()).left).not.toBe(0)

/** A tall page whose tour starts from a button at the top. */
function TallPage() {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ height: 3000 }}>
      <button type="button" onClick={() => setOpen(true)}>
        Start tour
      </button>
      <Wizard
        steps={[{ target: '#nowhere', title: 'Here' }]}
        open={open}
        onOpenChange={setOpen}
        scrollToTarget={false}
      />
    </div>
  )
}

describe('Wizard positioning', () => {
  beforeEach(() => page.viewport(1000, 700))

  it('opens in the top layer', () => {
    renderAt(100, 300)
    expect(dialog().matches(':popover-open')).toBe(true)
  })

  it('places the card to the right with a connector touching the target', async () => {
    renderAt(100, 300)
    await placed()
    const target = box(getTarget())
    const card = box(dialog())
    const line = box(connector())

    expect(dialog()).toHaveAttribute('data-side', 'right')
    expectNear(card.left, target.right + 24)
    expectNear(card.top + card.height / 2, target.top + target.height / 2)
    expectNear(line.left, target.right)
    expectNear(line.right, card.left)
    expectNear((line.top + line.bottom) / 2, target.top + target.height / 2)
  })

  it('draws the connector on the left side too', async () => {
    renderAt(700, 300, 'left')
    await placed()
    const target = box(getTarget())
    const line = box(connector())

    expect(dialog()).toHaveAttribute('data-side', 'left')
    expectNear(line.right, target.left)
    expectNear((line.top + line.bottom) / 2, target.top + target.height / 2)
  })

  it('stays inside the viewport when the target hugs the top edge', async () => {
    renderAt(100, 0)
    await placed()
    expect(box(dialog()).top).toBeGreaterThanOrEqual(8)
  })

  it('honours the preferred placement', async () => {
    renderAt(400, 100, 'bottom')
    await placed()
    const target = box(getTarget())
    const card = box(dialog())

    expect(dialog()).toHaveAttribute('data-side', 'bottom')
    expectNear(card.top, target.bottom + 24)
    const line = box(connector())
    expectNear((line.left + line.right) / 2, target.left + target.width / 2)
  })

  it('moves to another side and stays on screen when the preferred side does not fit', async () => {
    await page.viewport(390, 700)
    renderAt(145, 300)
    await placed()
    const card = box(dialog())

    expect(['top', 'bottom']).toContain(dialog().dataset.side)
    expect(card.left).toBeGreaterThanOrEqual(0)
    expect(card.right).toBeLessThanOrEqual(390)
  })

  it('follows the target when it moves', async () => {
    renderAt(100, 300)
    await placed()
    const before = box(dialog()).top

    getTarget().style.top = '400px'
    await expect.poll(() => box(dialog()).top).toBeCloseTo(before + 100, 0)
  })

  it('stays attached to an in-flow target after the page scrolls', async () => {
    render(
      <div style={{ height: 3000, paddingTop: 900 }}>
        <div id="target" style={{ marginLeft: 100, width: 100, height: 40 }} />
        <Wizard steps={[{ target: '#target', title: 'Here' }]} scrollToTarget={false} />
      </div>,
    )
    window.scrollTo(0, 600)
    await expect.poll(() => box(dialog()).left - box(getTarget()).right).toBe(24)
    const target = box(getTarget())
    const card = box(dialog())
    expectNear(card.top + card.height / 2, target.top + target.height / 2)
    window.scrollTo(0, 0)
  })

  it('does not scroll the page back to the opener on close', async () => {
    render(<TallPage />)
    await userEvent.click(screen.getByRole('button', { name: 'Start tour' }))
    window.scrollTo(0, 1000)
    await userEvent.click(screen.getByRole('button', { name: 'Close' }))

    expect(screen.getByRole('button', { name: 'Start tour' })).toHaveFocus()
    expect(window.scrollY).toBe(1000)
    window.scrollTo(0, 0)
  })

  it('centres the card when the target is missing', () => {
    render(<Wizard steps={[{ target: '#nowhere', title: 'Lost' }]} />)
    const card = box(dialog())
    expectNear(card.left + card.width / 2, 500)
    expectNear(card.top + card.height / 2, 350)
  })
})
