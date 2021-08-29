import React, { useEffect, useContext } from 'react'
import { Route, Redirect, useLocation, useHistory } from 'react-router-dom'
import { UserContext } from './components/context/UserContext'


export default function PrivateRoute ({ component: Component, ...rest }) {
  const { isLoggedIn } = useContext(UserContext)
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    history.push(location.pathname)
  }, [])

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? <Component {...props} /> : <Redirect to='/' />
      }
    />
  )
}
