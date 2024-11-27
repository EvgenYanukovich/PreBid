import React from 'react';
import styles from './TableHeader.module.scss';

interface TableHeaderProps {
  onSort?: (field: string, direction: 'asc' | 'desc') => void;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
}

const TableHeader: React.FC<TableHeaderProps> = ({
  onSort,
  sortField,
  sortDirection,
}) => {
  const handleSort = (field: string) => {
    if (onSort) {
      const newDirection = field === sortField && sortDirection === 'asc' ? 'desc' : 'asc';
      onSort(field, newDirection);
    }
  };

  const renderSortIcon = (field: string) => {
    return (
      <div className={styles.sortIcon}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5L18 11H6L12 5Z" fill="currentColor"/>
        </svg>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5L18 11H6L12 5Z" fill="currentColor"/>
        </svg>
      </div>
    );
  };

  return (
    <thead className={styles.thead}>
      <tr>
        <th className={styles.photo}>Фото</th>
        <th>№ Лота</th>
        <th 
          className={`${styles.sortableHeader} ${sortField === 'year' ? styles.active : ''}`}
          onClick={() => handleSort('year')}
        >
          <span>Год</span>
          {renderSortIcon('year')}
        </th>
        <th>Марка</th>
        <th>Модель</th>
        <th 
          className={`${styles.sortableHeader} ${sortField === 'volume' ? styles.active : ''}`}
          onClick={() => handleSort('volume')}
        >
          <span>Объем</span>
          {renderSortIcon('volume')}
        </th>
        <th 
          className={`${styles.sortableHeader} ${sortField === 'odometer' ? styles.active : ''}`}
          onClick={() => handleSort('odometer')}
        >
          <span>Одометр</span>
          {renderSortIcon('odometer')}
        </th>
        <th 
          className={`${styles.sortableHeader} ${sortField === 'date' ? styles.active : ''}`}
          onClick={() => handleSort('date')}
        >
          <span>Дата</span>
          {renderSortIcon('date')}
        </th>
        <th 
          className={`${styles.sortableHeader} ${sortField === 'currentBid' ? styles.active : ''}`}
          onClick={() => handleSort('currentBid')}
        >
          <span>Ставка</span>
          {renderSortIcon('currentBid')}
        </th>
        <th>Действие</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
