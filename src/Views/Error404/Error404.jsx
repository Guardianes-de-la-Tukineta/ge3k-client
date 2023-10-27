import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Error.module.css'

const Error404 = () => {
  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-6 text-center mt-4 mb-4'>

        
     <h1>404 Error: Page Not Found</h1>
  <p>Oops! The page you're looking for has vanished into thin air. Maybe it took a vacation or went to find itself. In the meantime, let's get you back on track.</p>
  <button className={styles.button} ><Link to='/'> Return Home</Link></button>
  </div>
  </div>
    </div>
  )
}

export default Error404
