import React, {useState} from "react";
import style from "./FormAddAdmin.module.css"
import { useForm } from "react-hook-form";
import Spinner from "react-bootstrap/Spinner";



const FormAddAdmin = ({handleCreateNewAdmin, loading}) => {


const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    try {
      await handleCreateNewAdmin(dataFrom)
      console.log('fdsfasdfasdfadsf')
      reset();
    } catch (error) {
      console.log('sdafsdfasd')
      console.error("Error al crear un nuevo administrador:", error);
    }

  }


  return (
    <div className={`container-fluid`} style={{ padding: "1rem 2.4rem" }}>
      <div className={`row ${style.rowContainer}`}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`col-md-7 ${style.AddProductForm}`}
        >
          <h4 className="text-center">NEW ADMIN</h4>
          <label>
            <span>Name:</span>
            <input
              {...register("name", { required: true, maxLength: 100 })}
              placeholder="Juan Pablo"
              onChange={(e) => {
                setValue("name", e.target.value);
                trigger("name");
              }}
            />
            {errors.name && (
              <span className={style.error}>This field is required</span>
            )}
          </label>

          <label>
            <span>Nick Name:</span>
            <input
              {...register("surname", { required: true, maxLength: 500 })}
              placeholder="Juanpi83"
              onChange={(e) => {
                setValue("surname", e.target.value);
                trigger("surname");
              }}
            />
            {errors.surname && (
              <span className={style.error}>This field is required</span>
            )}
          </label>

          <label>
            <span>Email:</span>
            <input
              id="email"
              placeholder="Email"
              {...register("email", {
                required: "This field is required.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
              onChange={(e) => {
                setValue("email", e.target.value);
                trigger("email");
              }}
            />
            {errors.email && (
              <span className={style.error}>{errors.email.message}</span>
            )}
          </label>

          <label>
            <span>Password:</span>
            <div className={style.passwordInput}>
            <input
        
              type={(!showPassword)? "password" : "text"} 
              placeholder="Create a password"
              {...register("password", {
                required: "This field is required",
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%.*?&]{10,}$/,
                  message:
                    "Use 1 uppercase, 1 number, 1 symbol, and a minimum of 10 characters",
                },
              })}
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
              placeholder="Confirm the password"
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

          <button type="submit" disabled={!isValid}>
            {!loading ? (
              "Create New Admin"
            ) : (
              <Spinner animation="border" variant="light" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormAddAdmin;
