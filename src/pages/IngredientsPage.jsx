import React, { useState, useEffect } from 'react'

import apiService from '../utils/apiService'

export default function IngredientsPage({user}) {
  const [ingredients, setIngredients] = useState('')

  useEffect(() => {
    async function loadIngredients() {
      setIngredients(await apiService.getIngredients())
    }
    loadIngredients()
  }, [])
  
  return (
    <>
    {ingredients
    ?
    <div>
      Ingredients!
    </div>
    :
    'Loading!'}
    </>
  )
}