import React, { useCallback, useRef, useEffect, useState } from 'react';
import styles from './ItemsPerPageSelect.module.scss';

interface ItemsPerPageSelectProps {
  value: number;
  options: number[];
  onChange: (value: number) => void;
}

const ItemsPerPageSelect: React.FC<ItemsPerPageSelectProps> = ({ value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.customSelect} ref={selectRef}>
      <div 
        className={styles.selectValue} 
        onClick={() => setIsOpen(!isOpen)}
      >
        {value}
      </div>
      {isOpen && (
        <div className={styles.optionsList}>
          {options.map(option => (
            <div
              key={option}
              className={`${styles.option} ${value === option ? styles.selected : ''}`}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemsPerPageSelect;
