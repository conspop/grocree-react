import React, { useState, useEffect } from 'react'

export default function RecipesAdd({addRecipe}) {
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    const hideAddForm = (event) => {
      if (showAddForm) {
        const addFormEl = document.querySelector('.recipes-add-form')
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
    const addFormEl = document.querySelector('.recipes-add-form')
    const clickInsideAddForm = addFormEl.contains(event.target)
    if (!clickInsideAddForm) {
      setShowAddForm(false)
    }
  }
  
  return (
    showAddForm ?
    <AddForm addRecipe={addRecipe} handleClickOutsideAddForm={handleClickOutsideAddForm}/> :
    <AddButton handleClickAddButton={handleClickAddButton} />
  )
}

function AddButton({handleClickAddButton}) {
  return (
    <div>
      <button className='recipes-add-button' onClick={handleClickAddButton}><i className="fas fa-plus-circle"></i></button>
    </div>
  )
}

function AddForm({addRecipe}) {
  const [recipe, setRecipe] = useState('')

  const handleRecipeChange = event => setRecipe(event.target.value)

  const handleSubmit = () => {
    if (recipe) {
      addRecipe(recipe)
      setRecipe('')
      document.querySelector('#recipe-input').focus()
    }
  }

  return (
    <div className='recipes-add-form'>
      <input
        id='recipe-input'
        placeholder="Recipe"
        onChange={handleRecipeChange}
        value={recipe}
        autoFocus
        required
      />
      <button
        onClick={handleSubmit}
        className='add-button'
        disabled={(recipe === '')}
      >
        <i className="fas fa-check-circle"></i>
      </button>
    </div>
  )
}