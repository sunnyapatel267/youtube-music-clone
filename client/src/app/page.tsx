'use client'
import React from 'react'
import {useRouter} from 'next/navigation'
import Image from 'next/image';
import './index.css';


const Page = () => {
  const router = useRouter()
  return (
    <div>
      <div className='flow-root p-4'>

        <Image className='float-left'
          src="https://music.youtube.com/img/on_platform_logo_dark.svg"
          width={100}
          height={100}
          alt="youtube music logo"
        />

        <button className="float-right bg-white font-sans font-medium text-sm text-black py-2 px-4 rounded-full" onClick={() => router.push('/login')}>
          Sign in
        </button>
      </div>
        
      <div className='flex items-center justify-evenly'>
        <div>
          <Image
            src="/images/astroworld.jpeg"
            width={250}
            height={250}
            alt="astroworld"
          />

          <Image
            src="/images/foresthills.jpg"
            width={250}
            height={250}
            alt="foresthills"
          />
        </div>

        <div className='text-white text-sans text-extrabold text-9xl'>
          <p>
            Open
          </p>
          <p>
            the world
          </p>
          <p>
            of music.
          </p>
        </div>

        <div>
          <Image
            src="/images/luvisrage2.jpeg"
            width={250}
            height={250}
            alt="luvisrage2"
          />

          <Image
            src="/images/Taylors1989.jpg"
            width={250}
            height={250}
            alt="taylors1989"
          />
        </div>
      </div>
        
    </div>
  )
}

export default Page