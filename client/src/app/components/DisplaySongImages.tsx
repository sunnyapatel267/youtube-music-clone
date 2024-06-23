import React from 'react'

interface DisplaySongImagesProps {
    song1: any,
    song2: any,
    song3: any,
    song4: any
}

const DisplaySongImages: React.FC<DisplaySongImagesProps> = ({song1, song2, song3, song4}) => {
  return (
    <div>
        <div className='flex'>
            <img
                src={song1}
                width={132}
                height={132}
                alt='thumbnail'
            />
            <img
                src={song2}
                width={132}
                height={132}
                alt='thumbnail'
            />
            </div>
            <div className='flex'>
            <img
                src={song3}
                width={132}
                height={132}
                alt='thumbnail'
            />
            <img
                src={song4}
                width={132}
                height={132}
                alt='thumbnail'
            />
        </div>
    </div>
  )
}

export default DisplaySongImages