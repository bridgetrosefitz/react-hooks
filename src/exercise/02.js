// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React, { useEffect, useState } from 'react'


const useLocalStorageState = (key, serialiser=JSON.stringify, deserialiser=JSON.parse) => {

const initialItemParsed = () => {

    // get item from local storage
    const initialItem = localStorage.getItem(key)
    
    // parse the string into its underlying data type

    return initialItem ? deserialiser(initialItem) : undefined // This is the same behaviour you'd expect from useState if you don't pass it an initial value
  }

  // store item from local storage in state
  const [item, setItem] = useState(initialItemParsed)

  // update local storage when there's a state change
  useEffect(() => {

    // serialise / stringify the data first
    const serialisedItem = serialiser(item)
    localStorage.setItem(key, serialisedItem)
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
