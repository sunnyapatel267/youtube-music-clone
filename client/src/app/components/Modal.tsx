'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import playlistService from '../service/playlist'
import { decodeToken } from '../utils/jwt';

const Modal = () => {
    const [showModal, setShowModal] = useState(false)
    const [title, setTitle] = useState('')

    const changeTitle = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setTitle(event.target.value)
    }

    const createPlayList = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()

        const token = localStorage.getItem('token')
        if(token){
            const decode = decodeToken(token)
            try{
                const data = {
                    name: title,
                    username: decode
                }
                const user = {
                    username: decode
                }
                const request = await playlistService.addUserPlaylist(data)
                setShowModal(false)
                window.location.reload()
            }catch(error){
                console.log("unable to create playlist", error)
            }
        }
    }

    return (
        <div>
            <div onClick = {() => setShowModal(true)} className='flex items-center justify-center w-25'>
                <button className='inline-block bg-playlistAdd hover:bg-customGray rounded-full py-2 px-10'>
                    <div className='flex items-center justify-center'>
                        <Image className='mr-2'
                            src='../images/add_icon.svg'
                            width={20}
                            height={20}
                            alt='playlist add icon'
                        />
                        <p className='text-white font-sans text-sm'>New playlist</p>
                    </div>
                </button>
            </div>

            {showModal ? (
                <div>
                    <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-customGray outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-6">
                            <h3 className="text-3xl font-semibold font-sans text-white">
                            New playlist
                            </h3>
                            <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowModal(false)}
                            >
                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                
                            </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto w-96">
                            <div className="relative h-11 w-full min-w-[200px]">
                                <input placeholder="Title"
                                onChange={changeTitle}
                                className="peer h-full w-full border-b border-white bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border-blue-white focus:border-white focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" />
                                <label
                                    className="after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-white transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-white peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                    Title
                                </label>
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
                            <button
                                className="bg-white text-black text-sm font-medium py-2 px-4 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={(event) => createPlayList(event)}
                            >
                                Create
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </div>
            ): null}
        </div>
    )
}

export default Modal