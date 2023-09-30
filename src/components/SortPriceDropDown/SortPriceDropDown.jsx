import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useStore } from "../../zustand/useStore/useStore";

function SortPriceDropDown() {

 const {sortCurrentProductsByPrice} = useStore()
 const [open, setOpen] = useState(false);

 const handleSelect = (key) => {
    console.log(key)
    setOpen(!open);
    sortCurrentProductsByPrice(key);
  }

  return (
 
    <Dropdown show={open} onToggle={(isOpen) => setOpen(isOpen)}>
      <Dropdown.Toggle variant="success" id="dropdown-basic" size="sm" style={{backgroundColor:'#111111'}}>
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu style={{minWidth: '100%'}}>
      <div  onClick={()=> handleSelect('asc')} style={{cursor: 'pointer', padding: '8px 8px', fontSize: '0.85rem'}}>Lowest price first</div>
        <div onClick={()=> handleSelect('desc')} style={{cursor: 'pointer', padding: '8px 8px', fontSize: '0.85rem'}}>Highest price first</div>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SortPriceDropDown;