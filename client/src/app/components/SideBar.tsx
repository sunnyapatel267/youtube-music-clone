import React from 'react'
import Image from 'next/image'
import Modal from './Modal'
import {useRouter} from 'next/navigation'
import VerticalLine from './VerticalLine'

const SideBar = ({playlists}:any) => {
    const router = useRouter()
    
    return (
      <div className='fixed bg-black w-60 min-h-screen'>
        <div className='flex'>
          <div>
            <div className='flex justify-center items-center'>
              <Image className='p-4 cursor-pointer'
                onClick={() => router.push('/home')}
                src="https://music.youtube.com/img/on_platform_logo_dark.svg"
                width={120}
                height={120}
                alt="youtube music logo"
              />
            </div>

            <div className='flex'>
              <button 
                className='flex items-center justify-start mx-4 py-3 pl-2 pr-20 hover:bg-customGray rounded-xl' 
                onClick={() => router.push('/home')}>
                <div className='mr-4'>
                  <Image
                    src='../images/home_icon.svg'
                    width={25}
                    height={25}
                    alt='home icon'
                  />
                </div>
                <p className='text-white font-sans'>Home</p>
              </button>
            </div>

            <div className='flex'>
              <button 
                className='flex items-center justify-start mx-4 py-3 pl-2 pr-20 hover:bg-customGray rounded-xl' 
                onClick={() => router.push('/library')}>
              <div className='mr-4'>
                <Image
                  src='../images/library_music_icon.svg'
                  width={25}
                  height={25}
                  alt='library music icon'
                />
              </div>
              <p className='text-white font-san'>Library</p>
              </button>
            </div>

            <div className='flex justify-center items-center'>
              <hr className='w-3/4 h-0.5 bg-gray-900 my-4'></hr>
            </div>

            <Modal />

            <div className='ml-3 mr-3 mt-4'>
              {playlists.map((item: { playlistId: React.Key | null | undefined; playlistName: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined }) => (
                <div key={item.playlistId} className='flex hover:bg-customGray rounded-xl'>
                  <button 
                    className='flex items-center hover:bg-customGray rounded-xl py-3 pl-2 pr-20' 
                    onClick={() => router.push(`/playlist?list=${item.playlistId}`)}>
                    <p className='text-white font-normal font-sans pl-4'>{item.playlistName}</p>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
              <VerticalLine />
          </div>
        </div>
      </div>
    )
}

export default SideBar