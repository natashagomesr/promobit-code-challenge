import * as React from 'react';
import style from './pagination.module.css';

function Pagination({ currentPage, numberOfPages, onPaginationClick }) {
  const pageNumbers = [...Array(numberOfPages).keys()].slice(1);

  return (
    <div className={style.paginationContainer}>
      <div className={style.pagination}>
        {currentPage !== 1 && <div onClick={() => onPaginationClick(currentPage - 1)}>Prev</div>}
        {pageNumbers.slice(currentPage - 1, currentPage + 4).map((number) => (
          <div
            id="button-pagination"
            key={number}
            style={{ color: currentPage === number ? '#1d0247' : 'inherit' }}
            onClick={() => onPaginationClick(number)}
            className={style['button-pagination-container']}
          >
            {number}
          </div>
        ))}
        {currentPage !== numberOfPages && (
          <div onClick={() => onPaginationClick(currentPage + 1)}>Next</div>
        )}
      </div>
    </div>
  );
}

export default Pagination;
