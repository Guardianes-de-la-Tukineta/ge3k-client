import React from 'react'
import { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form'
import Spinner from "react-bootstrap/Spinner";
import style from "./NewPasswordForm.module.css"

const NewPasswordForm = ({admin, handleNewPassword, handleClosePassModal}) => {


    useEffect(() => {
         document.body.classList.add('no-scroll');
        // Limpiar después de que el componente se desmonte
        return () => {
            document.body.classList.remove('no-scroll');
          };
      },[]);


 const [showPassword, setShowPassword] = useState(false);
 const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 const [loadingForm, setLoadingForm] = useState(false)

 const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
 } ;
  
 const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
 } ;

 const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    setValue,
    getValues,
    reset,
  } = useForm();


    const onSubmit = async (dataFrom) =>{

      setLoadingForm(true)
    try {
      await handleNewPassword(admin, dataFrom.password)
    
      reset();
      setLoadingForm(false)
      handleClosePassModal()
    } catch (error) {
  
      console.log(error)
    } }

  return (
    <div className={style.passwordFormContainer} >
      <form   onSubmit={handleSubmit(onSubmit)} className={style.AddProductForm}>
        <button className={style.closeButton} type="button" onClick={handleClosePassModal}><i className="bi bi-x-circle"></i></button>
      <h4 className="text-center">NEW PASSWORD to <strong>{admin.name}</strong></h4>
        <label>
            <span>Email</span>
            <input type="text" value={admin.email} readOnly />
        </label>
        <label>
            <span>New Password</span>
            <div className={style.passwordInput}>
            <input type={(!showPassword)? "password" : "text"}
            {...register("password", {required:"This field is required.", pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%.*?&]{10,}$/,
                message:
                  "Use 1 uppercase, 1 number, 1 symbol, and a minimum of 10 characters",
              }})}
              onChange={(e) => {
                setValue("password", e.target.value);
                trigger("password");
              }}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={style.showPasswordButton}
            >
              {!showPassword ? (
                 <i className="bi bi-eye-slash-fill"></i>
           
              ) : (
                <i className="bi bi-eye-fill"></i>
              )}
            </button>
           </div>
           {errors.password && (
              <span className={style.error}>{errors.password.message}</span>
            )}
        </label>
        <label>
         
            <span>Confirm password:</span>
            <div className={style.passwordInput}>
            <input
              type={(!showConfirmPassword)?"password":"text"}  
              {...register("confirmPassword", {
                required: "This field is required",
                validate: (value) =>
                  value === getValues().password ||
                  "The passwords do not match",
              })}
              onChange={(e) => {
                setValue("confirmPassword", e.target.value);
                trigger("confirmPassword");
              }}
            />
             <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className={style.showPasswordButton}
            >
              {!showConfirmPassword ? (
                 <i className="bi bi-eye-slash-fill"></i>
           
              ) : (
                <i className="bi bi-eye-fill"></i>
              )}
            </button>
           </div>
            {errors.confirmPassword && (
              <span className={style.error}>
                {errors.confirmPassword.message}
              </span>
            )}
          </label>
          <button type="submit" disabled={!isValid}  className={style.sumbit} >
            {!loadingForm? (
              "Save New Password"
            ) : (
              <Spinner animation="border" variant="light" />
            )}
          </button>
      </form>
    </div>
  )
}

export default NewPasswordForm
