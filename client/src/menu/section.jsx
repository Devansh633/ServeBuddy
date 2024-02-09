import React,{ useState } from 'react'
import { useDispatchCart,useCart } from '../cart/contextreducer'

const Section = (props) => {
  let dispatch = useDispatchCart()
  let  data = useCart() 
  const [click,setClick] = useState(false);
  const [count,setCount] = useState(1);
  let price = props.price

  const handleChange = () =>{
    setClick(!click)
    dispatch({type:"ADD",id:props.id, name:props.name, price:props.price, image:props.img, qty:count});
    console.log(data)
  }

  const increment =async() =>{
    setCount(count+1);
    // dispatch({type:"ADD",id:props.id, name:props.name, price:props.price, image:props.img, qty:(count+1)});
    // console.log(data)
    let food = []
    for (const item of data) {
      console.log(item)
      if (item.id === props.id) {
        console.log(food)
        food = item;
        break;
      }
    }
    console.log(food)
    if (food !== []) {
      console.log(food.qty)
      console.log(count+1)
      if (food.qty !== count+1) {
        console.log("update")
        console.log(props.id)
        await dispatch({ type: "UPDATE", id: props.id, price: price*(count+1), qty: count+1 })
        return
      }
      }
    }

 

  const decrement =async() =>{
    setCount(count-1);
    if(count-1<1){
      await dispatch({type:"REMOVE",index:props.index})
    }
    else{
    let food = []
    for (const item of data) {
      console.log(item)
      if (item.id === props.id) {
        console.log(food)
        food = item;
        break;
      }
    }
    console.log(food)
    if (food !== []) {
      console.log(food.qty)
      console.log(count+1)
      if (food.qty !== count+1) {
        console.log("update")
        console.log(props.id)
        await dispatch({ type: "UPDATE", id: props.id, price: price*(count-1), qty: count-1 })
        return
      }
      }
  };
  }

  {if (count===0) {
    setClick(false);
    setCount(1);
  }};


  return (

    <div className='flex  w-[30rem] ml-[5rem] mr-[5rem] mb-[2rem] border-b-2 border-black border-spacing-8 '>
        <div className='h-40 w-40 bg-red-500 mr-12 rounded-lg'>
        <img src={props.img} className='w-full h-full rounded-lg '/>
        </div>
        <div className='flex flex-col'>
            <h2 className='  text-3xl font-bold py-3 font-custom drop-shadow-md'>{props.name}</h2>

            <p className='text-3xl bottom-0 mt-2'>{props.price}</p>
            {click === false || count===0 ?<button className='text-2xl border-2 border-[#f0c808] ml-[7rem] right-0 rounded-md px-7' onClick={handleChange} >ADD</button>:
            <div className='flex  bg-[#f0c808]  ml-[7rem]  rounded-md'>
              <button className='text-2xl bord[#f0c808] rounded-l-md px-4' onClick={decrement}>-</button>
              <p className='text-2xl  border-2 border-[#f0c808]'>{count}</p>
              <button className='text-2xl border-2  border-[#f0c808] px-4  rounded-r-md' onClick={increment}>+</button>
            </div>}
            {/* <p className='text-2xl ml-24 text-red-700 '>Not Available</p> */}
        </div>
        

    </div> 
  )
}
export default Section