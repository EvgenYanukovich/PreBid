import React from 'react';
import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = [];
    
    // Добавляем стрелку влево
    pages.push(
      <button
        key="prev"
        className={styles.arrowButton}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ←
      </button>
    );

    // Всегда показываем первую страницу
    pages.push(
      <button
        key={1}
        className={`${styles.pageButton} ${currentPage === 1 ? styles.active : ''}`}
        onClick={() => onPageChange(1)}
      >
        1
      </button>
    );

    let leftBound = Math.max(2, currentPage - 1);
    let rightBound = Math.min(totalPages - 1, currentPage + 1);

    // Добавляем многоточие слева если нужно
    if (leftBound > 2) {
      pages.push(
        <span key="ellipsis-left" className={styles.ellipsis}>
          ...
        </span>
      );
    }

    // Добавляем страницы рядом с текущей
    for (let i = leftBound; i <= rightBound; i++) {
      pages.push(
        <button
          key={i}
          className={`${styles.pageButton} ${currentPage === i ? styles.active : ''}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Добавляем многоточие справа если нужно
    if (rightBound < totalPages - 1) {
      pages.push(
        <span key="ellipsis-right" className={styles.ellipsis}>
          ...
        </span>
      );
    }

    // Всегда показываем последнюю страницу если страниц больше 1
    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          className={`${styles.pageButton} ${currentPage === totalPages ? styles.active : ''}`}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    // Добавляем стрелку вправо
    pages.push(
      <button
        key="next"
        className={styles.arrowButton}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        →
      </button>
    );

    return pages;
  };

  return (
    <div className={styles.pagination}>
      {renderPageNumbers()}
    </div>
  );
};

export default Pagination;
