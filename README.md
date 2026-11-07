# react-onboarding

Onboarding tour for React: a card that points at an element on the page and walks the user through steps.

- 1.7 KB gzip JS + 1 KB CSS; one dependency, [`@floating-ui/react-dom`](https://floating-ui.com)
- React 18 and 19, TypeScript types included
- Stays attached to its target on scroll and resize, flips to another side when it does not fit
- Renders in the browser top layer (Popover API): no `z-index` fights
- Keyboard: `←` `→` to navigate, `Esc` to close; focus moves into the card and back
- Light and dark themes, restyled with CSS variables

![size](https://img.shields.io/bundlephobia/minzip/react-onboarding.svg)
![version](https://img.shields.io/npm/v/react-onboarding.svg)

![Preview](https://github.com/ilyapasyuk/react-wizard-tour/assets/5953765/83f51ea6-4d00-4eec-8328-2c6c71c28325)

## Install

```sh
npm install react-onboarding
```

## Use

```tsx
import { useRef } from 'react'
import { Wizard, type WizardStep } from 'react-onboarding'
import 'react-onboarding/style.css'

export function App() {
  const saveButton = useRef<HTMLButtonElement>(null)

  const steps: WizardStep[] = [
    { target: '#search', title: 'Search', description: 'Find anything here.' },
    { target: saveButton, title: 'Save', description: <b>Saves a draft.</b>, placement: 'bottom' },
  ]

  return (
    <>
      <input id="search" />
      <button ref={saveButton}>Save</button>
      <Wizard steps={steps} />
    </>
  )
}
```

### Start the tour from a button

```tsx
const [open, setOpen] = useState(false)

<button onClick={() => setOpen(true)}>Show tour</button>
<Wizard steps={steps} open={open} onOpenChange={setOpen} />
```

`onOpenChange(false, reason)` reports why the tour closed: `'close'`, `'escape'` or `'finish'`. Use `'finish'` to remember that the user completed it.

## Props

| Prop             | Type                                            | Default |
| ---------------- | ----------------------------------------------- | ------- |
| `steps`          | `WizardStep[]`                                  | —       |
| `open`           | `boolean` — controlled visibility               |         |
| `defaultOpen`    | `boolean` — initial visibility, uncontrolled    | `true`  |
| `onOpenChange`   | `(open: boolean, reason) => void` — on close    |         |
| `step`           | `number` — controlled zero-based step           |         |
| `defaultStep`    | `number` — initial step, uncontrolled           | `0`     |
| `onStepChange`   | `(step: number) => void`                        |         |
| `labels`         | `{ prev, next, finish, close, counter }`        | English |
| `scrollToTarget` | `boolean` — scroll each target into view        | `true`  |
| `className`      | `string` — added to the card                    |         |

### `WizardStep`

| Field         | Type                                                | Default   |
| ------------- | --------------------------------------------------- | --------- |
| `target`      | CSS selector or `RefObject<Element>`                | —         |
| `title`       | `ReactNode`                                         | —         |
| `description` | `ReactNode`                                         |           |
| `placement`   | `'top' \| 'right' \| 'bottom' \| 'left'`            | `'right'` |

A step whose target is not on the page shows the card in the centre of the viewport.

### Labels

```tsx
<Wizard
  steps={steps}
  labels={{ prev: 'Назад', next: 'Далее', finish: 'Готово', close: 'Закрыть', counter: (s, t) => `${s} из ${t}` }}
/>
```

## Styling

Override variables on `.Wizard` or on your own `className`:

```css
.Wizard {
  --wizard-accent: #e11d48; /* connector and focus ring */
  --wizard-width: 320px;
  --wizard-radius: 12px;
}
```

All variables: `--wizard-accent`, `--wizard-bg`, `--wizard-fg`, `--wizard-muted`, `--wizard-border`, `--wizard-button-bg`, `--wizard-primary-bg`, `--wizard-primary-fg`, `--wizard-radius`, `--wizard-width`, `--wizard-shadow`. The card carries `data-side="top|right|bottom|left|center"`.

## Migrating from 1.x

2.0 breaks the API. The 1.x bundle crashes on React 19, so upgrade before moving to React 19.

| 1.x                                         | 2.0                                                        |
| ------------------------------------------- | ---------------------------------------------------------- |
| `import Wizard from 'react-onboarding'`     | `import { Wizard } from 'react-onboarding'`                |
| CSS injected automatically                  | `import 'react-onboarding/style.css'` once                 |
| `rule={[{ elementId: 'save', ... }]}`       | `steps={[{ target: '#save', ... }]}`                       |
| `title` rendered as HTML                    | `title` is a `ReactNode`; pass JSX instead of HTML strings |
| `isShow`                                    | `open` + `onOpenChange`, or `defaultOpen`                  |
| `prevButtonTitle`, `nextButtonTitle`, `closeButtonTitle` | `labels={{ prev, next, close }}`              |
| `closeButtonElement`                        | `labels={{ close: <Icon /> }}`                             |
| `pinColor`, `lineColor`                     | CSS variable `--wizard-accent`                             |
| `isScrollToElement` (default `false`)       | `scrollToTarget` (default `true`)                          |
| UMD and CommonJS builds                     | ES module only; `require()` works on Node 20.19+           |

## Develop

```sh
npm install
npm run dev            # demo on http://localhost:3000
npm test               # unit tests in jsdom + positioning tests in Chromium
npm run lint           # Biome
npm run mutation       # Stryker
```

The browser tests need Chromium once: `npx playwright install chromium-headless-shell`.

## License

MIT
