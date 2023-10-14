import React, {useEffect, useState} from 'react'
import styles from './SearchBarAdmin.module.css'


const SearchBarAdmin = ({handleSearch, placeholder, setResetDropDowns, reset}) => {

  const [value, setValue] = useState('')

  const handleSubmit = (e)=>{
    if(value === ''){
      e.preventDefault()
      return
    }
    e.preventDefault()
    handleSearch(value)
    setResetDropDowns(true)
  }

  useEffect(()=>{ console.log('entro'); setValue('')},[reset])

  return (
    <form className={styles.searchContainer}>
      <input type="text" onChange={(e)=>setValue(e.target.value)} value={value} placeholder={placeholder || 'Enter name or ID'}   className={styles.inputSearch}/>
      <button onClick={handleSubmit}><i class="bi bi-search"></i></button>
    </form>
  )
}

export default SearchBarAdmin
