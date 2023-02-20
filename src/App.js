import React, { useState, useReducer, useEffect, useRef } from 'react'
import './index.css'

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
  const [ message, setMessage ] = useState(null)
  const [ error, setError ] = useState(null)
  const [ loading, setLoading ] = useState(true)

  const inputRef = useRef()
  const visibleText = useRef()
  const greeting = useRef()

  const changePasswordStatus = () => {
    if(inputRef.current.type === "text") {
      inputRef.current.type = 'password'
    } else {
      inputRef.current.type = 'text'
    }
  }

  const [ state, dispatch ] = useReducer(reducer, { count: 0 })

  const fetchAPI = async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if(!response.ok) {
        throw new Error(
          `This is an HTTP Error ${response.status}`
        )
      }
      const data = await response.json()
      setMessage(data)
      setError(null)
    } catch(error) {
        setError(error.message)
        setMessage(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAPI('https://jsonplaceholder.typicode.com/todos/')
  }, [])

  const hideText = () => {
    const heading = greeting.current.childNodes[0]
    const propertyValue = getComputedStyle(heading)
    if(propertyValue.display === 'none') {
      visibleText.current.style.setProperty('display', 'block')
    } else {
      visibleText.current.style.setProperty('display', 'none')
    }
  }

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

        <div>
            <input type='password' ref={inputRef} />
            <input type="checkbox" onChange={changePasswordStatus} />
        </div>

        <div className='greeting' ref={greeting}>
          <h1 className='hideText' ref={visibleText}>Hello World...!</h1>
          <input type="checkbox" onChange={hideText} />
        </div>

        <div>
          {loading && <p>Loading....</p>}
          {message && message.map(data => (
            <div key={data.id}>
              <p>{data.title}</p>
            </div>
          ))}
          {error && <p>This is a problem in fetching...</p>}
          <button>New Joke</button>
        </div>
    </React.Fragment>
  );
}

export default App;
