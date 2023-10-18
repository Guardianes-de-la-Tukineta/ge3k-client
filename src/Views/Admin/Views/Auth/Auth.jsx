import React, {useState} from 'react'
import Login from '../../Components/LoginForm/LoginForm'
import useLogin from '../../Hooks/useLogin'

const Auth = () => {

  const {handleLogin, spinner, error} = useLogin();

  return (
    <div>
      <Login handleLogin={handleLogin} spinner={spinner} error={error} />
    </div>
  )
}

export default Auth
