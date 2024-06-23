import React from 'react'
import AddSong from './AddSong';

const SearchResults = ({results}:any) => {
  return (
    <div>
        {results.map((item: { videoId: React.Key | null | undefined; thumbnailUrl: any; title: any; channelTitle: any }) => (
          <div key={item.videoId} className='flex items-center p-4 my-1 bg-black'>
            <div>
              <img
                src = {`${item.thumbnailUrl}`}
                width={75}
                height={75}
                alt={`${item.title} thumbnails`}
              />
            </div>
            <div className='px-2'>
              <p className='text-white'>{`${item.title}`}</p>
              <p className='text-gray-500'>{`${item.channelTitle}`}</p>
            </div>
            <div className='flex items-center ml-auto'>
                <AddSong song = {item}/>
            </div>
          </div>
        ))}
    </div>
  )
}

export default SearchResults