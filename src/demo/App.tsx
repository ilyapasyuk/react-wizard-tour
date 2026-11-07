import { type CSSProperties, useEffect, useState } from 'react'

import { Wizard, type WizardStep } from '../Wizard'

const ACCENTS = ['#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#e11d48', '#18181b'] as const
const THEMES = { system: 'light dark', light: 'light', dark: 'dark' } as const
type Theme = keyof typeof THEMES

const INSTALL = 'npm i react-onboarding'

const steps: WizardStep[] = [
  {
    target: '#demo-search',
    title: 'Find anything',
    description: 'Search projects, people and settings. Press / from anywhere.',
    placement: 'bottom',
  },
  {
    target: '#demo-new',
    title: 'Start a project',
    description: 'Create a project in one click. Templates come later.',
    placement: 'bottom',
  },
  {
    target: '#demo-stats',
    title: 'Your numbers at a glance',
    description: 'Revenue, active users and churn update every minute.',
  },
  {
    target: '#demo-chart',
    title: 'Spot the trend',
    description: 'Hover the chart to compare any two weeks.',
    placement: 'top',
  },
  {
    target: '#demo-settings',
    title: 'Make it yours',
    description: 'Invite your team and connect billing in Settings.',
    placement: 'right',
  },
  {
    target: '#demo-playground',
    title: 'Now play with it',
    description: (
      <>
        Change the accent, the theme or the spotlight, then press <b>Restart tour</b>.
      </>
    ),
  },
]

export function App() {
  const [open, setOpen] = useState(true)
  const [accent, setAccent] = useState<string>(ACCENTS[0])
  const [theme, setTheme] = useState<Theme>('system')
  const [spotlight, setSpotlight] = useState(true)

  useEffect(() => {
    document.documentElement.style.colorScheme = THEMES[theme]
  }, [theme])

  const vars = {
    '--wizard-accent': accent,
    '--wizard-color-scheme': THEMES[theme],
  } as CSSProperties

  return (
    <div className="Page" style={vars}>
      <Header />
      <main>
        <Hero onStart={() => setOpen(true)} />
        <section className="Stage">
          <AppMock />
          <Playground
            accent={accent}
            theme={theme}
            spotlight={spotlight}
            onAccent={setAccent}
            onTheme={setTheme}
            onSpotlight={setSpotlight}
            onRestart={() => setOpen(true)}
          />
        </section>
        <Features />
      </main>
      <footer className="Footer">
        MIT · <a href="https://github.com/ilyapasyuk/react-wizard-tour">GitHub</a> ·{' '}
        <a href="https://www.npmjs.com/package/react-onboarding">npm</a>
      </footer>
      <Wizard steps={steps} open={open} onOpenChange={setOpen} spotlight={spotlight} />
    </div>
  )
}

function Header() {
  return (
    <header className="Header">
      <a className="Logo" href="#top">
        <span className="Logo__Mark" aria-hidden="true" />
        react-onboarding
      </a>
      <nav className="Header__Nav">
        <a href="#features">Features</a>
        <a href="https://github.com/ilyapasyuk/react-wizard-tour#readme">Docs</a>
        <a className="Header__GitHub" href="https://github.com/ilyapasyuk/react-wizard-tour">
          GitHub
        </a>
      </nav>
    </header>
  )
}

function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section className="Hero" id="top">
      <span className="Hero__Eyebrow">v2 · React 18 & 19 · 2.4 KB gzip</span>
      <h1 className="Hero__Title">Product tours that point the way</h1>
      <p className="Hero__Lead">
        Walk users through your interface step by step. The card follows its target, flips when it
        runs out of room and glides from step to step.
      </p>
      <div className="Hero__Actions">
        <button type="button" className="Btn Btn_primary" onClick={onStart}>
          Take the tour
        </button>
        <CopyCommand text={INSTALL} />
      </div>
    </section>
  )
}

function CopyCommand({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 1500)
    return () => clearTimeout(timer)
  }, [copied])

  return (
    <button
      type="button"
      className="Btn Btn_code"
      onClick={() => navigator.clipboard.writeText(text).then(() => setCopied(true))}
    >
      <code>
        <span aria-hidden="true">$ </span>
        {text}
      </code>
      <span className="Btn__Hint">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  )
}

function AppMock() {
  return (
    <section className="Mock" aria-label="Example dashboard">
      <div className="Mock__Chrome" aria-hidden="true">
        <i />
        <i />
        <i />
        <span className="Mock__Url">app.acme.dev</span>
      </div>
      <div className="Mock__Body">
        <aside className="Mock__Sidebar">
          <div className="Mock__Brand">
            <span className="Mock__BrandMark" /> Acme
          </div>
          <a className="Mock__NavItem Mock__NavItem_active" href="#top">
            Overview
          </a>
          <a className="Mock__NavItem" href="#top">
            Projects
          </a>
          <a className="Mock__NavItem" href="#top">
            Team
          </a>
          <a className="Mock__NavItem" href="#top" id="demo-settings">
            Settings
          </a>
        </aside>
        <div className="Mock__Main">
          <div className="Mock__Toolbar">
            <label className="Mock__Search" id="demo-search">
              <SearchIcon />
              <input placeholder="Search…" aria-label="Search" />
              <kbd>/</kbd>
            </label>
            <button type="button" className="Btn Btn_primary Btn_small" id="demo-new">
              + New project
            </button>
            <span className="Mock__Avatar" aria-hidden="true">
              IP
            </span>
          </div>
          <div className="Mock__Stats" id="demo-stats">
            <Stat label="Revenue" value="$48.2k" delta="+12%" />
            <Stat label="Active users" value="3,914" delta="+4%" />
            <Stat label="Churn" value="1.8%" delta="−0.3%" />
          </div>
          <div className="Mock__Chart" id="demo-chart">
            <div className="Mock__ChartHead">
              <span>Weekly revenue</span>
              <span className="Mock__Muted">Last 12 weeks</span>
            </div>
            <Chart />
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="Stat">
      <span className="Mock__Muted">{label}</span>
      <strong>{value}</strong>
      <span className="Stat__Delta">{delta}</span>
    </div>
  )
}

function Chart() {
  const points = [18, 24, 21, 30, 28, 36, 33, 42, 40, 51, 48, 58]
  const step = 300 / (points.length - 1)
  const line = points.map((y, i) => `${i === 0 ? 'M' : 'L'}${i * step},${70 - y}`).join(' ')
  return (
    <svg className="Chart" viewBox="0 0 300 70" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--wizard-accent)', stopOpacity: 0.25 }} />
          <stop offset="1" style={{ stopColor: 'var(--wizard-accent)', stopOpacity: 0 }} />
        </linearGradient>
      </defs>
      <path d={`${line} L300,70 L0,70 Z`} fill="url(#chart-fill)" />
      <path d={line} fill="none" style={{ stroke: 'var(--wizard-accent)' }} strokeWidth="2" />
    </svg>
  )
}

interface PlaygroundProps {
  accent: string
  theme: Theme
  spotlight: boolean
  onAccent: (accent: string) => void
  onTheme: (theme: Theme) => void
  onSpotlight: (on: boolean) => void
  onRestart: () => void
}

function Playground(props: PlaygroundProps) {
  const { accent, theme, spotlight, onAccent, onTheme, onSpotlight, onRestart } = props
  const css = `:root {\n  --wizard-accent: ${accent};${
    theme === 'system' ? '' : `\n  --wizard-color-scheme: ${theme};`
  }\n}`
  const jsx = `<Wizard steps={steps}${spotlight ? '' : ' spotlight={false}'} />`

  return (
    <aside className="Playground" id="demo-playground">
      <h2 className="Playground__Title">Playground</h2>

      <fieldset className="Field">
        <legend>Accent</legend>
        <div className="Swatches">
          {ACCENTS.map((color) => (
            <button
              key={color}
              type="button"
              className="Swatch"
              style={{ background: color }}
              aria-label={color}
              aria-pressed={accent === color}
              onClick={() => onAccent(color)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="Field">
        <legend>Theme</legend>
        <div className="Segmented">
          {(Object.keys(THEMES) as Theme[]).map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={theme === name}
              onClick={() => onTheme(name)}
            >
              {name[0]?.toUpperCase() + name.slice(1)}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="Toggle">
        <input
          type="checkbox"
          checked={spotlight}
          onChange={(event) => onSpotlight(event.target.checked)}
        />
        <span className="Toggle__Track" aria-hidden="true" />
        Spotlight
      </label>

      <pre className="Code">
        <code>
          {css}
          {'\n\n'}
          {jsx}
        </code>
      </pre>

      <button type="button" className="Btn Btn_primary Btn_block" onClick={onRestart}>
        Restart tour
      </button>
    </aside>
  )
}

const FEATURES = [
  ['Follows its target', 'Stays attached on scroll and resize, flips to another side near edges.'],
  ['Animated steps', 'Glides between targets; content crossfades. Reduced motion respected.'],
  ['Spotlight', 'Dims the page around the target without blocking clicks.'],
  ['Keyboard and screen readers', 'Arrow keys, Esc, focus management, a labelled dialog.'],
  ['Top layer', 'Uses the Popover API: no z-index wars with your modals.'],
  ['Themeable', 'CSS variables, light and dark out of the box.'],
] as const

function Features() {
  return (
    <section className="Features" id="features">
      {FEATURES.map(([title, text]) => (
        <div key={title} className="Feature">
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      ))}
    </section>
  )
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
