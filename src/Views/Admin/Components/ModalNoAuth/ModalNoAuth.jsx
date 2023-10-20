import React from "react";
import styles from "./ModalNoAuth.module.css"

const ModalNoAuth = () => {
  return (
    <div className={styles.notAuthContainer}> 
      <div className={styles.notAuthForm}>

      <div className={styles.headerAuth} ><i className={`${styles.alert} bi bi-exclamation-diamond`}></i>
        <h3>YOU ARE NOT AUTHORIZED!</h3>
        </div>
        <div>
          <p>You don't have permission to:</p>
          <ul>
            <li><i className={`${styles.noAuth} bi bi-x-circle-fill`} ></i>Create New Admin</li>
            <li><i className={`${styles.noAuth} bi bi-x-circle-fill`} ></i>Manage Admin</li>
          </ul>
        </div>
        <div>
        <p>What can you do?</p>
          <ul>
            <li><i className={`${styles.auth} bi bi-check-circle-fill`} ></i>Upload New Product</li>
            <li><i className={`${styles.auth} bi bi-check-circle-fill`}></i>Manage Product</li>
            <li><i className={`${styles.auth} bi bi-check-circle-fill`}></i>View order history</li>
          </ul>
        </div>
        <button>Back to Dashboard</button>
      </div>
   
      </div>
  );
};

export default ModalNoAuth;
