import React from 'react'
import DisplaySongImages from './DisplaySongImages'

interface DisplayPlaylistImagesProps {
    songs: any
}

const DisplayPlaylistImages: React.FC<DisplayPlaylistImagesProps> = ({ songs }) => {
  return (
    <div>
        {songs && songs.length > 0 ? (
          songs && songs.length > 1 ? (
            songs && songs.length > 2 ? (
              songs && songs.length > 3 ? (
                <div>
                  <DisplaySongImages 
                    song1={songs[0].thumbnailUrl} 
                    song2={songs[1].thumbnailUrl} 
                    song3={songs[2].thumbnailUrl} 
                    song4={songs[3].thumbnailUrl} 
                  />
                </div>
              ) : (
                <div>
                  <DisplaySongImages 
                    song1={songs[0].thumbnailUrl} 
                    song2={songs[1].thumbnailUrl} 
                    song3={songs[2].thumbnailUrl} 
                    song4={songs[0].thumbnailUrl} 
                  />
                </div>
              )
            ) : (
              <div>
                <DisplaySongImages 
                  song1={songs[0].thumbnailUrl} 
                  song2={songs[1].thumbnailUrl} 
                  song3={songs[1].thumbnailUrl} 
                  song4={songs[0].thumbnailUrl} 
                />
              </div>
            )
          ):(
            <div>
              <DisplaySongImages 
                song1={songs[0].thumbnailUrl} 
                song2={songs[0].thumbnailUrl} 
                song3={songs[0].thumbnailUrl} 
                song4={songs[0].thumbnailUrl} 
              />
            </div>
          )
        ) : (
          <img
            src='../images/playlist_empty.png'
            width={264}
            height={264}
            alt=''
          />
        )}
    </div>
  )
}

export default DisplayPlaylistImages