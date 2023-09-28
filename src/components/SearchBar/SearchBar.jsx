import React from 'react'
import { Form, Button } from 'react-bootstrap'
import style from './SearchBar.module.css'

const SearchBar = () => {
  return (
    <Form className={`${style.searhContainer} d-flex border rounded overflow-hidden text-dark`}>
    <Form.Control  data-bs-theme="light"
      type="search"
      placeholder="Search"
      className="border-0 rounded-0"
      aria-label="Search"
    />
    <Button className={`${style.buttonSearchBar} rounded-0`} > <i className="bi bi-search"></i></Button>
  </Form>
  )
}

export default SearchBar
