import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { CartTest } from "./CartContext";
import { useContext } from "react";

const CardTest = (props) => {   //props.product choosen for sell
    const product = props.product;


  const cart = useContext(CartTest);
   
   const productQuantity = cart.getProductQuantity(product.stripe);
  return(
    <Card>
        <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>${product.price}</Card.Text>
            { productQuantity > 0 ? 
            <>
               <Form as={Row}>
                  <Form.Label column="true" sm="6"> In Cart: {productQuantity} </Form.Label>
                  <Col sm="6">
                     <Button sm="6" onClick={()=> cart.addOneToCart(product.stripe) }className="mx-2">+</Button>
                     <Button sm="6" onClick={()=> cart.removeOneFromCart(product.stripe) } className="mx-2">-</Button>
                  </Col>

               </Form>
               <Button variant="danger" onClick={() => cart.deleteFromCart(product.stripe)} className="my-2">Remove from Cart</Button>
            </>  
            :
            <Button variant="warning" 
            onClick={() => cart.addOneToCart(product.stripe)}>Add to Cart</Button>
          }
        </Card.Body>

    </Card>
  )
}

export default CardTest;