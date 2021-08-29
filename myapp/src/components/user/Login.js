import React, { useState, useContext } from 'react'
import { Redirect, Link } from 'react-router-dom'

import { UserContext } from '../context/UserContext';

export default function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState([]);

  const {
    isLoggedIn,
    setIsLoggedIn
  } = useContext(UserContext);

  async function userLogin (event) {
    event.preventDefault()
    try {
      const response = await window.fetch('api/user/login', {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const jsonData = await response.json()
        setEmail('')
        setPassword('')
        setIsLoggedIn(true)
      } else {
        const jsonData = await response.json()
        setErrorMsg(jsonData.msg)
        setEmail('')
        setPassword('')
        throw new Error(jsonData.msg)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return isLoggedIn ? (
    <Redirect to='/home' />
  ) : (
    <div>
      <div className='flex items-center h-screen text-base'>
        <div className='max-w-sm w-11/12 mx-auto'>
          <div className='p-4 rounded-xl bg-white-signin'>
            <div className='flex justify-between text-black'>
              <h1 className='align-center text-3xl font-semibold'>Login</h1>
            </div>
            <form onSubmit={userLogin}>
              <div className='text-red-400 text-sm'>{errorMsg}</div>
              <div className='mt-10 mb-2 flex flex-col'>
                <label>Email</label>
                <input
                  type='email'
                  value={email}
                  placeholder='Enter Email'
                  pattern='.{6,}'
                  onChange={e => setEmail(e.target.value)}
                  required
                  title='Enter a valid email address with atleast 6 characters'
                  className='py-1 border-none outline-none'
                />
              </div>
              <div className=' mb-2 flex flex-col'>
                <label>Password</label>
                <input
                  type='password'
                  value={password}
                  placeholder='Enter Password'
                  required
                  pattern='.{6,}'
                  title='6 characters minimum'
                  onChange={e => setPassword(e.target.value)}
                  className='py-1 border-none outline-none'
                />
              </div>
              <div className=' mb-2 flex flex-col'>
                <button className='bg-blue-500 border-none rounded-xl text-white p-3 cursor-pointer' type='submit'>Log In</button>
              </div>
              <div className='text-blue-500'>
                <Link to='/'>Dont have an account,click here to Register</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
