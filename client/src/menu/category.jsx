import React from 'react'
import Sections from './sections'
import Title from './title'
import Data from './menudata.json'

const Category = () => {
  return (
    <div>
      {
      Data.map(data =>{
        return(
          <div key={data.id}>
            <h1 className='underline flex justify-center md:text-6xl text-5xl my-10 font-custom drop-shadow-md'>{data.title}</h1>
            <Sections content={data.types} />
          </div>
           
        )
      })
      }
    </div>
  )
}

export default Category