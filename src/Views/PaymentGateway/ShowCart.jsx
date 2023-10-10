import { Button } from "react-bootstrap";
import { CartTest } from "./CartContext";
import { useContext } from "react";
import { getProductData } from "./PaymentGateway";

const ShowCart = (props) => {
    const cart = useContext(CartTest);

    const id = props.id;
    const quantity = props.quantity;
    const productData = getProductData(id);

    return(
        <>
          <h3>{productData.title}</h3>
          <p>{quantity} products </p>
          <p>${(quantity * productData.price).toFixed(2)}</p>
          <Button size="sm" onClick={() => cart.deleteFromCart(id)}>Remove</Button>
          <hr />
        </>
    )
}

export default ShowCart;