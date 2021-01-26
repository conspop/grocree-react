import React, { useState } from 'react'

export default function RecipeTable({recipeName, recipeItems, deleteRecipeItem, updateRecipeItemName, updateRecipeItemAmount}) {
 
  return (
    <>
      <h2>{recipeName}</h2>
      {recipeItems ?
      <div className='recipe-table'>
        <div className='recipe-table-title'>
          <div>Item</div>
          <div>Amount</div>
          <div></div>
        </div>
        
        {recipeItems.map(({item, amount}, index) => {
          return (
            <RecipeItem 
              index={index}
              item={item} 
              amount={amount} 
              deleteRecipeItem={deleteRecipeItem}
              updateRecipeItemName={updateRecipeItemName}
              updateRecipeItemAmount={updateRecipeItemAmount}
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

function RecipeItem({index, item, amount, deleteRecipeItem, updateRecipeItemName, updateRecipeItemAmount}) {
  const [showChangeNameMessage, setShowChangeNameMessage] = useState(false)
  const [nameInput, setNameInput] = useState(item.name)
  const [amountInput, setAmountInput] = useState(amount)
  
  const handleDelete = () => {
    deleteRecipeItem(index)
  }

  const handleChangeName = (event) => {
    if (event.target.value === item.name)
      setShowChangeNameMessage(false)
    else {
      setNameInput(event.target.value)
      setShowChangeNameMessage(true)
    }
  }

  const handleConfirmChangeName = () => {
    updateRecipeItemName(index, nameInput)
    setShowChangeNameMessage(false)
  }

  const handleCancelChangeName = () => {
    setNameInput(item.name)
    setShowChangeNameMessage(false)
  }

  const handleChangeAmount = (event) => {
    setAmountInput(event.target.value)
    updateRecipeItemAmount(index, event.target.value)
  }
  
  return (
    <div className='recipe-table-item'>
      <RecipeItemField 
        field={nameInput} 
        handleChange={handleChangeName} 
      />
      <RecipeItemField 
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

function RecipeItemField({field, handleChange}) {
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