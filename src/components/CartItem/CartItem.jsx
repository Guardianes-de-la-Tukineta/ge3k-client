import React, { useState } from 'react'
import style from './CartItem.module.css'
import Dropdown from 'react-bootstrap/Dropdown';
import { cartStore } from '../../zustand/cartStore/cartStore';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const CartItem = ({name,price,image,id}) => {
    //estados y actions
    const {deleteProductCart,setQuantity,cart} = cartStore() //nos traemos estados de zustand      
    const cantidadActual= cart.find(({product})=>product.id===id).quantity // sabremos que cantidad tiene cada product
    const[isType,setIsType]=useState(false) //para cambiar a visualizar el input    
    const {register,formState:{errors},handleSubmit}=useForm()
    
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
    const onSubmit=(data)=>{                 
        setQuantity(id,Number(data.cantidad))  //mandamos la info del input
        setIsType(false)     
    }

    // Generar las opciones del menú desplegable usando un bucle for
    const dropdownOptions = [];
    for (let i = 1; i < 6; i++) {
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
                                {cantidadActual}
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