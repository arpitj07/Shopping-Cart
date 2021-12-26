import { Drawer, Grid, LinearProgress, Badge } from "@material-ui/core";
import { useState } from "react";
import { useQuery } from "react-query";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


//Styles
import { Wrapper, StyledButton } from "./App.styles";

//Component
import  { Item }  from "./Items/Item"
import { Cart } from "./Cart/Cart";

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

//Promise is a generic type with and argument TYPE. 

const getProducts = async(): Promise<CartItemType[]> =>
  await ( await fetch("https://fakestoreapi.com/products")).json();

const App = () => {

  const [cartOpen, setCartOpen]=useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const { data, isLoading, error } = useQuery<CartItemType[]>(
                                      "prodcts",getProducts);

    console.log(data)


    //-----> getTotalItems function defined
    const getTotalItems = (items: CartItemType[]) => 
      items.reduce((ack:number, item)=> ack + item.amount,0);
    
    //-----> handleAddToCart function defined
    const handleAddToCart = (clickedItem: CartItemType) => {
      setCartItems(prev => {
        //If item already in cart.
        const isIteminCart = prev.find(item => item.id===clickedItem.id);

        if (isIteminCart){
          return prev.map(item=> 
            item.id===clickedItem.id
            ? {...item, amount: item.amount+1}
            : item
          )
        }
        //First Time item is added.
        return [...prev,{...clickedItem, amount:1}]
      });
    };


    const handleRemoveFromCart = (id:number) => {
      setCartItems(prev=>(
        prev.reduce((ack,item)=>{
          if(item.id===id){
            if(item.amount===1) return ack;   //--------> this will remove the item from the cart ( empty )
            return [...ack, {...item, amount: item.amount-1}] //------> this will remove one item if same item is more than 1
          }
          else{
            return [ ...ack, item] //-----> If ID doesnt matches it will just return item.
          }
        }, [] as CartItemType[])
      ))
    };

    if(isLoading) return <LinearProgress/>
    if(error) return <div>Something Went Wrong...</div>



  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={()=> setCartOpen(false)}>
        <Cart 
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>

      <StyledButton onClick={()=> setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <ShoppingCartIcon/>
        </Badge>
      </StyledButton>

      <Grid container spacing={3}>
        {data?.map(item=>(          //-----> question mark (?) here is used if no data fetched it will return UNDEFINED.
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart ={handleAddToCart}/>
          </Grid>
        ))}

      </Grid>
    </Wrapper>
  )
}

export default App;
