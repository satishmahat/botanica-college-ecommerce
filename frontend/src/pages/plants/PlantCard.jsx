import React from 'react'
import { FiShoppingCart } from "react-icons/fi"
import { getImgUrl } from '../../utils/getImgUrl'
import { Link } from "react-router-dom"

import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'

const PlantCard = ({ plant }) => {

    const dispatch = useDispatch();
    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

  return (
    <div className="rounded-lg transition-shadow duration-300">
        <div
            className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4"
        >
            <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
                <Link to={`/plants/${plant._id}`}>
                    <img
                    src={`${getImgUrl(plant?.coverImage)}`}
                    alt=""
                    className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
                    />
                </Link>
            </div>

            <div>
                <Link to={`/plants/${plant._id}`}><h3 className="text-xl font-semibold hover:text-green-600 mb-3">
                    {plant?.title}
                </h3></Link>
                <p className="text-gray-600 mb-5">{plant?.description.length > 80 ? `${plant?.description.slice(0, 70)}...` : plant?.description}</p>
                <p className="font-medium mb-5">
                    ${plant?.newPrice}<span className="line-through font-normal ml-2">{plant?.oldPrice}</span>
                </p>
                <button 
                onClick={() => handleAddToCart(plant)}
                className="btn-primary !px-6 space-x-1 flex items-center gap-1">
                    <FiShoppingCart className="" />
                    <span>Add to Cart</span>
                </button>
            </div>
        </div>
    </div>
  )
}

export default PlantCard
