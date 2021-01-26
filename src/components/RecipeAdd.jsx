import React, { useState, useEffect } from 'react'

export default function RecipeAdd({addRecipeItem}) {
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    const hideAddForm = (event) => {
      if (showAddForm) {
        const addFormEl = document.querySelector('.recipe-add-form')
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
    const addFormEl = document.querySelector('.recipe-add-form')
    const clickInsideAddForm = addFormEl.contains(event.target)
    if (!clickInsideAddForm) {
      setShowAddForm(false)
    }
  }
  
  return (
    showAddForm ?
    <AddForm addRecipeItem={addRecipeItem} handleClickOutsideAddForm={handleClickOutsideAddForm}/> :
    <AddButton handleClickAddButton={handleClickAddButton} />
  )
}

function AddButton({handleClickAddButton}) {
  return (
    <div>
      <button className='recipe-add-button' onClick={handleClickAddButton}><i className="fas fa-plus-circle"></i></button>
    </div>
  )
}

function AddForm({addRecipeItem}) {
  const [item, setItem] = useState('')
  const [amount, setAmount] =useState('')

  const handleItemChange = event => setItem(event.target.value)
  const handleAmountChange = event => setAmount(event.target.value)

  const handleSubmit = () => {
    if (item) {
      addRecipeItem(item, amount)
      setItem('')
      setAmount('')
      document.querySelector('#item-input').focus()
    }
  }

  return (
    <div className='recipe-add-form'>
      <input
        id='item-input'
        placeholder="Item"
        onChange={handleItemChange}
        value={item}
        autoFocus
        required
      />
      <input 
        placeholder="Amount (optional)"
        onChange={handleAmountChange}
        value={amount}
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