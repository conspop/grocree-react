import React, { useState, useEffect } from 'react'

export default function StaplesAdd({addStaple}) {
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    const hideAddForm = (event) => {
      if (showAddForm) {
        const addFormEl = document.querySelector('.staples-add-form')
        if (addFormEl) {
          const clickedInsideAddFrom = addFormEl.contains(event.target)
          if (!clickedInsideAddFrom) {
            setShowAddForm(false)
          }
        }
      }
    }
    document.addEventListener('click', hideAddForm)
    return () => {document.removeEventListener('click', hideAddForm )}
    },[showAddForm])

  const handleClickAddButton = () => {
    setShowAddForm(true)
  }

  const handleClickOutsideAddForm = event => {
    const addFormEl = document.querySelector('.staples-add-form')
    const clickInsideAddForm = addFormEl.contains(event.target)
    if (!clickInsideAddForm) {
      setShowAddForm(false)
    }
  }
  
  return (
    showAddForm ?
    <AddForm addStaple={addStaple} handleClickOutsideAddForm={handleClickOutsideAddForm}/> :
    <AddButton handleClickAddButton={handleClickAddButton} />
  )
}

function AddButton({handleClickAddButton}) {
  return (
    <div className='staples-add-button'>
      <button onClick={handleClickAddButton}>Add</button>
    </div>
  )
}

function AddForm({addStaple, handleClickOutsideAddForm}) {
  const [item, setItem] = useState('')
  const [minimum, setMinimum] =useState('')

  const handleItemChange = event => setItem(event.target.value)
  const handleMinimumChange = event => setMinimum(event.target.value)

  const handleSubmit = () => {
    addStaple(item, minimum)
    setItem('')
    setMinimum('')
  }

  return (
    <div className='staples-add-form'>
      <input
        placeholder="Item"
        onChange={handleItemChange}
        value={item}
      />
      <input 
        placeholder="Minimum"
        onChange={handleMinimumChange}
        value={minimum}
      />
      <button
        onClick={handleSubmit}
      >
        Add
      </button>
    </div>
  )
}