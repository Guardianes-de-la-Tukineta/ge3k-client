import React from 'react';
import { useForm } from 'react-hook-form';
import style from './LoginForm.module.css'
import logo from '../../../../Images/adminLogo.svg'
import Spinner from 'react-bootstrap/Spinner';

const Login = ({handleLogin, spinner}) => {

 
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });

  const onSubmit = data => handleLogin(data);

  return (
    <div className={style.loginContainer}>
       
    <form onSubmit={handleSubmit(onSubmit)} className={style.loginForm}>
    <img src={logo} className={style.logoForm} />
        <div>
      <input 
        type="email" 

        id='email'
        placeholder="Email" 
        {...register("email", { 
          required: "This field is required.",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "Invalid email address"
          }
        })} 
      />
      {errors.email && <span className={style.error}>{errors.email.message}</span>}
      </div>
      
      <div>
        
      <input 
      id='password'
        type="password" 
        placeholder="Password" 
        {...register("password", { required: true })} 
      />
      {errors.password && <span className={style.error}>This field is required.</span>}
      </div>
      
      <div>
      <button>{(!spinner) ? 'Create new product':  <Spinner animation="border" variant="light" />}</button>
      </div>
    </form>
    </div>
  );
}

export default Login;