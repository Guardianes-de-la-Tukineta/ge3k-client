import { useState, useEffect} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useStore } from "../../zustand/useStore/useStore";

function SortPriceDropDown({nameCategory, nameThematic}) {

 const {sortCurrentProductsByPrice, resetOrder} = useStore()
 const [open, setOpen] = useState(false);
 const [currentSort, setCurrentSort] = useState(false)


 useEffect(()=>{
  setCurrentSort(false)
 },[nameCategory, nameThematic])

 const handleSelect = (key) => {
    setOpen(!open);
    setCurrentSort(key)
    sortCurrentProductsByPrice(key);
  }

  const handleResetOrder = ()=>{
    setOpen(!open);
    resetOrder()
    setCurrentSort(false)
    sortCurrentProductsByPrice(key);
  }

  return (
 
    <Dropdown show={open} onToggle={(isOpen) => setOpen(isOpen)}>
      <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm" style={{backgroundColor:'#111111', padding: '0.2rem 2rem'}}>
       {(!currentSort)? 'Sort by price': (currentSort === 'asc') ? 'Lowest price first' : 'Highest price first'}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{minWidth: '100%'}}>
      <div  onClick={()=> handleSelect('asc')} style={{cursor: 'pointer', padding: '8px 16px', fontSize: '0.85rem'}}>Lowest price first</div>
      <div onClick={()=> handleSelect('desc')} style={{cursor: 'pointer', padding: '8px 16px', fontSize: '0.85rem'}}>Highest price first</div>
      <div onClick={()=> handleResetOrder()} style={{cursor: 'pointer', padding: '8px 16px', fontSize: '0.85rem'}}>Reset</div>
     
     
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SortPriceDropDown;