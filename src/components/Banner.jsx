import React from 'react'
import banner from '../assets/banner1.jpg'
import Product from '../pages/Products'
import { useNavigate } from 'react-router-dom'


const Banner = () => {
  const navigate = useNavigate()
  return (
    <div className='bg-gray-100 md:py-24'>
        <div className='relative max-w-7xl mx-auto md:rounded-2xl pt-28 bg-cover bg-center h-[550px] md:h-[600px]' style={{backgroundImage: `url(${banner}`, backgroundPosition:'center', backgroundAttachment:'fixed'}}>
            <div className='text-center text-white px-4'>
                <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold mb-4'>
                    Next-Gen Electronics at Your Fingertips
                </h1>
                <p className='text-lg md:text-xl mb-6'>Discover the latest tech innovation with unbeatable prices and free shipping on all orders.</p>
                <button onClick={()=>navigate("/Product")} className='bg-red-500 hover:bg-red-600 cursor-pointer text-white font-semibold py-2 px-4 md:py-3 md:px-6 rounded-lg transition duration-300'>Shop Now</button>
            </div>
        </div>
    </div>
  )
}

export default Banner