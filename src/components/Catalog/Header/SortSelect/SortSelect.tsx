import React from 'react';
import styles from './SortSelect.module.scss';
import { SortOption } from '../../types';

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const sortOptions: SortOption[] = [
  { label: 'Сначала ближайшие', value: 'nearest' },
  { label: 'По возрастанию цены', value: 'price_asc' },
  { label: 'По убыванию цены', value: 'price_desc' },
  { label: 'По году (новые)', value: 'year_desc' },
  { label: 'По году (старые)', value: 'year_asc' },
];

const SortSelect: React.FC<SortSelectProps> = ({ value, onChange }) => {
  return (
    <div className={styles.sortSelect}>
      <span className={styles.label}>Сортировать по</span>
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.select}
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortSelect;
