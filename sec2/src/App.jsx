import { useState } from 'react'
import './App.css'
import Challenge from './components/Challenge'

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <div>
      <Challenge/>
    </div>

  )
}

export default App
