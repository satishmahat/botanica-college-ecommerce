import React, { useState, useEffect } from 'react'
import PlantCard from '../plants/PlantCard';  // Updated to PlantCard

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { useFetchAllPlantsQuery } from '../../redux/features/plants/plantsApi';  // Updated to plants API

const Recommended = () => {

  const {data: plants = []} = useFetchAllPlantsQuery();  // Fetch plants data

  return (
    <div className='py-16 md:px-16'>
        <h2 className='text-3xl font-semibold mb-6'>Recommended for you</h2>
        <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        // loop={true}
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
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          }
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >

        {
            plants.length > 0 && plants.slice(5, 14).map((plant, index) => (  // Updated to plant
                <SwiperSlide key={index}>
                    <PlantCard plant={plant}/>  {/* Updated to PlantCard */}
                </SwiperSlide>
            ))
        }
      </Swiper>
    </div>
  )
}

export default Recommended
