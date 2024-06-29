import React, { useState } from 'react'
import Image from 'next/image'
import recognizeSong from '../service/recognizeSong'
import { AudioRecorder } from 'react-audio-voice-recorder'


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
    searchYoutubeWithVoice: (searchTitle: any) => void
}

const Search: React.FC<SearchProps> = ({searchQuery, changeSearchQuery, searchYoutube, searchYoutubeWithVoice}) => {
    const addAudioElement = (blob: any) => {
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = async () => {
            if (reader.result) {
                const base64data = (reader.result as string).split(',')[1]
                console.log(`Payload size: ${base64data.length} bytes`);
                try {
                    const response = await recognizeSong.recognizeSong({ audioData: base64data })
                    console.log(response)
                    searchYoutubeWithVoice(response.data.title)
                } catch (error) {
                    console.error('Error recognizing track', error)
                }
            }else {
                console.error('FileReader result is null')
            }
        }
    }
        
    return(
        <div className="flex items-center w-full p-4">
            <form className="flex-grow flex items-center max-w-lg p-4" onSubmit={searchYoutube}>   
                <label htmlFor="voice-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Image
                            className="pr-1"
                            src="../images/search_icon.svg"
                            height={25}
                            width={25}
                            alt="search"
                        />
                    </div>
                    <input type="text" value={searchQuery} autoComplete="off" onChange={changeSearchQuery} id="voice-search" className="bg-ytMusicBlack1 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white text-sans" placeholder="Search songs, albums, artists, podcasts" required />
                </div>
            </form>
            <div className="ml-4">
                <AudioRecorder
                    onRecordingComplete={(blob: any) => addAudioElement(blob)}
                />
            </div>
        </div>

    )
}

export default Search