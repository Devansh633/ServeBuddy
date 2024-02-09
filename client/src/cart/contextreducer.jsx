import React,{createContext,useReducer,useContext} from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state,action) => {
    switch(action.type){
        case "ADD":
            return[...state,{id:action.id, name:action.name, price:action.price, image:action.img, qty:action.qty}]

        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index,1)
            return newArr;
        case "UPDATE":
            let arr = [...state]
            // arr.find((food, index) => {
            //     console.log(food.id,action.id)
            //     if (food.id === action.id) {
            //         console.log(food.qty, parseInt(action.qty), action.price,food.price)
            //        arr[index] = { ...food, qty: parseInt(action.qty) , price: action.price}
            //        console.log(action.price)
            //     }
            //     return arr
            // })
            let index=-1
            for (const food of arr) {
                index = index+1
                console.log(food.id,action.id)
                if (food.id === action.id) {
                    console.log(food.qty, parseInt(action.qty), action.price,food.price)
                      arr[index] = { ...food, qty: parseInt(action.qty) , price: action.price}
                   console.log(action.price)
                   index=-1
                   return arr
            }}
        case "DROP":
            let empArray = []
            return empArray
            
        default:
            console.log("Error is Reducer")
    }
}

export const CartProvider = ({children}) =>{

    const[state,dispatch] = useReducer(reducer,[])
    return(
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext)
export const useDispatchCart = () => useContext(CartDispatchContext)