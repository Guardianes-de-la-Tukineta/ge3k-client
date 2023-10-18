import React, {useState} from 'react'
import axios from 'axios';
import useAuthToken from '../Hooks/useAuthToken'

const useCreateNewAdmin = () => {

  const {authToken} = useAuthToken()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleCreateNewAdmin = async(formData)=>{

    setLoading(true)
    const URL = 'https://ge3k-server.onrender.com/admin/';
    try {
      await axios.post(URL, formData, {
        headers:{
          Authorization: `Bearer ${authToken}`
        }
      })
      setLoading(false)
      setMessage(`New admin user ${formData.name} with email ${formData.email} created successfully.`)
      setTimeout(() => {
        setMessage('')
      }, 4000)
    } catch (error) {
   
        setLoading(false)
        if(error.response){
          if(error.message === "Request failed with status code 404"){
          setError("Seems like we're experiencing technical difficulties. Please contact our support for assistance")
          setTimeout(() => {
            setError(false)
          }, 5000)
        } else if(error.response.data) {
          setError(error.response.data.error)
          setTimeout(() => {
            setError(false)
          }, 5000)
        }
        } else {
          setError('Could not retrieve a response from the server. Please check your Internet connection')
          setTimeout(() => {
            setError(false)
          }, 5000);
        }
        throw error; 
    }
  }
  
  
    return ({ loading, error, message, handleCreateNewAdmin })
}

export default useCreateNewAdmin
