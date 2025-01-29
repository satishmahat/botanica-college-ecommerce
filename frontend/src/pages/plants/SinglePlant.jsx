import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import { useFetchPlantByIdQuery } from '../../redux/features/plants/plantsApi'
import { getImgUrl } from '../../utils/getImgUrl'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'

const SinglePlant = () => {

    const {id} = useParams()

    const {data: plant, isLoading, isError} = useFetchPlantByIdQuery(id) 

    const dispatch = useDispatch();
    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    if(isLoading) return <div>Loading..</div>
    if(isError) return <div>Error to load the Plant Data</div>

  return (
    <div className="max-w-lg shadow-md p-5">
        <h1 className="text-2xl font-bold mb-6">{plant.title}</h1>

        <div>
            <div>
                <img
                    src={`${getImgUrl(plant.coverImage)}`}
                    alt={plant.title}
                    className="mb-8"
                />
            </div>

            <div className='mb-5'>
                <p className="text-gray-700 mb-2"><strong>Category:</strong> {plant?.category}</p>
                <p className="text-gray-700 mb-4">
                    <strong>Added:</strong> {new Date(plant?.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-700"><strong>Description:</strong> {plant.description}</p>
            </div>

            <button onClick={() => handleAddToCart(plant)} className="btn-primary px-6 space-x-1 flex items-center gap-1 ">
                <FiShoppingCart />
                <span>Add to Cart</span>
            </button>
        </div>
    </div>
  )
}

export default SinglePlant
