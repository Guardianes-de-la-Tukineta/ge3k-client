import { useEffect, useState} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

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
      <Dropdown.Toggle variant="secundary" id="dropdown-basic" size="m" style={{ padding: '0.2rem 2rem'}}>
       {(!currentTitle)? title: currentTitle}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{minWidth: '100%'}}>
        {options && options.map(option => {

         
return (<div  onClick={()=> {handleSelect(option)}} style={{cursor: 'pointer', padding: '8px 16px', fontSize: '0.85rem'}}>{option}</div>)
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDownAdmin;