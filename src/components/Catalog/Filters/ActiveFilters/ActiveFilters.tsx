import React from 'react';
import styles from './ActiveFilters.module.scss';

interface ActiveFiltersProps {
  filters: { [key: string]: string[] };
  onRemoveFilter: (category: string, value: string) => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  filters,
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
