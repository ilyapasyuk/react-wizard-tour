import React from 'react'
import Wizard from './Wizard'

const rule = [
    {
        elementId: 'elementIdOne',
        title: 'Title 1',
        description: 'description 1',
    },
    {
        elementId: 'elementIdTwo',
        title: 'Title 2',
        description: 'description 2',
    },
]

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <span id="elementIdOne">
                    Edit <code>src/App.js</code> and save to reload.
                </span>
                <a
                    id="elementIdTwo"
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
            <Wizard rule={rule} />
        </div>
    )
}

export default App
