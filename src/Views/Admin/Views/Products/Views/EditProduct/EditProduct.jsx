import React from "react";
import SearchBarAdmin from "../../../../Components/SearchBarAdmin/SearchBarAdmin";
import useGetSuggestionFromBack from "../../../../Hooks/useGetSuggestionFromBack";
import TableEditProduct from "../../../../Components/TableEditProduct/TableEditProduct";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import styles from './EditProduct.module.css'

const EditProduct = () => {
  const { suggestions, notSuggestion, loading, error, handleGetSuggestions } =
    useGetSuggestionFromBack();

  return (
    <div className="flex-grow-1 d-flex flex-column" style={{padding:' 1rem 1.65rem '}}>
      <div className={`${styles.editProductContainer} container-fluid flex-grow-1`}>
      <h4>EDIT PRODUCTS</h4>
      <SearchBarAdmin handleSearch={handleGetSuggestions} />

      {loading ? (
        <Spinner
          animation="border"
          variant="dark"
          style={{ height: "50px", width: "50px" }}
        />
      ) : notSuggestion ? (
        "No matches found, please try another search!"
      ) : (
        <TableEditProduct data={suggestions} handleUpdate={(e)=>console.log(e)}/>
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
