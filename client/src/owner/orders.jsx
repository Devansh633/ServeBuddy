import React, { useEffect,useState } from 'react'

const Orders = () => {

  const [orderData,setOrderData] = useState({})
  const fetchMyOrder = async()=>{
    console.log(localStorage.getItem("email"))
    await fetch('/owner',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: localStorage.getItem('email')
      })
    }).then(async(res)=>{
      let response = await res.json()
       setOrderData(response)
       console.log(orderData.order_data)
    })
  }

  useEffect(()=>{
    fetchMyOrder()
  },[])

  return (
    <div>
        <div className='container'>
            <div className='w-[25rem] m-[2rem] bg-slate-400 rounded-md p-4'>

                {orderData !== {} ? Array(orderData).map(data => {
                    return (
                        data.orderData ?
                            data.orderData.order_data.slice(0).reverse().map((item) => {
                                return (
                                    item.map((arrayData,index) => {
                                        return (
                                            <div  >
                                                {index===0? <div className='m-auto '></div> :
                                                    <div >
                                                        <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                            <div className="flex flex-wrap gap-3">
                                                            <h1 className='text-[1.5rem]'>{arrayData.qty}:</h1>
                                                                <h1 className="text-[1.5rem]">{arrayData.name}</h1>
                                                                    
                                                            </div>
                                                        </div>

                                                    </div>
                                                }
                                            </div>
                                        )
                                    })

                                )
                            }) : ""
                    )
                }) : ""}
            </div>
        </div>
    </div>
)
}

export default Orders