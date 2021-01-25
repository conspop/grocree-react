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
    <div>
      <button className='staples-add-button' onClick={handleClickAddButton}><i className="fas fa-plus-circle"></i></button>
    </div>
  )
}

function AddForm({addStaple, handleClickOutsideAddForm}) {
  const [item, setItem] = useState('')
  const [minimum, setMinimum] =useState('')

  useEffect(() => {
    document.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        addStaple(item, minimum)
        setItem('')
        setMinimum('')
      }
    })
    return () => document.removeEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        addStaple(item, minimum)
        setItem('')
        setMinimum('')
      }
    })
  },[])

  const handleItemChange = event => setItem(event.target.value)
  const handleMinimumChange = event => setMinimum(event.target.value)

  const handleSubmit = () => {
    if (item) {
      addStaple(item, minimum)
      setItem('')
      setMinimum('')
      document.querySelector('#item-input').focus()
    }
  }

  return (
    <div className='staples-add-form'>
      <input
        id='item-input'
        placeholder="Item"
        onChange={handleItemChange}
        value={item}
        autoFocus
        required
      />
      <input 
        placeholder="Minimum (optional)"
        onChange={handleMinimumChange}
        value={minimum}
      />
      <button
        onClick={handleSubmit}
        className='add-button'
        disabled={(item === '')}
      >
        <i className="fas fa-check-circle"></i>
      </button>
    </div>
  )
}