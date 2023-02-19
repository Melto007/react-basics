import React, { useState } from 'react'

function App() {
  const [ counter, setCounter ] = useState(0)
  const [ title, setTitle ] = useState('')

  return (
    <React.Fragment>
        <h1>Counter: {counter}</h1>
        <button onClick={() => setCounter(counter + 1)}>Increase</button>

        <input onChange={(e) => setTitle(e.target.value)} />
        <p>{title}</p>
    </React.Fragment>
  );
}

export default App;
