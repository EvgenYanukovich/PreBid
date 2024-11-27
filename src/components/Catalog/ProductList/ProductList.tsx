import React from 'react';
import styles from './ProductList.module.scss';
import { Product } from '../types';
import ProductCard from './ProductCard/ProductCard';
import ProductTableRow from './ProductTableRow/ProductTableRow';
import TableHeader from './TableHeader/TableHeader';
import { ViewMode } from '../types';
import Pagination from '../Pagination/Pagination';

interface ProductListProps {
  products: Product[];
  viewMode: ViewMode;
  currentPage: number;
  itemsPerPage: number;
  onSort?: (field: string, direction: 'asc' | 'desc') => void;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  onPageChange: (page: number) => void;
}

const formatDate = (date: string | Date) => {
  const d = new Date(date);
  return {
    date: d.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).split('.').join('.'),
    time: d.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  };
};

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('ru-RU').format(num);
};

const ProductList: React.FC<ProductListProps> = ({
  products,
  viewMode,
  currentPage,
  itemsPerPage,
  onSort,
  sortField,
  sortDirection,
  onPageChange,
}) => {
  // Вычисляем индексы для текущей страницы
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  // Получаем продукты для текущей страницы
  const currentProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className={styles.productList}>
      {viewMode === 'grid' ? (
        <div className={styles.gridContainer}>
          {currentProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <TableHeader 
              onSort={onSort}
              sortField={sortField}
              sortDirection={sortDirection}
            />
            <tbody>
              {currentProducts.map(product => (
                <ProductTableRow key={product.id} product={product} />
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default ProductList;
