import React, {useState} from 'react'
import styles from './SearchBarAdmin.module.css'


const SearchBarAdmin = ({handleSearch, placeholder}) => {

  const [value, setValue] = useState('')

  const handleSubmit = (e)=>{
    if(value === ''){
      e.preventDefault()
      return
    }
    e.preventDefault()
    handleSearch(value)
    setValue('')
  }

  return (
    <form className={styles.searchContainer}>
      <input type="text" onChange={(e)=>setValue(e.target.value)} value={value} placeholder={placeholder || 'Enter name or ID'}   className={styles.inputSearch}/>
      <button onClick={handleSubmit}>Search</button>
    </form>
  )
}

export default SearchBarAdmin
