import React, { createContext, useState, useEffect } from 'react'

export const UserContext = createContext()

export const UserContextProvider = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userDetails, setUserDetails] = useState(null)

  useEffect(() => {
    getUser();
  }, [])

  const request = async (params, method, body) => {
    const data = await window.fetch('/' + params, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    return data
  }

  async function getUser () {
    const data = await request('api/user/getUser', 'GET')
    console.log(data)
    if (data.ok) {
      const jsonData = await data.json()
      setUserDetails(jsonData[0])
      setIsLoggedIn(jsonData[0].id)
    } else {
      console.log(data.status)
      return false
    }
  }

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        userDetails,
        setIsLoggedIn
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
