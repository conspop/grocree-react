import React from 'react'

export default function RecipeTable({recipe, deleteRecipeItem}) {
  return (
    <>
      <div className='recipe-table'>
        <div>Item</div>
        <div>Amount</div>
        <div></div>
        {recipe.items.map(({item, amount}, index) => {
          return (
            <RecipeItem 
              index={index}
              item={item} 
              amount={amount} 
              deleteRecipeItem={deleteRecipeItem}
            />
          )
        })}
      </div>
    </>
  )
}

function RecipeItem({index, item, amount, deleteRecipeItem}) {
  const handleDelete = () => {
    deleteRecipeItem(index)
  }
  
  return (
    <>
      <div>{item}</div>
      <div>{amount}</div>
      <button onClick={handleDelete}>Delete</button>
    </>
  )
}