import React from 'react'
import bannerImg from "../../assets/banner.png"

const Banner = () => {
  return (
    <div className='flex flex-col md:flex-row-reverse py-6 md:py-16 md:px-16 justify-between items-center gap-12'>
         <div className='md:w-1/3 w-1/2 flex items-center md:justify-end'>
            <img src={bannerImg} alt="" />
        </div>
        
        <div className='md:w-1/2 w-full'>
            <h1 className='md:text-5xl text-2xl font-medium mb-7'>New Releases This Week</h1>
            <p className='mb-10'>It's time to update your reading list with some of the latest and greatest releases in the literary world. From heart-pumping thrillers to captivating memoirs, this week's new releases offer something for everyone</p>

            <button className='bg-green-500 hover:bg-green-700 text-white rounded-lg shadow-md px-4 py-2'>Subscribe</button>
        </div>

       
    </div>
  )
}

export default Banner