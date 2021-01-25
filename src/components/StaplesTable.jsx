import React, { useState } from 'react'

export default function StaplesTable({staples, deleteStaple, updateStapleName, updateStapleMinimum}) {
 
  return (
    <>
      {staples.length > 0 ?
      <div className='staples-table'>
        <div className='staples-table-title'>
          <div>Item</div>
          <div>Minimum</div>
          <div></div>
        </div>
        
        {staples.map(({item, minimum}, index) => {
          return (
            <Staple 
              index={index}
              item={item} 
              minimum={minimum} 
              deleteStaple={deleteStaple}
              updateStapleName={updateStapleName}
              updateStapleMinimum={updateStapleMinimum}
              key={item}
            />
          )
        })}        
      </div>
      :
      <p>You have no staples.</p>}
    </>
  )
}

function Staple({index, item, minimum, deleteStaple, updateStapleName, updateStapleMinimum}) {
  const [showChangeNameMessage, setShowChangeNameMessage] = useState(false)
  const [nameInput, setNameInput] = useState(item.name)
  const [minimumInput, setMinimumInput] = useState(minimum)
  
  const handleDelete = () => {
    deleteStaple(index)
  }

  const handleChangeName = (event) => {
    if (event.target.value === item)
      setShowChangeNameMessage(false)
    else {
      setNameInput(event.target.value)
      setShowChangeNameMessage(true)
    }
  }

  const handleConfirmChangeName = () => {
    updateStapleName(index, nameInput)
    setShowChangeNameMessage(false)
  }

  const handleCancelChangeName = () => {
    setNameInput(item.name)
    setShowChangeNameMessage(false)
  }

  const handleChangeMinimum = (event) => {
    setMinimumInput(event.target.value)
    updateStapleMinimum(index, event.target.value)
  }
  
  return (
    <div className='staples-table-item'>
      <StapleField 
        field={nameInput} 
        handleChange={handleChangeName} 
      />
      <StapleField 
        field={minimumInput} 
        handleChange={handleChangeMinimum} 
      />
      <button className='delete-button' onClick={handleDelete}><i className="fas fa-minus-circle"></i></button>
      { showChangeNameMessage ? 
        <ChangeNameMessage
          handleConfirmChangeName={handleConfirmChangeName} 
          handleCancelChangeName={handleCancelChangeName} 
        /> : 
        undefined}
    </div>
  )
}

function StapleField({field, handleChange}) {
  return (
    <input 
      value={field}
      onChange={handleChange}
    />
  )
}

function ChangeNameMessage({handleConfirmChangeName, handleCancelChangeName, item}) {
  return (
    <div className='change-name-message'>
      <p>Changing this item's name will do so throughout the app. Proceed?</p>
      <button onClick={handleConfirmChangeName} data-item={item}><i style={{color:'green'}} className="fas fa-check-circle"></i></button>
      <button onClick={handleCancelChangeName}><i style={{color:'red'}} className="fas fa-times-circle"></i></button>
    </div>
  )
}