import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'

import userService from './utils/userService'

import Header from './components/Header'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import StaplesPage from './pages/StaplesPage'
import RecipesPage from './pages/RecipesPage'
import ListsPage from './pages/ListsPage'
import RecipePage from './pages/RecipePage'

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
    <div className='app-container'>
      <Switch>
        <>
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
          <Route exact path='/staples'>
            <StaplesPage />
          </Route>
          <Route exact path='/recipes'>
            <RecipesPage />
          </Route>
          <Route path='/recipes/:recipeName'>
            <RecipePage />
          </Route>
          <Route exact path='/lists'>
            <ListsPage />
          </Route>
        </>
      </Switch>
    </div>
  )
}
