import React, { useEffect, useState } from 'react'
import { decodeToken } from '../utils/jwt'
import playlistService from '../service/playlist'
import songService from '../service/song'

const AddSong = ({song}:any) => {
    const [showModal, setShowModal] = useState(false)
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

    const addSongToPlaylist = async (id: any) => {
        const data = {
            playlistId: id,
            videoId: song.videoId,
            title: song.title,
            thumbnailUrl: song.thumbnailUrl,
            channelTitle: song.channelTitle
        }

        const request = await songService.addSong(data)
        setShowModal(false)
    }


    return (
    <div>
        <div onClick = {() => setShowModal(true)}>
            <button>
                <img src='../images/add_icon.svg'/>
            </button>
        </div>

        {showModal ? (
            <div>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-ytMusicBlack1 outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-6">
                                <h3 className="text-3xl font-semibold font-sans text-white">
                                    Save to playlist
                                </h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => setShowModal(false)}
                                >
                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"></span>
                                </button>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto w-96 max-h-96 overflow-y-auto">
                                <div className="relative w-full min-w-[200px]">
                                    <p className="text-white font-sans font-bold"> All playlists</p>
                                    {playlists.map((item) => (
                                        <div key={item.playlistId} className="flex hover:bg-customGray rounded-xl">
                                            <div className="peer h-full w-full bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-white outline-none transition-all placeholder-shown:border-blue-white focus:border-white focus:outline-none">
                                                <button 
                                                    className="flex justify-center items-center w-full hover:bg-customGray rounded-xl"
                                                    onClick={() => addSongToPlaylist(item.playlistId)}
                                                >
                                                    <p className="text-white font-sans">{item.playlistName}</p>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6">
                                <button
                                    className="text-white background-transparent py-2 px-4 text-sm font-sans font-medium outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
            </div>
        ) : null}

    </div>
    )
}

export default AddSong