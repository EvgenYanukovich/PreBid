import React, { useCallback, useRef, useEffect, useState } from 'react';
import styles from './RangeFilter.module.scss';

interface RangeFilterProps {
  label: string;
  years: number[];
  selectedRange?: [number, number];
  onRangeChange: (range: [number, number]) => void;
}

interface CustomSelectProps {
  value: number;
  options: number[];
  onChange: (value: number) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ value, options, onChange }) => {
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
              className={styles.option}
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

const RangeFilter: React.FC<RangeFilterProps> = ({
  label,
  years,
  selectedRange = [years[0], years[years.length - 1]],
  onRangeChange,
}) => {
  const handleFromChange = useCallback((value: number) => {
    onRangeChange([value, Math.max(value, selectedRange[1])]);
  }, [selectedRange, onRangeChange]);

  const handleToChange = useCallback((value: number) => {
    onRangeChange([Math.min(selectedRange[0], value), value]);
  }, [selectedRange, onRangeChange]);

  return (
    <div className={styles.rangeFilter}>
      <div className={styles.label}>{label}</div>
      <div className={styles.inputs}>
        <CustomSelect 
          value={selectedRange[0]}
          options={years}
          onChange={handleFromChange}
        />
        <span className={styles.separator}>—</span>
        <CustomSelect 
          value={selectedRange[1]}
          options={years.filter(year => year >= selectedRange[0])}
          onChange={handleToChange}
        />
      </div>
    </div>
  );
};

export default RangeFilter;
