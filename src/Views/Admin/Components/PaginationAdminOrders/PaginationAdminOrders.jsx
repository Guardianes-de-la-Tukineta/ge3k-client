import React from 'react';
import { Pagination } from 'react-bootstrap';
import styles from './PaginationAdminOrders.module.css'

function PaginationAdminOrders({ page, setPage, totalPages }) {
  return (
    <Pagination>
      <Pagination.Prev disabled={page === 1} onClick={() => setPage(page > 1 ? page - 1 : 1)} />
      <Pagination.Item active className={styles.pagiantionIndex} >{page} <span style={{fontSize:'0.85rem'}}>-</span> {totalPages}</Pagination.Item>
      <Pagination.Next  disabled={page === totalPages} onClick={() => setPage(page < totalPages ? page + 1 : totalPages)} />
    </Pagination>
  );
}

export default PaginationAdminOrders;