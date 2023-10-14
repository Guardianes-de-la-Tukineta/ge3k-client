import React, { useEffect, useState } from "react";
import SearchBarAdmin from "../../../../Components/SearchBarAdmin/SearchBarAdmin";
import useGetSuggestionFromBack from "../../../../Hooks/useGetSuggestionFromBack";
import TableEditProduct from "../../../../Components/TableEditProduct/TableEditProduct";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import styles from './EditProduct.module.css'
import axios from "axios";
import DropDownAdmin from "../../../../Components/DropDownAdmin/DropDownAdmin";

const EditProduct = () => {
  const { keywordUsed,products, notSuggestion, loading, error, handleGetSuggestions, getProducts } =
    useGetSuggestionFromBack();
    const [resetDropDowns, setResetDropDowns] = useState(false)

    //Para resetear los dropdowns cuando se hace una nueva busqueda
    useEffect(()=>{
      setResetDropDowns(false)
    },[resetDropDowns])


    useEffect(()=>{
      getProducts()
    },[])



    const handleUpdate = async (id, newData) =>{
    try {
      if(newData.hasOwnProperty('discount') && (newData.hasOwnProperty('discount') === '' && newData.hasOwnProperty('discount') === 0)){
        newData.discount = null
      }

      console.log(newData)
      const URL = 'https://ge3k-server.onrender.com/products/'
      const {data} = await axios.put(URL+id,newData);
      console.log(data)
      await getProducts()
      

    } catch (error) {
      console.error(error)
    }

    console.log(products)
    }


  return (
    <div className="flex-grow-1 d-flex flex-column" style={{padding:' 1rem 1.65rem '}}>
      <div className={`${styles.editProductContainer} container-fluid flex-grow-1`}>
      <h4>EDIT PRODUCTS</h4>
      <div className="d-flex w-100 justify-content-between align-items-center flex-wrap">
        <div className="d-flex align-items-center flex-wrap">
         <DropDownAdmin title={'Category'} options={['T-shirts', 'Mugs','PC Accesories',  'Collectible figures', 'Reset']} reset={resetDropDowns} getProducts={getProducts} /> 
           <DropDownAdmin title={'Thema'} options={['Programming','Anime', 'Gaming','Video Games', 'Reset']} reset={resetDropDowns} getProducts={getProducts} /> 
        <DropDownAdmin title={'Price'} options={['Highest price first','Lowest price first','Reset']} reset={resetDropDowns} getProducts={getProducts}/> 
         <DropDownAdmin title={'Name'} options={['A-Z','Z-A','Reset']} reset={resetDropDowns} getProducts={getProducts}/> 
         </div>
        <SearchBarAdmin handleSearch={handleGetSuggestions}  setResetDropDowns={setResetDropDowns} />
      </div>
      {loading ? (
        <Spinner
          animation="border"
          variant="dark"
          style={{ height: "50px", width: "50px", margin:'5rem' }}
        />
      ) : notSuggestion ? (
        "No matches found, please try another search!"
      ) : (
        <TableEditProduct data={products} handleUpdate={handleUpdate}/>
      )}

      {error && (
        <Alert key={"danger"} variant={"danger"}>
          {`${error}`}
        </Alert>
      )}
    </div>
    </div>
  );
};

export default EditProduct;
