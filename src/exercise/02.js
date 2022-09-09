// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React, { useEffect, useState } from 'react'


const useLocalStorageState = (key) => {
  // get item from local storage
  const initialItem = () => localStorage.getItem(key)

  // store item from local storage in state
  const [item, setItem] = useState(initialItem)

  // update local storage when there's a state change
  useEffect(() => {
    localStorage.setItem(key, item)
  }, [item, key])

  return [item, setItem]

}

function Greeting() {
  const [name, setName] = useLocalStorageState('name')

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name ? name : '' } onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
