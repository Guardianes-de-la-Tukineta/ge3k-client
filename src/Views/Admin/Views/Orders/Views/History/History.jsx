import React, {useState, useEffect} from 'react'
import TableOrderHistory from '../../../../Components/TableOrderHistory/TableOrderHistory'
import useOrdersFromBack from '../../../../Hooks/useOrdersFromBack'
import PaginationAdminOrders from '../../../../Components/PaginationAdminOrders/PaginationAdminOrders'
import Spinner from "react-bootstrap/Spinner";
import styles from './History.module.css'
import DropDownAdmin from '../../../../Components/DropDownAdmin/DropDownAdmin';
import Alert from "react-bootstrap/Alert";
import SearchBarAdmin from '../../../../Components/SearchBarAdmin/SearchBarAdmin'

const History = () => {

 const {data, loading, pageNum, setFilters, setSortedBy, setPageNum, reset, totalPages, getOrdersFromBack,handleCompleteOrder, handleSearchByEmail, message, error} = useOrdersFromBack()
 const [resetDropDowns, setResetDropDowns] = useState(false);

  //Para resetear los dropdowns cuando se hace una nueva busqueda
  useEffect(() => {
    setResetDropDowns(false);
  }, [resetDropDowns]);

const handleResetButton = ()=>{
  reset()
  setResetDropDowns(true);
}
  return (
    <div
    className="flex-grow-1 d-flex flex-column"
      style={{ padding: " 1rem 1.65rem " }}>
         <div
        className={`${styles.editProductContainer} container-fluid flex-grow-1`}
      >

<h4>ORDER HISTORY</h4>
<div className='row  justify-content-center w-100'>
        <div className='col-lg-10'>
        <div className={styles.messageSection}>
          {error && (
            <Alert key={"danger"} variant={"danger"} style={{height:'2.5rem', display:'flex', alignItems:'center'}}>
              {error}
            </Alert>
          )}
          {message && (
            <Alert key={"success"} variant={"success"} style={{height:'2.5rem', display:'flex', alignItems:'center'}}>
              {message}
            </Alert>
          )}
        </div>
        <div className="d-flex w-100 justify-content-between align-items-center flex-wrap mb-3">
          <div className="d-flex align-items-center flex-wrap">
              <>
                <DropDownAdmin
                  title={"Status"}
                  options={['Pending', 'Cancelled', 'Approved', 'Fulfilled', 'Reset']}
                  reset={resetDropDowns}
                  getProducts={setFilters}
                />
                <DropDownAdmin
                  title={"Order"}
                  options={[
                    "Old First",
                    "Reset",
                  ]}
                  reset={resetDropDowns}
                  getProducts={setSortedBy}
                />
              </>
            <button onClick={handleResetButton} className={styles.resetButton}>
              <i className="bi bi-arrow-clockwise"></i>{" "}
            </button>
          </div>
          <SearchBarAdmin
            handleSearch={handleSearchByEmail}
            setResetDropDowns={setResetDropDowns}
            reset={data}
            placeholder={'Enter email address'}
          />
        </div>

<div className={styles.spinerContainer} >
       {loading? <Spinner
            animation="border"
            variant="dark"
            style={{ height: "50px", width: "50px", margin: "5rem" }}
          /> : <TableOrderHistory data={data} handleCompleteOrder={handleCompleteOrder} />}
</div>
    </div>
    </div>
    {(totalPages > 1 && !loading) && <PaginationAdminOrders page={pageNum} setPage={setPageNum} totalPages={totalPages} />}
    </div>
    </div>
  )
}

export default History
