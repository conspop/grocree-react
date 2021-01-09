import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'

import userService from './utils/userService'

import Header from './components/Header'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import IngredientsPage from './pages/IngredientsPage'
import RecipesPage from './pages/RecipesPage'
import ListsPage from './pages/ListsPage'

import './App.css'

export default function App() {

  const [user, setUser] = useState(userService.getUser())

  const handleLogout = () => {
    userService.logout();
    setUser(null)
  }

  const handleSignupOrLogin = () => {
    setUser(userService.getUser());
  }

  return (
    <Switch>
      <div>
        <Header 
          user={user} 
          handleLogout={handleLogout}
        />
        <Route exact path='/signup' render={({history}) =>
          <SignupPage
            handleSignupOrLogin={handleSignupOrLogin} 
            history={history}
          />
        } />
        <Route exact path='/login' render={({history}) =>
          <LoginPage
            handleSignupOrLogin={handleSignupOrLogin} 
            history={history}
          />
        } />
        <Route exact path='/ingredients'>
          <IngredientsPage 
            user={user}
          />
        </Route>
        <Route exact path='/recipes'>
          <RecipesPage
            user={user}
          />
        </Route>
        <Route exact path='/lists'>
          <ListsPage 
            user={user}
          />
        </Route>
      </div>
    </Switch>
  )
}
