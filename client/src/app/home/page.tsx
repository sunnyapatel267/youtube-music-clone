'use client'
import React, { useEffect, useState } from 'react'
import {useRouter} from 'next/navigation'
import Image from 'next/image'
import Search from '../components/Search'
import youtubeService from '../service/youtube'
import playlistService from '../service/playlist'
import { decodeToken } from '../utils/jwt'
import SideBar from '../components/SideBar'
import '../index.css'
import SearchResults from '../components/SearchResults'

const Page = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
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

  const changeSearchQuery = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchQuery(event.target.value)
  }

  const searchYoutube =  async(event: { preventDefault: () => void; }) => {
    event.preventDefault()
    try{
      const response = await youtubeService.search(searchQuery)
      setResults(response)
    }catch(error){
      console.log('This error occured', error)
    }
  }

  const searchYoutubeWithVoice =  async(searchTitle: any) => {
    try{
      const response = await youtubeService.search(searchTitle)
      setResults(response)
    }catch(error){
      console.log('This error occured', error)
    }
  }

  return (
    <div className='flex bg-black min-h-screen'>
      
      <SideBar playlists={playlists} />

      <div className='flex-grow ml-64'>
        <Search searchQuery={searchQuery} changeSearchQuery={changeSearchQuery} searchYoutube={searchYoutube} searchYoutubeWithVoice={searchYoutubeWithVoice} />
        {results && results.length > 0 ? (
          <SearchResults results={results} />
        ): (
          <div className='flex-grow flex justify-center items-center'>
            <div className='bg-ytMusicBlack1 rounded-lg w-120 h-32 border border-black p-10 m-4 overflow-hidden flex justify-center items-center'>
              <p className='text-white font-sans text-3xl font-bold'>Try searching to get started</p>
            </div>
          </div>
        )}
      </div>

      <div className='flex items-start justify-end py-6 px-10 cursor-pointer'>
        <Image className='fixed'
          src='../images/profile_icon.svg'
          width={35}
          height={35}
          alt='profile icon'
        /> 
      </div>

    </div>
  )
}

export default Page