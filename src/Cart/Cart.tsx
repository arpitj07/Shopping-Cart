import { CartItem } from "../CartItem/CartItem";
import { Wrapper } from "./Cart.styles";
import { CartItemType } from "../App"; 

type Props ={
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType)=> void;
    removeFromCart: (id: number)=> void;
}


export const Cart: React.FC<Props> = ({cartItems, addToCart, removeFromCart})=>{

    const calculateTotal = (items: CartItemType[]) =>{
        return items.reduce((ack:number, item)=>ack + (item.amount* item.price),0)
    }


    return(
        <Wrapper>
            <h3>Your Shopping Cart</h3>
            {cartItems.length===0? <p>Card Empty</p>: null}
            {cartItems.map(item =>(
                <CartItem
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}

                />
            ))}
            <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
         </Wrapper>
    )
};