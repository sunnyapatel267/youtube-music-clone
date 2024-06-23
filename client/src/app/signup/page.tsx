'use client'
import React, { useState } from 'react'
import {useRouter} from 'next/navigation'
import loginService from '../service/login.js'
import Image from 'next/image'
import '../index.css'

const Page = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const setNewUsername = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setUsername(event.target.value)
  }

  const setNewPassword = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(event.target.value)
  }

  const loginToWebSite = async (event: { preventDefault: () => void; }) => {
    event.preventDefault()

    const signUpInfo = {
      username: username,
      password: password,
      firstName: 'null',
      lastName: 'null'
    }
    
    try{
      const response = await loginService.signup(signUpInfo)
      new Promise(resolve => setTimeout(resolve, 5000));
      router.push('/login')
    }catch(error){
      setError(true)
    }
  }

  const ShowError = ({value}: {value: boolean}) => {
    if(value === true){
      return(
        <div className="flex justify-center items-center">
                <label htmlFor="password" className="block text-lg font-medium leading-6 text-red-600">
                  USERNAME ALREADY EXISTS
                </label>
        </div>
      )
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image className='mx-auto h-10 w-auto'
            src="https://music.youtube.com/img/on_platform_logo_dark.svg"
            width={100}
            height={100}
            alt="youtube music logo"
            onClick={() => router.push('/')}
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign Up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" onSubmit={loginToWebSite}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  value={username}
                  onChange={setNewUsername}
                  autoComplete="username"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={setNewPassword}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <ShowError value={error}/>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-youtubeRed px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-white">
            Already a member?{' '}
            <a onClick={() => router.push('/login')} className="font-semibold leading-6 text-youtubeRed cursor-pointer">
              Log in
            </a>
          </p>
        </div>
    </div>
  </>
  )
}

export default Page