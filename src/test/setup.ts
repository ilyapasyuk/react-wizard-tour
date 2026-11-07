import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'

afterEach(cleanup)

// jsdom has no layout: give elements the scroll API browsers have.
beforeEach(() => {
  Element.prototype.scrollIntoView = vi.fn()
})

// jsdom has no matchMedia; report "no preference" like a default browser.
window.matchMedia = (query: string) =>
  ({ matches: false, media: query, addEventListener() {}, removeEventListener() {} }) as never
