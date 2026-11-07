import { useState } from 'react'

import './Wizard/style.css'

import { Wizard, type WizardStep } from './Wizard'

const LOREM =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."

const steps: WizardStep[] = [
  {
    target: '#elementId1',
    title: 'Title 1',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
  {
    target: '#elementId2',
    title: 'Title 2',
    description: (
      <div>
        <span style={{ marginRight: 5 }}>A description can hold JSX, like a link to</span>
        <a href="https://pasyuk.com" target="_blank" rel="noreferrer">
          the author’s site
        </a>
      </div>
    ),
  },
  {
    target: '#elementId3',
    title: 'Title 3',
    description: 'description 3',
  },
  {
    target: '#elementId4',
    title: 'Title 4',
    description: 'description 4',
  },
  {
    target: '#elementId5',
    title: 'Title 5',
    description: 'description 5',
  },
]

function App() {
  const [open, setOpen] = useState(true)
  return (
    <div
      style={{
        width: '600px',
        margin: '0 auto',
      }}
    >
      <h1>React Onboarding</h1>
      <button type="button" onClick={() => setOpen(true)}>
        Start tour
      </button>
      <code>
        <pre>npm i react-onboarding</pre>
      </code>
      <header>
        <p>{LOREM}</p>
        <p>
          <span id="elementId1">
            Edit <code>src/App.tsx</code> and save to reload.
          </span>
          <a
            id="elementId2"
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </p>
        <img
          id="elementId3"
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDA5eXdkOGhrOGw1YWc1ZzM4YmMzZzdlMG5nZ3JlY3hkeXYxYjVpZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ataczOlHD9YYjumCh7/giphy.gif"
          alt=""
        />
      </header>
      <main>
        <p>{LOREM}</p>
        <p id="elementId4">{LOREM}</p>
        <p>{LOREM}</p>
        <p id="elementId5">{LOREM}</p>
        <p>{LOREM}</p>
        <p>{LOREM}</p>
      </main>
      <Wizard steps={steps} open={open} onOpenChange={setOpen} />
    </div>
  )
}

export { App }
