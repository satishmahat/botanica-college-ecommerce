import React from 'react'
import news1 from "../../assets/news/news-1.png"
import news2 from "../../assets/news/news-2.png"
import news3 from "../../assets/news/news-3.png"
import news4 from "../../assets/news/news-4.png"

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom'


const news = [
  {
      "id": 1,
      "title": "Sustainable Plant Sourcing Initiative Launches",
      "description": "Leading online plant retailers collaborate to develop a comprehensive sustainable sourcing program, focusing on responsible cultivation, fair trade practices, and reducing carbon footprint in plant distribution.",
      "image": news1
  },
  {
      "id": 2,
      "title": "AI-Powered Plant Care Recommendations Breakthrough",
      "description": "A major advancement in plant care technology enables personalized plant recommendation systems, using AI to match customers with ideal plants based on home environment, lifestyle, and care capabilities.",
      "image": news2
  },
  {
      "id": 3,
      "title": "Vertical Farming Startup Expands Direct-to-Consumer Plant Delivery",
      "description": "An innovative vertical farming company unveils plans to revolutionize online plant sales by providing ultra-fresh, locally grown plants with direct shipping to urban consumers, reducing transportation emissions and delivery times.",
      "image": news3
  },
  {
      "id": 4,
      "title": "Global Plant E-Commerce Market Reaches Record Growth",
      "description": "Online plant sales continue to surge, with global markets showing unprecedented growth as more consumers embrace indoor gardening, plant collecting, and green living trends.",
      "image": news4
  },
  {
      "id": 5,
      "title": "New Mobile App Transforms Plant Shopping Experience",
      "description": "A cutting-edge mobile application launches, offering augmented reality plant placement, comprehensive care guides, community support, and seamless purchasing for plant enthusiasts worldwide.",
      "image": news2
  }
]

const News = () => {
  return (
    <div className='py-16 md:px-16'>
        <h2 className='text-3xl font-semibold mb-6'>News</h2>

        <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}

        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination , Navigation]}
        className="mySwiper"
      >

        {
            news.map((item , index) => (
                <SwiperSlide key={index}>
                    <div className='flex flex-col sm:flex-row sm:justify-between items-center gap-12'>
                        {/* content */}
                        <div className='py-4'>
                            <Link to="/"><h3 className='text-lg font-medium hover:text-blue-500 mb-4'>{item.title}</h3></Link>
                            <div className='w-12 h-[4px] bg-primary mb-5'></div>
                            <p className='text-sm text-gray-600'>{item.description}</p>
                        </div>

                        <div className='flex-shrink-0'>
                            <img src={item.image} alt="" className='w-full object-cover'/>
                        </div>

                    </div>
                </SwiperSlide>
            ))
        }

      </Swiper>
    </div>
  )
}

export default News