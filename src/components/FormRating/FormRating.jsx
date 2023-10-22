import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import ReactStars from 'react-stars';
import style from './FormRating.module.css'

const FormRating = ({name,setShowFormRating,showFormRating}) => {
    const [validated, setValidated] = useState(false);
    const [rate,setRate] = useState(0) // para guardar la calificacion en estrellas  
        
    //handlers
    const handleSubmit = (event) => {     
        event.preventDefault()
        setValidated(true);
      };
    const ratingChanged=(e)=>{        
        setRate(e)
    }
    const handlerCancel=()=>{
        setShowFormRating(false)
    }

    return (
        <div className={`${style.container} ${showFormRating? style.fadeIn : style.fadeOut}`}>
            {/* <h3>Rate the product</h3>
            <h3 className='mb-3'>{name}</h3>               */}
            <h4>How many stars would you give it?</h4>
            <div className='d-flex mb-3'>
                <ReactStars
                count={5}
                onChange={ratingChanged}//para manejar el cambio de valoración
                size={24}
                color1={'#000'}
                /> <p className='p0'>({rate})</p>
            </div>
            <Form className={style.formRate} noValidate validated={validated} onSubmit={(e)=>handleSubmit(e)}>
                <Form.Group controlId='validate01'>                    
                    <Form.Control
                        required
                        minLength="8"                
                        as="textarea" 
                        placeholder="leave your opinion here"
                        style={{width: "500px", height:"100px"}}              
                    />
                    <Form.Control.Feedback type="invalid">
                        Required, minimum 8 characters                    
                    </Form.Control.Feedback>
                </Form.Group>
                <button className={`btn btn-success ${style.buttonSubmit}`} type='submit'><i className="bi bi-send-fill"></i></button>
            </Form>
            <button onClick={()=>handlerCancel()} className={`btn btn-danger ${style.buttonCancel}`}><i className="bi bi-x-square"></i></button>
        </div>          
    )      
      
}
 
export default FormRating;