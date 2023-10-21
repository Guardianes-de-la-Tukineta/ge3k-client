import React, { useEffect, useState } from "react";
import styles from "./TableManageAdmins.module.css"
import ModalEnable from "../ModalsManageAdmin/ModalEnable";
import ModalBan from "../ModalsManageAdmin/ModalBan";
import ModalNewPassWord from "../ModalsManageAdmin/ModalNewPassWord"
import NewPasswordForm from "../NewPasswordForm/NewPasswordForm";


const TableManageAdmins = ({ data, handleUnban, handleBan, handleNewPassword }) => {
  const [adminForUnban, setAdminForUnban] = useState('');
  const [modalUnBan, setModalUnban] = useState(false);
  const [modalResponseUnban, setModalResponseUnban] = useState('');
  
  const [adminForBan, setAdminForBan] = useState('');
  const [modalBan, setModalBan] = useState(false);
  const [modalResponseBan, setModalResponseBan] = useState('');

  const [modalPassword, setModalPassword] = useState(false);
  const [modalResponsePassword, setModalResponsePassword] = useState('');
  const [adminNewPassword, setAdminNewPassword] = useState('')

  const [showFormPassword, setShowFormPassword] = useState(false)

  //Cuando el admin presiona el boton de rehabilitar usuario
  const handleUnbanAdmin = (admin) => {
    setAdminForUnban(admin)
    setModalUnban(true);
  };

  //Cuando el admin presiona el boton de banear un admin
  const handleBanAdmin = (admin) => {
    setAdminForBan(admin)
    setModalBan(true);
  };

  const handleModalPassword = (admin) => {
    setAdminNewPassword(admin)
    setModalPassword(true);
  };

  const handleClosePassModal = () => {
    setShowFormPassword(false)
  };



  //Controlar la respuesta del Modal de Unban
  useEffect(() => {
    setModalUnban(false);

    //Si la respuesta del modal es afirmativa hacemos la petición al back
    if (modalResponseUnban) {
      handleUnban(adminForUnban.id)
        .then(() => {
          setAdminForUnban('')
        })
        .catch((error) => console.error(error));
    } 
    setModalResponseUnban('') //Reestablece la respuesta del modal
  }, [modalResponseUnban]);


   //Controlar la respuesta del Modal de confirmacion de Baneo de un admin
  useEffect(() => {
    setModalBan(false);

    //Si la respuesta del modal es afirmativa hacemos la petición al back
    if (modalResponseBan) {
    
      handleBan(adminForBan.id)
        .then(() => {
          setAdminForBan('');
        })
        .catch((error) => console.error(error));
    } 

    setModalResponseBan('') //Reestablece la respuesta del modal
  }, [modalResponseBan]);



  useEffect(() => {
    setModalPassword(false);

    //Si la respuesta del modal es afirmativa mostramos el form para la nueva password
    if (modalResponsePassword) {
      console.log('jijijijiji')
      setShowFormPassword(true)
    } 

    setModalResponsePassword('') //Reestablece la respuesta del modal
  }, [modalResponsePassword]);


  return (
    <div className={styles.tableContainer}>
    { showFormPassword && <NewPasswordForm admin={adminNewPassword} handleNewPassword={handleNewPassword} handleClosePassModal={handleClosePassModal} />}
      {data && data.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
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

              return (
                <tr key={admin.id}>
                  <td>{cutID(admin.id)}</td>
                  <td>{admin.email}</td>
                  <td>{admin.name}</td>
                  <td>{admin.surname}</td>
                  <td>{admin.deletedAt === null ? 'OK' : 'Disabled'}</td>
                  <td >
                    <div className="d-flex justify-content-center p-1 gap-1">
                    <button
                      onClick={() => handleUnbanAdmin(admin)}
                      className={(admin.deletedAt === null)? styles.saveButtonOff : styles.saveButton}
                      disabled={admin.deletedAt === null ? true : false}
                    >
                <i className="bi bi-person-check"></i>
                    </button>
                    <button
                      onClick={() => handleBanAdmin(admin)}
                      className={(admin.deletedAt === null)? styles.deletetButton : styles.deletetButtonOff}
                      disabled={admin.deletedAt === null ? false : true}
                    >
                  <i className="bi bi-person-slash"></i>
                    </button>
                    <button
                      onClick={() => handleModalPassword(admin)}
                      className={ styles.passwordButton}
                    >
                 New Password
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
        <ModalEnable
         show={modalUnBan}
          setModalResponse={setModalResponseUnban}
          title={"ARE YOU SURE?"}
          admin={ adminForUnban
          }
        />
        <ModalBan
         show={modalBan}
          setModalResponse={setModalResponseBan}
          title={"CAUTION!"}
          admin={adminForBan}
        />
        <ModalNewPassWord
         show={modalPassword}
          setModalResponse={setModalResponsePassword}
          title={"ARE YOU SURE?"}
          admin={adminNewPassword}
        />
    </div>
  );
};

export default TableManageAdmins;
