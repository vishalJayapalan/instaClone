import React, { useState, useContext } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext';

export default function Signup () {
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState([]);

  const {
    isLoggedIn,
    setIsLoggedIn
    
  } = useContext(UserContext);
  async function userSignUp (event) {
    event.preventDefault()
    try {
      const response = await window.fetch('api/user/', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          userName: fullName,
          password: password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.ok) {
        const jsonData = await response.json()
        setEmail('')
        setFullName('')
        setPassword('')
        setIsLoggedIn(true)
      } else {
        const jsonData = await response.json()
        setErrorMsg(jsonData.msg)
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
        <div className='max-w-sm w-11/12 mx-auto '>
          <div className='p-4 rounded-xl bg-white-signin'>
            <div className='flex justify-between text-black'>
              <h1 className='align-center text-3xl font-semibold'>Register</h1>
            </div>
            <form onSubmit={userSignUp}>
              <div className='text-red-400 text-sm'>{errorMsg}</div>
              <div className='mt-10 mb-2 flex flex-col'>
                <label>Full Name</label>
                <input
                  value={fullName}
                  placeholder='Enter Full Name'
                  onChange={e => setFullName(e.target.value)}
                  required
                  title='enter a valid email address'
                  className='py-1 border-none outline-none'
                />
              </div>
              <div className='mb-2 flex flex-col'>
                <label>Email</label>
                <input
                  type='email'
                  value={email}
                  placeholder='Enter Email'
                  onChange={e => setEmail(e.target.value)}
                  required
                  title='enter a valid email address'
                  className='py-1 border-none outline-none'
                />
              </div>
              <div className='mb-2 flex flex-col'>
                <label>Password</label>
                <input
                  type='password'
                  value={password}
                  placeholder='Enter password'
                  required
                  pattern='.{6,}'
                  title='6 characters minimum'
                  onChange={e => setPassword(e.target.value)}
                  className='py-1 border-none outline-none'
                />
              </div>              
              <div className='mb-2 flex flex-col mt-5'>
                <button className='bg-blue-500 border-none rounded-xl text-white p-3 cursor-pointer' type='submit'>Register</button>
              </div>
              <div className='text-blue-500'>
                <Link to='/login'>Already have an Account?Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
