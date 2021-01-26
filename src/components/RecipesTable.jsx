import React, { useState } from 'react'
import { useRouteMatch, Link} from 'react-router-dom'


export default function RecipesTable({recipes, deleteRecipe, updateRecipeName}) {

  return (
    <>
      {recipes.length > 0 ?
      <div className='staples-table'>
        <div className='staples-table-title'>
          <div>Recipe</div>
          <div></div>
        </div>
        
        {recipes.map(({name}, index) => {
          return (
            <Recipe 
              index={index}
              name={name} 
              deleteRecipe={deleteRecipe}
              updateRecipeName={updateRecipeName}
              key={name}
            />
          )
        })}        
      </div>
      :
      <p>You have no recipes.</p>}
    </>
  )
}

function Recipe({index, name, deleteRecipe, updateRecipeName}) {
  const [showChangeNameMessage, setShowChangeNameMessage] = useState(false)
  const [nameInput, setNameInput] = useState(name)
  
  const handleDelete = () => {
    deleteRecipe(index)
  }

  const handleChangeName = (event) => {
    setNameInput(event.target.value)
    updateRecipeName(index, event.target.value)
  }
  
  return (
    <div className='recipes-table-item'>
      <RecipeField 
        field={nameInput} 
        handleChange={handleChangeName} 
      />
      <RecipeLink recipe={name} />
      <button className='delete-button' onClick={handleDelete}><i className="fas fa-minus-circle"></i></button>
    </div>
  )
}

function RecipeField({field, handleChange}) {
  return (
    <input 
      value={field}
      onChange={handleChange}
    />
  )
}


function RecipeLink({recipe}) {
  const recipePath = recipe.toLowerCase().replace(' ','-')
  const {path, url} = useRouteMatch();

  return (
    <Link
      to={`${url}/${recipePath}`}
      key={recipePath}
    ><i class="fas fa-chevron-circle-right"></i>
    </Link>
  )
}