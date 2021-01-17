import React, { useState } from 'react'

export default function AddStaple({addStaple}) {
  const [item, setItem] = useState('')
  const [minimum, setMinimum] =useState('')

  const handleItemChange = event => setItem(event.target.value)
  const handleMinimumChange = event => setMinimum(event.target.value)

  const handleSubmit = () => addStaple(item, minimum)
  
  return (
    <>
      <input
        placeholder="Item"
        onChange={handleItemChange}
      />
      <input 
        placeholder="Minimum"
        onChange={handleMinimumChange}
      />
      <button
        onClick={handleSubmit}
      >
        Add
      </button>
    </>
  )
}