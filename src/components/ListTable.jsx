import React, { useState } from 'react'

export default function ListTable({listItems, deleteListItem, updateListItemName, updateListItemAmount}) {
 
  return (
    <>
      {listItems ?
      <div className='list-table'>
        <div className='list-table-title'>
          <div>Item</div>
          <div>Amount</div>
          <div></div>
        </div>
        
        {listItems.map(({item, amount}, index) => {
          return (
            <ListItem 
              index={index}
              item={item} 
              amount={amount} 
              deleteListItem={deleteListItem}
              updateListItemName={updateListItemName}
              updateListItemAmount={updateListItemAmount}
              key={item}
            />
          )
        })}        
      </div>
      :
      ''}
    </>
  )
}

function ListItem({index, item, amount, deleteListItem, updateListItemName, updateListItemAmount}) {
  const [showChangeNameMessage, setShowChangeNameMessage] = useState(false)
  const [nameInput, setNameInput] = useState(item.name)
  const [amountInput, setAmountInput] = useState(amount)
  
  const handleDelete = () => {
    deleteListItem(index)
  }

  const handleChangeName = (event) => {
    if (event.target.value === item.name) {
      setNameInput(event.target.value)
      setShowChangeNameMessage(false)
    } else {
      setNameInput(event.target.value)
      setShowChangeNameMessage(true)
    }
  }

  const handleConfirmChangeName = () => {
    updateListItemName(index, nameInput)
    setShowChangeNameMessage(false)
  }

  const handleCancelChangeName = () => {
    setNameInput(item.name)
    setShowChangeNameMessage(false)
  }

  const handleChangeAmount = (event) => {
    setAmountInput(event.target.value)
    updateListItemAmount(index, event.target.value)
  }
  
  return (
    <div className='list-table-item'>
      <ListItemField 
        field={nameInput} 
        handleChange={handleChangeName} 
      />
      <ListItemField 
        field={amountInput} 
        handleChange={handleChangeAmount} 
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

function ListItemField({field, handleChange}) {
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