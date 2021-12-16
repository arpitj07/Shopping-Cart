import { Drawer, Grid, LinearProgress, Badge } from "@material-ui/core";
import { useState } from "react";
import { useQuery } from "react-query";
// import { AddShoppingCartIcon } from "@material-ui/icons";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


//Styles
import { Wrapper, StyledButton } from "./App.styles";

//Component
import  { Item }  from "./Items/Item"

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



    const getTotalItems = (items: CartItemType[]) => 
      items.reduce((ack:number, item)=>ack+ item.amount,0);
    
    
    const handleAddToCart = (clickedItem: CartItemType) => null;
    const handleRemoveFromCart = () => null;

    if(isLoading) return <LinearProgress/>
    if(error) return <div>Something Went Wrong...</div>



  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={()=> setCartOpen(false)}>
        CART GOES HERE...
      </Drawer>

      <StyledButton onClick={()=> setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <ShoppingCartIcon/>
        </Badge>
      </StyledButton>

      <Grid container spacing={3}>
        {data?.map(item=>(
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart ={handleAddToCart}/>
          </Grid>
        ))}

      </Grid>
    </Wrapper>
  )
}

export default App;
