import React from 'react'
import {Routes, Route} from 'react-router-dom'
import AddNewAdmin from './Views/AddNewAdmin/AddNewAdmin'
import ManageUsers from './Views/ManageUsers/ManageUsers'
import ManageAdmins from './Views/ManageAdmins/ManageAdmins'
import UsersPanel from '../../Components/UsersPanel/UsersPanel'
const Users = () => {
  return (
    <div>
    
   <UsersPanel/>
    <Routes>
    <Route path='manage'  element={<ManageUsers/>} />
    <Route path='manage-admin'  element={<ManageAdmins/>} />
    <Route path='add-admin'  element={<AddNewAdmin/>} />
    </Routes>
    </div>
  )
}

export default Users