import { useEffect, useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [checked, setChecked] = useState(false)
  const [text, setText] = useState('')
  const upper = useMemo(() => text.toUpperCase(), [text]);

  useEffect(() => {
    console.log(`Checkbox was ${checked ? 'checked' : 'unchecked'}`);
  }, [checked]);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div className="card">
        <input type='checkbox' onChange={() => setChecked((checked) => checked = !checked)} />
        <label>
          &nbsp; Check me!
        </label>
        <p>
          Checkbox is {checked ? 'checked' : 'not checked'}
        </p>
        <input type='text' placeholder='Type something...' onInput={(e) => setText((e.target as HTMLInputElement).value)}/>
        <p>
          You typed: {text}
        </p>
        <p>
          Uppercase: {upper}
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
