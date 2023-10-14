import React, { useEffect, useState } from "react";
import styles from "./TableEditProduct.module.css";
import ModalAdmin from "../ModalAdmin/ModalAdmin";
import Spinner from 'react-bootstrap/Spinner';



const TableEditProduct = ({ data, handleUpdate, handleDelete }) => {
  const [idSelected, setIDSelected] = useState(null);
  const [productForDelete, setProductForDelete] = useState('');
  const [inputValues, setInputValues] = useState({});
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalResponseEdit, setModalResponseEdit] = useState('');
  const [modalResponseDelete, setModalResponseDelete] = useState('');
  const [loading, setLoading] = useState(false);



  //Para ir guardado la información del producto que se esta editando y usarla para enviar al back
  const handleInputChange = (e) => {
    setInputValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //Cuando el admin decide cancelar la edición
  const handleCancel = () => {
    setInputValues({});
    setIDSelected(null);
  };

  //Cuando el admin confirma que quiere actualizar la información 
  const handleOK = () => {
    setModal(true);
  };

  //Cuando el admin presiona el boton de elimnar producto
  const handleDeleteProduct = (product) => {
    setProductForDelete(product)
    setModalDelete(true);
  };

  //Controlar la respuesta del Modal de Edicion
  useEffect(() => {
    setModal(false);

    //Si la respuesta del modal es afirmativa hacemos la petición al back
    if (modalResponseEdit) {
      setLoading(true);
      handleUpdate(idSelected, inputValues)
        .then(() => {
          setLoading(false);
          setIDSelected(null);
          
        })
        .catch((error) => console.error(error));
    } 

    setModalResponseEdit('') //Reestablece la respuesta del modal
  }, [modalResponseEdit]);



   //Controlar la respuesta del Modal de Eliminación
  useEffect(() => {
    setModalDelete(false);

    //Si la respuesta del modal es afirmativa hacemos la petición al back
    if (modalResponseDelete) {
      setLoading(true);
    
      handleDelete(productForDelete.id)
        .then(() => {
          setLoading(false);
          setProductForDelete('');
        })
        .catch((error) => console.error(error));
    } 

    setModalResponseDelete('') //Reestablece la respuesta del modal
  }, [modalResponseDelete]);




  return (
    <div className={styles.tableContainer}>
      {data && data.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Category</th>
              <th>Theme</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => {
              function cutID(id) {
                const cutedID = id.match(/^(.{4}).*?(.{4})$/);
                return `${cutedID[1]}...${cutedID[2]}`;
              }

              if (product.id === idSelected) {
                return (
                  <tr key={product.id}>
                    <td>{cutID(product.id)}</td>
                    <td>
                      <img src={product.image} />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={
                          inputValues.hasOwnProperty("name")
                            ? inputValues.name
                            : product.name
                        }
                        onChange={handleInputChange}
                      />{" "}
                    </td>
                    <td>
                      {" "}
                      <input
                        type="number"
                        name="stock"
                        min='0'
                        value={
                          inputValues.hasOwnProperty("stock")
                            ? inputValues.stock
                            : product.stock
                        }
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="price"
                        min='0'
                        step="any"
                        value={
                          inputValues.hasOwnProperty("price")
                            ? inputValues.price
                            : product.price
                        }
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="discount"
                        min='0'
                        value={
                          inputValues.hasOwnProperty("discount")
                            ? inputValues.discount
                            : product.discount || "0"
                        }
                        onChange={handleInputChange}
                      />{" "}
                    </td>
                    <td>
                      <input
                        type="text"
                        name="categoryName"
                        value={
                          inputValues.hasOwnProperty("categoryName")
                            ? inputValues.categoryName
                            : product.categoryName
                        }
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="themeName"
                        value={
                          inputValues.hasOwnProperty("themeName")
                            ? inputValues.themeName
                            : product.themeName
                        }
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="description"
                        value={
                          inputValues.hasOwnProperty("description")
                            ? inputValues.description
                            : product.description
                        }
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                    {loading ? <Spinner animation="border" variant="dark" /> : 
                      <><button className={(Object.keys(inputValues).length === 0)?styles.saveButtonOff :styles.saveButton}   onClick={(Object.keys(inputValues).length !== 0) ? handleOK : null} >
                        <i className="bi bi-check-lg"></i>
                      </button>
                      <button
                        className={styles.cancelButton}
                        onClick={handleCancel}
                      >
                        <i class="bi bi-x-lg"></i>
                      </button></>
                      }
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={product.id}>
                  <td>{cutID(product.id)}</td>
                  <td>
                    <img src={product.image} />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.stock}</td>
                  <td>{product.price}</td>
                  <td>{product.discount || "No"}</td>
                  <td>{product.categoryName}</td>
                  <td>{product.themeName}</td>
                  <td>{product.description}</td>
                  <td >
                    <div className="d-flex justify-content-center p-1 gap-1">
                    <button
                      onClick={() => setIDSelected(product.id)}
                      className={styles.editButton}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product)}
                      className={styles.deletetButton}
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        ""
      )}
        <ModalAdmin
         show={modal}
          setModalResponse={setModalResponseEdit}
          title={"Are you sure?"}
          message={
            "You are about to edit the product information"
          }
        />
        <ModalAdmin
         show={modalDelete}
          setModalResponse={setModalResponseDelete}
          title={"Caution!"}
          message={
            `You're about to delete "${productForDelete.name}" product. Are you sure?`
          }
        />
    </div>
  );
};

export default TableEditProduct;
