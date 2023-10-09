import React, {useState} from 'react'
import Login from '../../Components/LoginForm/LoginForm'
import { useNavigate } from 'react-router-dom';




// Usa la función de inicio de sesión simulada
const login = async (email, password) => {
    // Simulación de la función login
    await new Promise((resolve) => setTimeout(resolve, 3000));
  
    if (email === 'kevin@gmail.com' && password === '123456') {
      return 'token-de-autenticacion';
    } else {
      throw new Error('Credenciales incorrectas');
    }
  };




const Auth = () => {
const navigate = useNavigate();
const [loading, setLoading] = useState(false)



   const handleLogin = async ({email, password}) => {
   
    try {
        setLoading(true)
        const token = await login(email,password )
        localStorage.setItem('token', token);
        navigate('/admin');
        console.log('done')
        setLoading(false)
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        console.log('ups!!')
        setLoading(false)
    }
   } 



  return (
    <div>
      <Login handleLogin={handleLogin} loader={loading} />
    </div>
  )
}

export default Auth
