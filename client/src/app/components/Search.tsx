import React, { useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import AudioRecorder from 'react-audio-voice-recorder'


interface ChangeEvent {
    target: {
      value: React.SetStateAction<string>;
    }
}

interface SearchYoutube {
    preventDefault: () => void;
}

interface SearchProps{
    searchQuery: string
    changeSearchQuery: (event: ChangeEvent) => void
    searchYoutube: (event: SearchYoutube) => Promise<void>
}

const Search: React.FC<SearchProps> = ({searchQuery, changeSearchQuery, searchYoutube}) => {
    return(
        <div>
            <form className="flex max-w-lg p-4" onSubmit={searchYoutube}>   
                <label htmlFor="voice-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <Image
                            className='pr-1'
                            src="../images/search_icon.svg"
                            height={25}
                            width={25}
                            alt="search"
                        />
                    </div>
                    <input type="text" value={searchQuery} autoComplete='off' onChange={changeSearchQuery} id="voice-search" className="bg-ytMusicBlack1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-sans" placeholder="Search songs, albums, artists, podcasts" required />
                    <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"/>
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Search