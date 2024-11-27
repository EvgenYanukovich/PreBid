import React, { useState, useRef, useEffect } from 'react';
import styles from './FilterDropdown.module.scss';

interface FilterDropdownProps {
  label: string;
  options?: string[];
  selectedValues: string[];
  onSelect: (value: string, isSelected: boolean) => void;
  type?: 'default' | 'range';
  years?: number[];
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options = [],
  selectedValues,
  onSelect,
  type = 'default',
  years = []
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderContent = () => {
    if (type === 'range') {
      return (
        <div className={styles.rangeInputs}>
          <select defaultValue={years[0]}>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <span className={styles.separator}>—</span>
          <select defaultValue={years[years.length - 1]}>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      );
    }

    return options.map((option) => (
      <div
        key={option}
        className={`${styles.option} ${
          selectedValues.includes(option) ? styles.selected : ''
        }`}
        onClick={() => onSelect(option, !selectedValues.includes(option))}
      >
        {option}
      </div>
    ));
  };

  return (
    <div className={styles.filterDropdown} ref={dropdownRef}>
      <button
        className={`${styles.dropdownButton} ${isOpen ? styles.active : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{label}</span>
        <span className={styles.arrow}>▼</span>
      </button>

      {isOpen && (
        <div className={styles.dropdownContent}>
          {renderContent()}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
