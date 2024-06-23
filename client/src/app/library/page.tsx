'use client'
import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import { decodeToken } from '../utils/jwt'
import playlistService from '../service/playlist'
import '../index.css'


const Page = () => {
  const [playlists, setPlaylists] = useState<any[]>([])

  useEffect(() => {
    const fetchPlaylists = async() => {
      const token = localStorage.getItem('token')

      if(token){
        const decode = decodeToken(token)

        try{
          const loginUsername = {
            username: decode
          }
          const list = await playlistService.getUserPlaylists(loginUsername)
          setPlaylists(list)
        }catch(error){
          console.log('This error occured', error)
        }
      }
    }

    fetchPlaylists()
  }, [])

  return (
    <div className='flex h-screen'>
      <SideBar playlists={playlists} />
    </div>
  )
}

export default Page