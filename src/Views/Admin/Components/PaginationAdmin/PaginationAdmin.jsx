import React from 'react';
import { Pagination } from 'react-bootstrap';
import styles from './PaginationAdmin.module.css'

function PaginationAdmin({ page, setPage, totalPages }) {
  return (
    <Pagination>
      <Pagination.Prev disabled={page === 1} onClick={() => setPage({pageNumber: page > 1 ? page - 1 : 1})} />
      <Pagination.Item active className={styles.pagiantionIndex} >{page}</Pagination.Item>
      <Pagination.Next  disabled={page === totalPages} onClick={() => setPage({pageNumber: page < totalPages ? page + 1 : totalPages})} />
    </Pagination>
  );
}

export default PaginationAdmin;