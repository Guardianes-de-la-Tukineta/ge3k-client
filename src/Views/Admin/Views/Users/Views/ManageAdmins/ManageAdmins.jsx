import React from 'react'
import useGetAdminsFromBack from '../../../../Hooks/useGetAdminsFromBack'
import TableManageAdmins from '../../../../Components/TableManageAdmins/TableManageAdmins'
import Spinner from 'react-bootstrap/Spinner';

const ManageAdmins = () => {

  const {admins, loading} = useGetAdminsFromBack()
  console.log(admins)
  return (
    <div className='flex-grow-1 m-4 d-flex justify-content-center flex-column align-items-center text-center rounded mt-2' style={{backgroundColor:'#dbdbdb', height:'100%'}}>
    <h4>MANAGAE ADMINS</h4>
    {loading &&  <Spinner
            animation="border"
            variant="dark"
            style={{ height: "50px", width: "50px", margin: "5rem" }}
          />}
    <TableManageAdmins data={admins} />
  </div>
  )
}

export default ManageAdmins
