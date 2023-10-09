import React, { useState } from 'react'
import style from './CartItem.module.css'
import Dropdown from 'react-bootstrap/Dropdown';
import { cartStore } from '../../zustand/cartStore/cartStore';
import { Link } from 'react-router-dom';

const CartItem = ({name,price,image,id}) => {
    //estados y actions
    const {deleteProductCart,setQuantity,cart} = cartStore() //nos traemos estados de zustand    
    
    const cantidadActual= cart.find(({product})=>product.id===id).quantity // sabremos que cantidad tiene cada product
    const[isType,setIsType]=useState(false) //para cambiar a visualizar el input
    const[inputValue,setInputValue]=useState(11) //para guardar lo q el user digite como cantidad, empieza con 11
    
    //handlers
    const handlerDeleteProduct =()=>{
        deleteProductCart(id)
    }
    const handlerChangeQuantity=(e)=>{
        const value = Number(e.target.innerText)          
        if(isNaN(value)){ // si la opcion es digitar manualmente llegara como NaN
            setIsType(true) // cambiamos el estado para renderizar un input y que user digite la cantidad manualmente           
        } else {                 
            setQuantity(id,value)
            setIsType(false)
        }
    }
    const handlerSubmit=(e)=>{        
        e.preventDefault();       
        setQuantity(id,Number(inputValue))  //mandamos la info del input
        setIsType(false)     
    }

    // Generar las opciones del menú desplegable usando un bucle for
     const dropdownOptions = [];
     for (let i = 1; i < 11; i++) {
         dropdownOptions.push(
             <Dropdown.Item key={i} onClick={(e) => handlerChangeQuantity(e)}>{i}</Dropdown.Item>
         );
     }

    return (
        <div className={`card ${style.cartItem}`}>
            <div className='card-body d-flex flex-column w-100 h-100 '>
                <Link to={`/product/${id}`}>
                    <img
                        src={image}
                        alt={name}
                        className={style.img}
                    />
                </Link>
                <div className='text-center'>
                    ${price}
                </div>
                <div className='d-flex justify-content-between'> 
                    {
                        !isType ?
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {cantidadActual}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {dropdownOptions} {/*renderiza 10 opciones*/}
                                    <Dropdown.Item onClick={(e) => handlerChangeQuantity(e)}>Type Qty </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>                            
                        :
                        <form>
                            <input
                                type='text'
                                value={inputValue}
                                onChange={(e)=>setInputValue(e.target.value)} 
                                className={style.inputCant}                               
                            />
                            <button onClick={(e)=>handlerSubmit(e)} className='btn btn-success' type='submit'>Update</button>
                        </form> 
                    } 

                    <button onClick={()=>handlerDeleteProduct()} className='btn btn-dark'>
                        <i className="bi bi-trash3"></i>
                    </button>
                </div>
            </div>          
        </div>
    );
}
 
export default CartItem;