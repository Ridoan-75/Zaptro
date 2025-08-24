import React from 'react'
import {  getData } from '../Context/DataContext'
import { useNavigate } from 'react-router-dom'

const Category = () => {
    // const {categoryOnlyData} = getData()
    const navigate = useNavigate()
    const {data} = getData()

    const getUniqueCategory = (data, property)=>{
          let newVal = data?.map((curElam)=>{
            return curElam[property]
          })
          newVal = [...new Set(newVal)]
          return newVal
        }
    

        const categoryOnlyData = getUniqueCategory(data, 'category')
  return (
    <div className='bg-[#101829]'>
      <div className='max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-around px-7 py-4'>
          {
            categoryOnlyData?.map((item, index)=>{
              return <div key={index}>
                <button onClick={()=> navigate(`/category/${item}`)} className='uppercase bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-1 rounded-md cursor-pointer'>{item}</button>
              </div>
            })
          }
      </div>
    </div>
  )
}

export default Category
