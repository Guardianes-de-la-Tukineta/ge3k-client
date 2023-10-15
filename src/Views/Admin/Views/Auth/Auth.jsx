import React, {useState} from 'react'
import Login from '../../Components/LoginForm/LoginForm'
import { useNavigate } from 'react-router-dom';




// Usa la función de inicio de sesión simulada
const login = async (email, password) => {
    // Simulación de la función login
    await new Promise((resolve) => setTimeout(resolve, 3000));
  
    if (email === 'paola@gmail.com' && password === '123456') {
      return 'token-de-autenticacion';
    } else {
      throw new Error('Credenciales incorrectas');
    }
  };




const Auth = () => {
const navigate = useNavigate();
const [spinner, setSpinner] = useState(false)


   const handleLogin = async ({email, password}) => {
   
    try {
      setSpinner(true)
        const token = await login(email,password )
        localStorage.setItem('token', token);
        navigate('/admin');
        setSpinner(false)
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        setSpinner(false)
    }
   } 



  return (
    <div>
      <Login handleLogin={handleLogin} spinner={spinner} />
    </div>
  )
}

export default Auth
