import React, { useState, useEffect } from 'react';
import Filters from './Filters/Filters';
import filtersData from '../../data/filters.json';
import { FilterState, FilterOptions, FilterOption } from './Filters/types';
import styles from './Catalog.module.scss';
import CatalogHeader from './Header/CatalogHeader';
import mockProducts from '../../data/products.json';
import ProductList from './ProductList/ProductList';
import { Product } from './types';

interface FiltersData {
  filters: {
    [key: string]: {
      label: string;
      options?: string[];
      type?: 'default' | 'range';
      years?: number[];
    };
  };
}

interface MockProduct {
  id: string;
  image: string;
  lotNumber: string;
  year: number;
  brand: string;
  model: string;
  volume: number;
  fuelType: string;
  odometer: number;
  date: string;
  currentBid: number;
  buyNowPrice: number;
}

const Catalog: React.FC = () => {
  const [filterSettings, setFilterSettings] = useState<FilterOptions | null>(null);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>({});
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [sortBy, setSortBy] = useState('nearest');
  const [sortField, setSortField] = useState<string | undefined>();
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const typedFiltersData = filtersData as FiltersData;
    const processedFilters = Object.entries(typedFiltersData.filters).reduce((acc, [key, value]) => {
      const filterOption: FilterOption = {
        label: value.label,
        type: value.type || 'default',
        ...(value.options && { options: value.options }),
        ...(value.years && { years: value.years })
      };
      return {
        ...acc,
        [key]: filterOption
      };
    }, {} as FilterOptions);

    setFilterSettings(processedFilters);
  }, []);

  const handleFilterChange = (newFilters: FilterState) => {
    setAppliedFilters(newFilters);
    console.log('Applied filters:', newFilters);
  };

  const handleSort = (field: string, direction: 'asc' | 'desc') => {
    setSortField(field);
    setSortDirection(direction);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Можно добавить прокрутку к началу списка
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Сбрасываем на первую страницу при изменении количества элементов
  };

  const transformProducts = (products: MockProduct[]): Product[] => {
    return products.map(product => ({
      ...product,
      make: product.brand
    }));
  };

  if (!filterSettings) {
    return <div>Loading filters...</div>;
  }

  return (
    <div className={styles.catalog}>
      <div className={styles.filtersSection}>
        <Filters 
          filterOptions={filterSettings}
          onFiltersChange={handleFilterChange}
        />
      </div>
      
      <div className={styles.contentSection}>
        <CatalogHeader
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          sortBy={sortBy}
          onSortChange={setSortBy}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          totalItems={mockProducts.products.length}
        />
        
        <div className={styles.productListContainer}>
          <ProductList
            products={transformProducts(mockProducts.products)}
            viewMode={viewMode}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onSort={handleSort}
            sortField={sortField}
            sortDirection={sortDirection}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Catalog;