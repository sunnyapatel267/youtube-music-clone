'use client'
import React, { useEffect, useState } from 'react'
import {useRouter} from 'next/navigation'
import { useSearchParams } from 'next/navigation';
import Image from 'next/image'
import SideBar from '../components/SideBar'
import { decodeToken } from '../utils/jwt'
import playlistService from '../service/playlist'
import songService from '../service/song'
import DisplayPlaylistImages from '../components/DisplayPlaylistImages';
import '../index.css'

const Page = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [playlists, setPlaylists] = useState<any[]>([])
  const [songs, setSongs] = useState<any[]>([])
  const [playlistLoaded, setPlaylistLoaded] = useState(false)
  const [songsLoaded, setSongsLoaded] = useState(false)


  const playlistId = searchParams.get('list')

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

  useEffect(() => {
    if (playlists.length > 0) {
      setPlaylistLoaded(true)
    }
  }, [playlists])

  useEffect(() => {
    const fetchSongs = async () => {
      if (playlistId) {
        const list = await songService.getSongs(playlistId)
        setSongs(list)
        setSongsLoaded(true)
      }
    }

    fetchSongs()
  }, [playlistId])

  const getPlaylistName = () => {
    return playlists.find(playlist => playlist.playlistId === Number(playlistId)).playlistName
  }

  return (
    <div className='flex bg-black min-h-screen'>
      <SideBar playlists={playlists} />

      <div className='flex-grow ml-80 mt-16'>
        <div className='flex items-center'>
          <DisplayPlaylistImages songs={songs} />
          <div className='ml-12'>
            <div>
              {playlistLoaded ? (
                <p className='text-white font-sans font-bold text-3xl mb-5'>{getPlaylistName()}</p>
              ) : (
                <p className='text-white font-sans font-bold'>{}</p>
              )}
            </div>
            <div>
              {songsLoaded ? (
                <p className='text-gray-500 font-sans mb-3'>{songs.length} tracks</p>
              ) : (
                <p className='text-white font-sans font-bold'>{}</p>
              )}
            </div>
            <button onClick={() => router.push(`/watch?list=${playlistId}`)} className='bg-white rounded-full py-1 px-3 mt-2'>
              <div className='flex items-center justify-center'>
                <Image className='items-center pr-1'
                  src='../images/shuffle.svg'
                  width={25}
                  height={25}
                  alt='shuffle icon'
                />
                <p className='text-black font-sans font-bold text-sm items-center'>Shuffle</p>
              </div>
            </button>
          </div>
        </div>

        <div className='mt-10'>
          {songs.map((item: { videoId: React.Key | null | undefined; thumbnailUrl: any; title: any; channelTitle: any }) => (
            <div key={item.videoId} className=''>
              <div key={item.videoId} className='flex items-center mt-3'>
                <img
                  src={item.thumbnailUrl}
                  width={50}
                  height={50}
                  alt=''
                />
                <p className='text-white text-sm font-bold font-sans ml-6'>{item.title}</p>
                <p className='text-gray-500 text-sm font font-sans ml-auto'>{item.channelTitle}</p>
              </div>
              <hr className='w-auto h-0.5 bg-gray-900 my-4'></hr>
            </div>
          ))}
        </div>
        
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