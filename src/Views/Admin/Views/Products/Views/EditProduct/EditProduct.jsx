import React from "react";
import SearchBarAdmin from "../../../../Components/SearchBarAdmin/SearchBarAdmin";
import useGetSuggestionFromBack from "../../../../Hooks/useGetSuggestionFromBack";
import TableEditProduct from "../../../../Components/TableEditProduct/TableEditProduct";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

const EditProduct = () => {
  const { suggestions, loading, error, handleGetSuggestions } =
    useGetSuggestionFromBack();

  return (
    <div
      className="flex-grow-1 m-4 d-flex flex-column justify-content-center align-items-center text-center rounded mt-2"
      style={{ backgroundColor: "#dbdbdb", height: "100%" }}
    >
      <h4>Here you will can EDIT a product</h4>
      <SearchBarAdmin handleSearch={handleGetSuggestions} />

      {!loading ? (
        <TableEditProduct data={suggestions} />
      ) : (
        <Spinner
          animation="border"
          variant="dark"
          style={{ height: "50px", width: "50px" }}
        />
      )}
      {error && (
        <Alert key={"danger"} variant={"danger"}>
          {`${error}`}
        </Alert>
      )}
    </div>
  );
};

export default EditProduct;
