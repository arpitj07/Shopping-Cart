import { Button } from "@material-ui/core";

//styles
import { Wrapper } from "./CartItem.styles";

import { CartItemType } from "../App";

type Props={
    item: CartItemType;
    addToCart: (clickedItem: CartItemType)=> void
    removeFromCart: ( id: number) => void
}

export const CartItem: React.FC<Props> = ({item, addToCart, removeFromCart}) =>(

    <Wrapper>
        <div>
            <h2>{item.title}</h2>
            <div className="information">
                <p>Price: ${item.price}</p>
                <p>Total: ${(item.amount*item.price).toFixed(2)}</p>
            </div>
            <div className="buttons">
                <Button
                    size="small"
                    disableElevation
                    variant="contained"
                    onClick={()=> removeFromCart(item.id)}>
                        -
                </Button>
                <p> {  item.amount  } </p>
                <Button
                    size="small"
                    disableElevation
                    variant="contained"
                    onClick={()=> addToCart(item)}
                >
                    +
                </Button>

            </div>
        </div>
        <img src={item.image} alt={item.title}/>
    </Wrapper>
)