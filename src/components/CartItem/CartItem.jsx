import React, { useState } from 'react'
import style from './CartItem.module.css'
import Dropdown from 'react-bootstrap/Dropdown';
import { cartStore } from '../../zustand/cartStore/cartStore';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth0 } from "@auth0/auth0-react";
import { customerStore } from '../../zustand/customerStore/customerStore';
import Spinner from "react-bootstrap/Spinner";
import { useEffect } from 'react';

const CartItem = ({name,price,image,id:idProduct}) => {
    //estados y actions
    const {deleteProductCart,setQuantity,cart,errorQuantity,clearErrorQuantity} = cartStore() //nos traemos estados de zustand      
    let cantidadActual= cart.find(({product})=>product.id===idProduct).quantity // sabremos que cantidad tiene cada product
    const[isType,setIsType]=useState(false) //para cambiar a visualizar el input    
    const {register,formState:{errors},handleSubmit}=useForm()
    const { isAuthenticated } = useAuth0() // para saber si estoy logueado
    const {currentCustomer}=customerStore()
    const [isLoading, setIsLoading] = useState(false); // Nuevo estado para controlar el spinner
    
    //handlers
    const handlerDeleteProduct =()=>{   //para borrar product     
        deleteProductCart(isAuthenticated || false,currentCustomer.id,idProduct)        
    }   
    const handlerChangeQuantity = (e) => {
        const value = Number(e.target.innerText);
        if (isNaN(value)) { // si la opcion en digitar manualmente llegara como NaN
            setIsType(true); // cambiamos el estado para renderizar un input y que user digite la cantidad manualmente 
        } else {            
            setIsLoading(true); // Mostrar spinner
            setQuantity(isAuthenticated || false, currentCustomer.id, idProduct, value);                           
            setIsType(false);            
        }
    }
    const onSubmit=(data)=>{      //para cambiar cantidad desde input    
        setIsLoading(true); // Mostrar spinner
        setQuantity(isAuthenticated || false,currentCustomer.id,idProduct,Number(data.cantidad))  //mandamos la info del input
        setIsType(false)     
    }

    // Generar las opciones del menú desplegable usando un bucle for
    const dropdownOptions = [];
    for (let i = 1; i < 6; i++) {
        dropdownOptions.push(
            <Dropdown.Item key={i} onClick={(e) => handlerChangeQuantity(e)}>{i}</Dropdown.Item>
        );
    } 

    useEffect(()=>{        
        isLoading && setIsLoading(false)        
        if(errorQuantity.length>0) cantidadActual=Number(errorQuantity.match(/\d+/g).join(''))
        clearErrorQuantity()
    },[cart,errorQuantity,cantidadActual])
    
    return (
        <div className={`card ${style.cartItem}`}>
            <div className='card-body d-flex flex-column w-100 h-100 '>                
                <Link to={`/product/${idProduct}`}>
                    <img
                        src={image}
                        alt={name}
                        className={`${style.img}`}
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
                                {
                                    isLoading && isAuthenticated ? (
                                        <Spinner  
                                        style={{ height: '17px', width: '17px' }}                             
                                        animation="border"
                                        variant="dark"
                                        />)
                                    :   (cantidadActual)
                                }
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {dropdownOptions} {/*renderiza 10 opciones*/}
                                    <Dropdown.Item onClick={(e) => handlerChangeQuantity(e)}>Type Qty </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>                            
                        :
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input
                                type='text'                                
                                defaultValue='11'                               
                                className={`form-control ${style.inputCant}`}
                                {...register('cantidad',{
                                    required:true,
                                    min:1,
                                    max:100,                                                                           
                                })}
                            />
                            {errors.cantidad?.type==='required' && <p className="text-danger ">Required </p>}
                            {(errors.cantidad?.type==='min' || errors.cantidad?.type==='max') && <p className="text-danger ">1~100</p>}
                            {!errors.cantidad ?.type &&
                                <button className='btn btn-success' type='submit'>Update</button>
                            }
                        </form> 
                    }                     
                    <button onClick={()=>handlerDeleteProduct()} className={`btn btn-dark ${style.btnDelete}`}>
                        <i className={`bi bi-trash3 ${style.iconTrash}`}></i>
                    </button>
                </div>               
            </div>  
                
        </div>
        
    );
}
 
export default CartItem;