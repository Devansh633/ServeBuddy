import React,{useState} from 'react'
import {BiCart} from 'react-icons/bi'
import Modal from '../cart/model'
import Cart from '../cart/cart'
const Header = () => {

  const[cartView,setCartView] = useState(false)

  const loadCart = () => {
    setCartView(true)
}

  return (
    <div>
      <div className='max-w-6xl ml-auto mr-auto  '>        
          <h1 className='text-6xl md:text-7xl py-6 underline text-center font-custom drop-shadow-md'>Menu</h1>      
      </div>
      <button onClick={loadCart}>
        <BiCart className='w-[3rem] h-[3rem] fixed top-10 right-[4rem]' />
        </button>
        {cartView ? <Modal onClose={() => setCartView(false)}><Cart/></Modal> : null}
    </div>
  )
}

export default Header