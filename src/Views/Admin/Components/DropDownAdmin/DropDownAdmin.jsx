import { useEffect, useState} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from './DropDownAdmin.module.css'

function DropDownAdmin({title, options, reset, getProducts}) {

 const [open, setOpen] = useState(false);
 const [currentTitle, setCurrentTitle] = useState(false)

useEffect(()=>{
  setCurrentTitle(false)
  
},[reset])

 const handleSelect = (name) => {
  setOpen(!open);
  if(name === 'Reset'){
    setCurrentTitle(false)
    getProducts({[title.toLowerCase()]:name})
  } else{
    setCurrentTitle(name)
    getProducts({[title.toLowerCase()]:name})
  }
  }

  return (
 
    <Dropdown show={open} onToggle={(isOpen) => setOpen(isOpen)}>
      <Dropdown.Toggle size="m" className={styles.dropDown} >
       {(!currentTitle)? title: currentTitle}
      </Dropdown.Toggle>

      <Dropdown.Menu  className={styles.containerOptions} >
        {options && options.map((option, index) => {

         
return (<div  key={option.id || index + 1} onClick={()=> {handleSelect(option.name)}} style={{cursor: 'pointer', padding: '8px 16px', fontSize: '1rem'}}>{option.name}</div>)
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDownAdmin;