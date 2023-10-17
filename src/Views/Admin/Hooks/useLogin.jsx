import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useLogin =  () => {

    const [spinner, setSpinner] = useState(false)
    const [error,setError] = useState(false)
    const navigate = useNavigate()

const handleLogin = async({email, password})=>{

    setSpinner(true)

    try {
        const URL = 'https://ge3k-server.onrender.com/admin/login'
        const dataUser = {email, password};
        const {token} = (await axios.post(URL,dataUser)).data
        localStorage.setItem('token', token);
        navigate('/admin');
        setSpinner(false)

    } catch (error) {
        if(error.response){
            setSpinner(false)
            if(error.message === "Request failed with status code 404"){
                setError("Seems like we're experiencing technical difficulties. Please contact our support for assistance")
                setTimeout(() => {
                  setError(false)
                }, 5000)
              } else if(error.response.data.error) {
                setSpinner(false)
                setError(error.response.data.error)
                setTimeout(() => {
                  setError(false)
                }, 5000)
              }
        } else {
            setSpinner(false)
            setError('Could not retrieve a response from the server. Please check your Internet connection')
        setTimeout(() => {
          setError(false)
        }, 5000);
        }
    }
}

  return ({handleLogin, spinner, error})
}

export default useLogin
