import React, { useEffect, useState } from "react";
import SearchBarAdmin from "../../../../Components/SearchBarAdmin/SearchBarAdmin";
import useGetSuggestionFromBack from "../../../../Hooks/useGetSuggestionFromBack";
import TableEditProduct from "../../../../Components/TableEditProduct/TableEditProduct";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import styles from './ProductManage.module.css'
import PaginationAdmin from "../../../../Components/PaginationAdmin/PaginationAdmin";
import axios from "axios";
import DropDownAdmin from "../../../../Components/DropDownAdmin/DropDownAdmin";

const ProductManage = () => {
  const {
    products,
    byId,
    notSuggestion,
    loading,
    setLoading,
    errorGetProducts,
    pageNum,
    totalPages,
    handleGetSuggestions,
    getProducts,
  } = useGetSuggestionFromBack();
  const [resetDropDowns, setResetDropDowns] = useState(false);
  const [searchBarResetCounter, setSearchBarResetCounter] = useState(0);
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')


  //Para resetear los dropdowns cuando se hace una nueva busqueda
  useEffect(() => {
    setResetDropDowns(false);
  }, [resetDropDowns]);

  const handleUpdate = async (id, newData) => {
    setLoading(true)
    try {
      if (
        newData.hasOwnProperty("discount") &&
        newData.hasOwnProperty("discount") === "" &&
        newData.hasOwnProperty("discount") === 0
      ) {
        newData.discount = null;
      }
      const URL = "https://ge3k-server.onrender.com/products/";
      await axios.put(URL + id, newData);
      await getProducts();
      setLoading(false)
      setMessage('Product updated successfully.')
      setTimeout(() => {
        setMessage(false)
      }, 3500);
    } catch (error) {
      setLoading(false)
      if(error.response){
        if(error.message === "Request failed with status code 404"){
        setError("Seems like we're experiencing technical difficulties. Please contact our support for assistance")
        setTimeout(() => {
          setError(false)
        }, 5000)
      } else if(error.response.data.message) {
        setError(error.response.data.message)
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
    }
  };

  const handleDelete = async (id) => {
    setLoading(true)
    try {
      const URL = "https://ge3k-server.onrender.com/products?productId=";
      const type = '&type=hard'
      await axios.delete(URL + id + type);
      await getProducts("Reset");
      setSearchBarResetCounter((prevCounter) => prevCounter + 1);
      setResetDropDowns();
      setLoading(false)
      setMessage('Product deleted successfully.')
      setTimeout(() => {
        setMessage(false)
      }, 3500);
    } catch (error) {
      setLoading(false)
      if(error.response){
        if(error.message === "Request failed with status code 404"){
        setError("Seems like we're experiencing technical difficulties. Please contact our support for assistance")
        setTimeout(() => {
          setError(false)
        }, 5000)
      } else if(error.response.data.message) {
        setError(error.response.data.message)
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
      
    }
  };

  const handleResetButton = async () => {
      await getProducts("Reset");
      setResetDropDowns();
      setSearchBarResetCounter((prevCounter) => prevCounter + 1);
  };

  return (
    <div
      className="flex-grow-1 d-flex flex-column"
      style={{ padding: " 1rem 1.65rem " }}
    >
      <div
        className={`${styles.editProductContainer} container-fluid flex-grow-1`}
      >
        <h4>MANAGE PRODUCTS</h4>
        <div className={styles.messageSection}>
          {(errorGetProducts || error) && (
            <Alert key={"danger"} variant={"danger"} style={{height:'2.5rem', display:'flex', alignItems:'center'}}>
              {errorGetProducts || error}
            </Alert>
          )}
          {message && (
            <Alert key={"success"} variant={"success"} style={{height:'2.5rem', display:'flex', alignItems:'center'}}>
              {message}
            </Alert>
          )}
        </div>
        <div className="d-flex w-100 justify-content-between align-items-center flex-wrap">
          <div className="d-flex align-items-center flex-wrap">
            {!byId && (
              <>
                <DropDownAdmin
                  title={"Category"}
                  options={[
                    "T-shirts",
                    "Mugs",
                    "PC Accesories",
                    "Collectible figures",
                    "Reset",
                  ]}
                  reset={resetDropDowns}
                  getProducts={getProducts}
                />
                <DropDownAdmin
                  title={"Thema"}
                  options={[
                    "Programming",
                    "Anime",
                    "Gaming",
                    "Video Games",
                    "Reset",
                  ]}
                  reset={resetDropDowns}
                  getProducts={getProducts}
                />
                <DropDownAdmin
                  title={"Order"}
                  options={[
                    "Highest price first",
                    "Lowest price first",
                    "A-Z",
                    "Z-A",
                    "Reset",
                  ]}
                  reset={resetDropDowns}
                  getProducts={getProducts}
                />
              </>
            )}
            <button onClick={handleResetButton} className={styles.resetButton}>
              <i className="bi bi-arrow-clockwise"></i>{" "}
            </button>
          </div>
          <SearchBarAdmin
            handleSearch={handleGetSuggestions}
            setResetDropDowns={setResetDropDowns}
            reset={searchBarResetCounter}
          />
        </div>

        {loading ? (
          <Spinner
            animation="border"
            variant="dark"
            style={{ height: "50px", width: "50px", margin: "5rem" }}
          />
        ) : notSuggestion ? (
          <div   style={{margin: "5rem" }} >"No matches found, please try another search!"</div>
        ) : (
          <>
          <TableEditProduct
            data={products}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
          {(totalPages > 1) && <PaginationAdmin page={pageNum} setPage={getProducts} totalPages={totalPages} />}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductManage;
