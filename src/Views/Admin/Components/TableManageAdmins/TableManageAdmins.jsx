import React, { useEffect, useState } from "react";
import styles from "./TableManageAdmins.module.css"
import ModalEdit from "../ModalEdit/ModalEdit";
import ModalDelete from "../ModalDelete/ModalDelete";
import Spinner from 'react-bootstrap/Spinner';



const TableManageAdmins = ({ data, handleUpdate, handleDelete }) => {
  const [idSelected, setIDSelected] = useState(null);
  const [productForDelete, setProductForDelete] = useState('');
  const [productForEdit, setProductForEdit] = useState('');
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
  const handleOK = (name) => {
    setProductForEdit(name)
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
          setProductForEdit('')
          
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
              <th>Name</th>
              <th>Nick Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((admin) => {
              function cutID(id) {
                const cutedID = id.match(/^(.{4}).*?(.{4})$/);
                return `${cutedID[1]}...${cutedID[2]}`;
              }

              if (admin.id === idSelected) {
                return (
                  <tr key={admin.id}>
                    <td>{cutID(admin.id)}</td>
                    <td>
                      <img src={admin.image} />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={
                          inputValues.hasOwnProperty("name")
                            ? inputValues.name
                            : admin.name
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
                            : admin.stock
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
                            : admin.price
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
                            : admin.discount || "0"
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
                            : admin.categoryName
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
                            : admin.themeName
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
                            : admin.description
                        }
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                    {loading ? <Spinner animation="border" variant="dark" /> : 
                      <><button className={(Object.keys(inputValues).length === 0)?styles.saveButtonOff :styles.saveButton}   onClick={(Object.keys(inputValues).length !== 0) ? ()=>handleOK(admin.name) : null} >
                        <i className="bi bi-check-lg"></i>
                      </button>
                      <button
                        className={styles.cancelButton}
                        onClick={handleCancel}
                      >
                        <i className="bi bi-x-lg"></i>
                      </button></>
                      }
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={admin.id}>
                  <td>{cutID(admin.id)}</td>
                  <td>{admin.name}</td>
                  <td>{admin.surname}</td>
                  <td>{admin.deletedAt === null ? 'OK' : 'Disabled'}</td>
                  <td >
                    <div className="d-flex justify-content-center p-1 gap-1">
                    <button
                      onClick={() => setIDSelected(admin.id)}
                      className={styles.editButton}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(admin)}
                      className={styles.deletetButton}
                    >
                      <i className="bi bi-trash"></i>
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
        <ModalEdit
         show={modal}
          setModalResponse={setModalResponseEdit}
          title={"ARE YOU SURE?"}
          product={ productForEdit
          }
        />
        <ModalDelete
         show={modalDelete}
          setModalResponse={setModalResponseDelete}
          title={"CAUTION!"}
          product={productForDelete}
        />
    </div>
  );
};

export default TableManageAdmins;
