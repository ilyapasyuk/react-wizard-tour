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

/** Waits until the card's enter and move animations have finished. */
const settled = () =>
  Promise.all(
    dialog()
      .getAnimations({ subtree: true })
      // The pin's beacon pulse is decoration and does not move anything.
      .filter((animation) => (animation.effect as KeyframeEffect).pseudoElement !== '::before')
      // A cancelled animation (a remounted node) rejects `finished`; it is settled too.
      .map((animation) => animation.finished.catch(() => undefined)),
  )

/** Waits until floating-ui has placed the card and it has finished animating in. */
const placed = async () => {
  await expect.poll(() => box(dialog()).left).not.toBe(0)
  await settled()
}

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

  it('outlines the target with the spotlight', async () => {
    renderAt(100, 300)
    await placed()
    const spotlight = document.querySelector('.Wizard__Spotlight') as HTMLElement
    await Promise.all(spotlight.getAnimations().map((animation) => animation.finished))
    const target = box(getTarget())
    const outline = box(spotlight)

    expect(spotlight.matches(':popover-open')).toBe(true)
    expect(getComputedStyle(spotlight).opacity).toBe('1')
    expectNear(outline.left, target.left - 6)
    expectNear(outline.top, target.top - 6)
    expectNear(outline.width, target.width + 12)
    expectNear(outline.height, target.height + 12)
  })

  it('renders no spotlight when it is turned off', () => {
    render(<Wizard steps={[{ target: 'body', title: 'Plain' }]} spotlight={false} />)
    expect(document.querySelector('.Wizard__Spotlight')).toBeNull()
  })

  it('glides to the next target instead of jumping', async () => {
    render(
      <>
        <div id="a" style={{ position: 'fixed', left: 100, top: 100, width: 100, height: 40 }} />
        <div id="b" style={{ position: 'fixed', left: 100, top: 500, width: 100, height: 40 }} />
        <Wizard
          steps={[
            { target: '#a', title: 'A' },
            { target: '#b', title: 'B' },
          ]}
          scrollToTarget={false}
        />
      </>,
    )
    await placed()
    const start = box(dialog()).top
    await userEvent.keyboard('{ArrowRight}')
    await expect.poll(() => box(dialog()).top).toBeGreaterThan(start + 20)
    const midway = box(dialog()).top
    await settled()
    const end = box(dialog()).top

    expect(end - start).toBeCloseTo(400, 0)
    expect(midway).toBeLessThan(end - 20)
  })

  it('treats a hidden target as missing', async () => {
    render(
      <>
        <div id="hidden" style={{ display: 'none' }} />
        <Wizard steps={[{ target: '#hidden', title: 'Hidden' }]} />
      </>,
    )
    await settled()
    expect(dialog()).toHaveAttribute('data-side', 'center')
    expect(document.querySelector('.Wizard__Spotlight')).not.toHaveAttribute('data-active')
  })

  it('centres the card when the target is missing', async () => {
    render(<Wizard steps={[{ target: '#nowhere', title: 'Lost' }]} />)
    await settled()
    const card = box(dialog())
    expectNear(card.left + card.width / 2, 500)
    expectNear(card.top + card.height / 2, 350)
  })
})
