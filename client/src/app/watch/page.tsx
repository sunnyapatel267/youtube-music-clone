'use client'
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation';
import { decodeToken } from '../utils/jwt'
import playlistService from '../service/playlist'
import songService from '../service/song'
import SideBar from '../components/SideBar'
import '../index.css'

const ReactPlayer = dynamic(() => import('react-player/youtube'), { ssr: false });

const Page = () => {
    const searchParams = useSearchParams()

    const playlistId = searchParams.get('list')
    const [playlists, setPlaylists] = useState<any[]>([])
    const [songs, setSongs] = useState<any[]>([])
    const [songsLoaded, setSongsLoaded] = useState(false)
    const [playlistLoaded, setPlaylistLoaded] = useState(false)

    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [played, setPlayed] = useState(0);

    const [currentSongIndex, setCurrentSongIndex] = useState(0)

    const handlePlayPause = () => setPlaying(!playing)
    const handleVolumeChange = (e: { target: { value: string; }; }) => setVolume(parseFloat(e.target.value));
    const handleSeekChange = (e: { target: { value: string; }; }) => setPlayed(parseFloat(e.target.value));
    const handleSeekMouseUp = (e: { target: { value: string; }; }) => setPlayed(parseFloat(e.target.value));
    
    const skipPrevious = () => setCurrentSongIndex(currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1)
    const skipNext = () => setCurrentSongIndex(currentSongIndex === songs.length-1 ? 0 : currentSongIndex+1)
    

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

    return (
        <div className='flex flex-col bg-black min-h-screen'>
            <div>
                <SideBar playlists={playlists} />
            </div>

            <div className='flex items-center justify-center ml-60 mt-24'>
                {songsLoaded && songs && songs.length > 0 ? (
                    <ReactPlayer 
                        url={`https://www.youtube.com/watch?v=${songs[currentSongIndex].videoId}`}
                        playing={playing}
                        volume={volume}
                        config={{
                            playerVars: {
                                showinfo: 1,
                                rel: 0,
                            }
                        }}
                    /> 
                ) : (null)}  

                {songsLoaded && songs && songs.length > 0 ? (
                    <div className='ml-7 w-96 h-96 overflow-y-auto'>
                        <p className='text-white font-sans font-bold'>UP NEXT</p>
                        <div>
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
                                </div>
                                <hr className='w-auto h-0.5 bg-gray-900 my-4'></hr>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (null)}

            </div>
            
            <div className='flex-grow'>
                <div className='absolute bottom-0 w-full bg-ytMusicBlack1 p-6 flex items-center justify-between'>
                    <div className='flex items-center justify-start'>
                        <button onClick={skipPrevious}>
                            <Image
                                src='../images/skip_previous_icon.svg'
                                width={35}
                                height={35}
                                alt='skip previous icon'
                            /> 
                        </button>
                        <button onClick={handlePlayPause} className='pl-4'>
                            {playing ? 
                                <Image
                                    src='../images/pause_icon.svg'
                                    width={35}
                                    height={35}
                                    alt='pause icon'
                                /> 
                                : 
                                <Image
                                    src='../images/play_arrow_icon.svg'
                                    width={35}
                                    height={35}
                                    alt='play icon'
                                /> 
                            }
                        </button>
                        <button onClick={skipNext} className='pl-4'>
                            <Image
                                src='../images/skip_next_icon.svg'
                                width={35}
                                height={35}
                                alt='skip next icon'
                            /> 
                        </button>
                    </div>
                    <div className='flex items-center justify-center'>
                        {songsLoaded && songs && songs.length > 0 ? (
                            <div className='flex'>
                                <img
                                    src={songs[currentSongIndex].thumbnailUrl}
                                    width={50}
                                    height={50}
                                    alt='song thumbnail'
                                />
                                <div className='pl-4'>
                                    <p className='text-white font-sans font-bold'>{songs[currentSongIndex].title}</p>
                                    <p className='text-gray-500 font-sans'>{songs[currentSongIndex].channelTitle}</p>
                                </div>
                            </div>
                        ): (null)}
                    </div>
                    <div className='flex items-center justify-end'>
                        <Image
                            src='../images/volume_up_icon.svg'
                            width={35}
                            height={35}
                            alt='skip next icon'
                        /> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page