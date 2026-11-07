import { createRoot } from 'react-dom/client'

import { App } from './App'

const container = document.getElementById('wizardDevApp')

if (container) {
  createRoot(container).render(<App />)
}
