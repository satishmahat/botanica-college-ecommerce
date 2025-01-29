import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { HiOutlineShoppingCart } from "react-icons/hi";

import avatarImg from "../assets/avatar.png"
import { useSelector } from 'react-redux';

import { useAuth } from '../context/AuthContext';

const navigation = [
    {name: "Dashboard", href:"/dashboard"},
    {name: "Orders", href:"/orders"},
    {name: "Cart Page", href:"/cart"},
    {name: "Check Out", href:"/checkout"},
]

const Navbar = () => {

    const [isDropdownOpen , setIsDropdownOpen] = useState(false)

    const cartItems = useSelector(state => state.cart.cartItems);
    

    console.log(isDropdownOpen)

    const {currentUser , logoutUser} = useAuth()

    const handleLogOut = () => {
        logoutUser()
    }

  return (
    <header className='max-w-screen-2xl mx-auto px-4 py-6'>
        <nav className='flex justify-between items-center md:px-16'>
            {/* left side */}
            <div className='flex items-center md:gap-4 gap-4'>

                <Link to="/"><img src="/fav-icon.png" alt="" className='size-10'/></Link>

                <div className=''>
                    <h1 className='text-2xl font-semibold text-green-800'>Botanikà</h1>
                </div>

            </div>

            {/* right side */}
            <div className='relative flex items-center md:space-x-3 space-x-3'>
                <div>
                    { 
                        currentUser? <>
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className='flex'>
                            <img src={avatarImg} alt="" className={`size-8 rounded-full ${currentUser ? 'ring-2 ring-green-800' : ''}`}/>
                        </button>

                        {/* show dropdown */}
                        {
                            isDropdownOpen && (
                                <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40'>
                                    <ul className='py-2'>
                                        {
                                            navigation.map((item) => (
                                                <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                                    <Link to={item.href} className='block px-4 py-2 text-sm hover:bg-gray-100'>{item.name}</Link>
                                                </li>
                                            ))
                                        }
                                        <li className='block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer'>
                                            <button onClick={handleLogOut}>Logout</button>
                                        </li>
                                    </ul>
                                </div>
                            )
                        }

                        </> : <Link to="/login"><HiOutlineUser className='size-6'/></Link>
                    }
                </div>
                <button className='hidden sm:block'><HiOutlineHeart className='size-6'/></button>

                <Link to="/cart" className='bg-green-800 p-1 sm:px-6 px-2 flex items-center rounded-sm'>
                    <HiOutlineShoppingCart className='size-6 text-white'/>

                    {
                        cartItems.length > 0 ?  <span className='text-sm text-white font-semibold sm:ml-1'>{cartItems.length}</span> : <span className='text-sm font-semibold sm:ml-1 text-white'>0</span>

                    }
                </Link>
            </div>
        </nav>

    </header>
  )
}

export default Navbar