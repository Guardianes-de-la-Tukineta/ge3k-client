import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import ReactStars from 'react-stars';
import style from './FormRating.module.css'
import { useStore } from '../../zustand/useStore/useStore';
import { useAuth0 } from "@auth0/auth0-react";
import { customerStore } from '../../zustand/customerStore/customerStore';
import Swal from 'sweetalert2'

const FormRating = ({setShowFormRating,showFormRating,ProductId,setComments, prevComment}) => {
    const [validated, setValidated] = useState(true);
    const [rate,setRate] = useState(null) // para guardar la calificacion en estrellas  
    const[inputComment,setInputComment]= useState(prevComment || '') // para guardar lo que el user ponga en el input como comentario
    const {addRatingProduct,editRatingProduct} = useStore() // traemos el estado modificador de zustand  
    const { isAuthenticated } = useAuth0() // para saber si estoy logueado
    const {currentCustomer}=customerStore()   

    //handlers
    const handleSubmit = (event) => {     
        event.preventDefault(); 
        if(inputComment.length>8 && rate) {                       
            //limpiamos campos y cerramos ventana
            setRate(0)
            setInputComment('')
            setShowFormRating({
                state:false,
                edit:false
              })
            if(showFormRating.edit) {
                editRatingProduct(isAuthenticated,currentCustomer.id,ProductId,Number(rate),inputComment)
                setComments('uno nuevo')
            } else {
                addRatingProduct(isAuthenticated,currentCustomer.id,ProductId,Number(rate),inputComment)
                setComments('uno nuevo')
            }
            Swal.fire({
                position: 'center',
                icon:'success',
                title:'your comment was created successfully',
                showConfirmButton: false, 
                allowOutsideClick: false,
                timer:2000              
            })            
        } else {
            Swal.fire({
                position: 'center',
                icon:'error',
                title:'You must select the stars depending on their ratings and leave an opinion of the product',
                showConfirmButton: true, 
                allowOutsideClick: false                
            })
        };
    }
    const handlerChangeInput =(event)=>{
        const {value} = event.target;
        setInputComment(value)
    }
    const ratingChanged=(e)=>{        
        setRate(e)
    }
    const handlerCancel=()=>{
        setRate(0)
        setInputComment('')
        setShowFormRating({
            state:false,
            edit:false
          })
    }  
    
    return (
        <div className={style.containerContainer}>
        <div className={`${style.container} ${showFormRating.state? style.fadeIn : style.fadeOut}`}>                   
            <h4>How many stars would you give it?</h4>
            <div className='d-flex mb-3'>
                <ReactStars
                count={5}
                value={rate}
                onChange={ratingChanged}//para manejar el cambio de valoración
                size={24}
                color1={'#000'}
                half={false} 
                /> <span className='mt-2'>[{rate}]</span>
            </div>
            <Form className={style.formRate} noValidate validated={validated} onSubmit={(e)=>handleSubmit(e)}>
                <Form.Group controlId='validate01'>                    
                    <Form.Control
                        required
                        minLength="8"                
                        as="textarea" 
                        placeholder="leave your opinion here"
                        style={{width: "500px", height:"100px"}} 
                        value={inputComment}
                        onChange={(e)=>handlerChangeInput(e)} 
                                  
                    />
                    <Form.Control.Feedback type="invalid">
                        Required, minimum 8 characters                    
                    </Form.Control.Feedback>
                </Form.Group>
                <button className={`btn btn-success ${style.buttonSubmit}`} type='submit'><i className="bi bi-send-fill"></i></button>
            </Form>
            <button onClick={()=>handlerCancel()} className={`btn btn-danger ${style.buttonCancel}`}><i className="bi bi-x-square"></i></button>
        </div>  
        </div>        
    )      
      
}
 
export default FormRating;