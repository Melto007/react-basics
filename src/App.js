import React, { useState, useReducer } from 'react'

const reducer = (state, action) => {
  switch(action.type) {
    case "INCREMENT":
      return {
        count: state.count + 1
      }
    case "DECREMENT": 
      return {
        count: state.count - 1
      }
    case "RESET":
      return {
        count: 0
      }
    default:
      return state
  }
}

function App() {
  const [ counter, setCounter ] = useState(0)
  const [ title, setTitle ] = useState('')

  const [ state, dispatch ] = useReducer(reducer, { count: 0 })

  return (
    <React.Fragment>
        <div>
          <h1>Counter: {counter}</h1>
          <button onClick={() => setCounter(counter + 1)}>Increase</button>

          <input onChange={(e) => setTitle(e.target.value)} />
          <p>{title}</p>
        </div>

        <div>
          <h1>Count: {state.count}</h1>
          <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
          <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
          <button onClick={() => dispatch({ type: "RESET" })}>reset</button>
        </div>
    </React.Fragment>
  );
}

export default App;
