import React from 'react';
import styles from './CatalogHeader.module.scss';
import { ViewMode } from '../types';
import ViewToggle from './ViewToggle/ViewToggle';
import SortSelect from './SortSelect/SortSelect';
import ItemsPerPageSelect from './ItemsPerPageSelect/ItemsPerPageSelect';

interface CatalogHeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
  totalItems: number;
}

const itemsPerPageOptions = [20, 40, 60];

const CatalogHeader: React.FC<CatalogHeaderProps> = ({
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  itemsPerPage,
  onItemsPerPageChange,
  totalItems
}) => {
  return (
    <div className={styles.header}>
      <div className={styles.leftSection}>
        <span className={styles.results}>Найдено <b>{totalItems} результатов</b></span>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.sortContainer}>
          <SortSelect value={sortBy} onChange={onSortChange} />
        </div>
        <div className={styles.itemsPerPage}>
          <span className={styles.label}>Отображать по</span>
          <ItemsPerPageSelect
            value={itemsPerPage}
            options={itemsPerPageOptions}
            onChange={onItemsPerPageChange}
          />
        </div>
        <ViewToggle value={viewMode} onChange={onViewModeChange} />
      </div>
    </div>
  );
};

export default CatalogHeader;
