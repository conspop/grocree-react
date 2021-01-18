import React, { useState, useEffect } from 'react'
import { useRouteMatch, Route, Switch, Link } from 'react-router-dom'

import axios from 'axios'

import tokenService from '../utils/tokenService'

export default function RecipesPage() {

  const [recipes, setRecipes] = useState([{name:'', items:[{item:'', amount:''}]}])

  useEffect(() => {
    const getRecipes = async () => {
      await axios.get('/api/recipes', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + tokenService.getToken()
        }
      }).then(response => setRecipes(response.data))
    }
    getRecipes()
  },[])

  const {path, url} = useRouteMatch();

  return (
    <>
      {recipes.map(recipe => <RecipeLink recipe={recipe} url={url} />)}
    </>
  )
}

function RecipeLink({recipe, url}) {
  const recipePath = recipe.name.toLowerCase().replace(' ','-')

  return (
    <Link
      to={`${url}/${recipePath}`}
      key={recipePath}
    >{recipe.name}
    </Link>
  )
}
