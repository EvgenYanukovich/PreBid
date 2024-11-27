import React from 'react';
import styles from './ActiveFilters.module.scss';
import { FilterOptions } from '../types';

interface ActiveFiltersProps {
  filters: { [key: string]: string[] };
  filterOptions: FilterOptions;
  onRemoveFilter: (category: string, value: string) => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  filters,
  filterOptions,
  onRemoveFilter,
}) => {
  if (Object.keys(filters).length === 0) {
    return null;
  }

  return (
    <div className={styles.activeFilters}>
      {Object.entries(filters).map(([category, values]) =>
        values.map((value, index) => (
          <div key={`${category}-${value}-${index}`} className={styles.filter}>
            <span>{value}</span>
            <button
              className={styles.removeButton}
              onClick={() => onRemoveFilter(category, value)}
            >
              ✕
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ActiveFilters;
