import React from "react";
import styles from "./ModalNoAuth.module.css"
import { Link } from "react-router-dom";

const ModalNoAuth = () => {
  return (
    <div className={styles.notAuthContainer}> 
      <div className={styles.notAuthForm}>

      <div className={styles.headerAuth} ><i className={`${styles.alert} bi bi-exclamation-diamond`}></i>
        <h3>YOU ARE NOT AUTHORIZED FOR THIS!</h3>
        </div>
        <div>
          <p>You don't have permission to:</p>
          <ul>
            <li><i className={`${styles.noAuth} bi bi-x-circle-fill`} ></i>Create New Admin</li>
            <li><i className={`${styles.noAuth} bi bi-x-circle-fill`} ></i>Manage Admin</li>
          </ul>
        </div>
        <div className="w-100">
        <p>What can you do?</p>
          <ul className={styles.authToDo} >
          <Link to="/admin/products/add"><li><span ><i className={`${styles.auth} bi bi-check-circle-fill`} ></i>Upload New Product</span> <span><i className={`${styles.arrow} bi bi-arrow-right-short`}></i></span></li></Link>
          <Link to="/admin/products/manage"><li><span><i className={`${styles.auth} bi bi-check-circle-fill`}></i>Manage Product</span><span><i className={`${styles.arrow} bi bi-arrow-right-short`}></i></span></li></Link>
          <Link to="/admin/orders/history"> <li><span><i className={`${styles.auth} bi bi-check-circle-fill`}></i>View order history</span> <span><i className={`${styles.arrow} bi bi-arrow-right-short`}></i></span></li></Link>
          </ul>
        </div>
        <Link to="/admin"><button>Back to Dashboard</button></Link>
      </div>
   
      </div>
  );
};

export default ModalNoAuth;
