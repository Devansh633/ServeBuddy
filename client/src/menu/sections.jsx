import React from 'react'
import Section from './section'

const Sections = (props) => {
  return (
    <div className='flex flex-wrap justify-center '>
        {props.content.map((item,index) => (
            <div key={item.id}><Section id={item.id} name={item.title} price={item.price} img = {item.image} index={index}/></div>
        ))}
    </div>
  )
}

export default Sections