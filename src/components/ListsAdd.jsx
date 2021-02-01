import React, { useState, useEffect } from 'react'

export default function ListsAdd({addList}) {
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
    <AddForm addList={addList} handleClickOutsideAddForm={handleClickOutsideAddForm}/> :
    <AddButton handleClickAddButton={handleClickAddButton} />
  )
}

function AddButton({handleClickAddButton}) {
  return (
    <div>
      <button className='lists-add-button' onClick={handleClickAddButton}><i className="fas fa-plus-circle"></i></button>
    </div>
  )
}

function AddForm({addList}) {
  const [list, setList] = useState('')

  const handleListChange = event => setList(event.target.value)

  const handleSubmit = () => {
    if (list) {
      addList(list)
      setList('')
      document.querySelector('#list-input').focus()
    }
  }

  return (
    <div className='lists-add-form'>
      <input
        id='list-input'
        placeholder="List"
        onChange={handleListChange}
        value={list}
        autoFocus
        required
      />
      <button
        onClick={handleSubmit}
        className='add-button'
        disabled={(list === '')}
      >
        <i className="fas fa-check-circle"></i>
      </button>
    </div>
  )
}