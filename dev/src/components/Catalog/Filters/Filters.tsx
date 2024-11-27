import React, { useState, useCallback } from 'react';
import styles from './Filters.module.scss';
import FilterDropdown from './FilterDropdown/FilterDropdown';
import RangeFilter from './RangeFilter/RangeFilter';
import ActiveFilters from './ActiveFilters/ActiveFilters';
import Button from '../../ui/Button/Button';
import { FilterOptions, FilterState, FilterOption } from './types';

interface FiltersProps {
  filterOptions: FilterOptions;
  onFiltersChange: (filters: FilterState) => void;
}

const Filters: React.FC<FiltersProps> = ({ filterOptions, onFiltersChange }) => {
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({});

  const handleFilterSelect = useCallback((category: string, value: string, isSelected: boolean) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      if (!newFilters[category]) {
        newFilters[category] = [];
      }

      if (isSelected) {
        newFilters[category] = [...newFilters[category], value];
      } else {
        newFilters[category] = newFilters[category].filter(v => v !== value);
      }

      if (newFilters[category].length === 0) {
        delete newFilters[category];
      }

      onFiltersChange(newFilters);
      return newFilters;
    });
  }, [onFiltersChange]);

  const handleRangeChange = useCallback((category: string, range: [number, number]) => {
    setSelectedFilters(prev => {
      const newFilters = {
        ...prev,
        [category]: [`${range[0]} - ${range[1]}`]
      };
      onFiltersChange(newFilters);
      return newFilters;
    });
  }, [onFiltersChange]);

  const handleReset = useCallback(() => {
    setSelectedFilters({});
    onFiltersChange({});
  }, [onFiltersChange]);

  const handleRemoveFilter = useCallback((category: string, value: string) => {
    handleFilterSelect(category, value, false);
  }, [handleFilterSelect]);

  const handleApplyFilters = useCallback(() => {
    onFiltersChange(selectedFilters);
  }, [selectedFilters, onFiltersChange]);

  const hasActiveFilters = Object.keys(selectedFilters).length > 0;

  const renderFilter = (category: string, filter: FilterOption) => {
    if (filter.type === 'range') {
      return (
        <RangeFilter
          key={category}
          label={filter.label}
          years={filter.years || []}
          selectedRange={
            selectedFilters[category]
              ? selectedFilters[category][0].split(' - ').map(Number) as [number, number]
              : undefined
          }
          onRangeChange={(range) => handleRangeChange(category, range)}
        />
      );
    }

    return (
      <FilterDropdown
        key={category}
        label={filter.label}
        options={filter.options || []}
        selectedValues={selectedFilters[category] || []}
        onSelect={(value, isSelected) => handleFilterSelect(category, value, isSelected)}
      />
    );
  };

  return (
    <div className={styles.filters}>
      <div className={styles.header}>
        <h3>Фильтры</h3>
        {hasActiveFilters && (
          <button className={styles.resetButton} onClick={handleReset}>
            <span className={styles.resetText}>Сбросить все</span>
          </button>
        )}
      </div>
      
      <ActiveFilters 
        filters={selectedFilters}
        onRemoveFilter={handleRemoveFilter}
      />

      <div className={styles.filterOptions}>
        {Object.entries(filterOptions).map(([category, filter]) => 
          renderFilter(category, filter)
        )}
      </div>

      <div className={styles.applySection}>
        <Button styleButton="blueButton" onClick={handleApplyFilters}>
          Показать результаты
        </Button>
      </div>
    </div>
  );
};

export default Filters;