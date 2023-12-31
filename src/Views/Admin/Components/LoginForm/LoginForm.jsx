import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import style from './LoginForm.module.css'
import logo from '../../../../Images/adminLogo.svg'
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

const Login = ({handleLogin, spinner, error}) => {

  const [showPassword, setShowPassword] = useState(false);


  const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
} ;
 
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });

  const onSubmit = data => handleLogin(data);

  return (
    <div className={style.loginContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.loginForm}>
        <img src={logo} className={style.logoForm} />
        <div>
          <input
            type="email"
            id="email"
            placeholder="Email"
            {...register("email", {
              required: "This field is required.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span className={style.error}>{errors.email.message}</span>
          )}
        </div>

        <div className={style.passwordInput}>
          <input
            id="password"
            type={!showPassword ? "password" : "text"}
            placeholder="Password"
            {...register("password", { required: true })}
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
          {errors.password && (
            <span className={style.error}>This field is required.</span>
          )}
        </div>

        <div>
          <button>
            {!spinner ? (
              "Login"
            ) : (
              <Spinner animation="border" variant="light" />
            )}
          </button>
        </div>
      </form>
      {error && (
        <Alert
          key={"danger"}
          variant={"danger"}
          style={{
            height: "2.5rem",
            display: "flex",
            alignItems: "center",
            marginTop: "2rem",
          }}
        >
          {error}
        </Alert>
      )}
    </div>
  );
}

export default Login;