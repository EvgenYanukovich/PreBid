import React, { useState } from 'react';
import styles from './ProductTableRow.module.scss';
import { Product } from '../../types';
import Button from '../../../ui/Button/Button';

interface ProductTableRowProps {
  product: Product;
}

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('ru-RU').format(num);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return {
    date: date.toLocaleDateString('ru-RU'),
    time: date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  };
};

const ProductTableRow: React.FC<ProductTableRowProps> = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  return (
    <tr>
      <td className={styles.productPhotoCell}>
        <div className={styles.photoContainer}>
          <button 
            className={styles.favoriteButton}
            onClick={handleFavoriteClick}
          >
            <img 
              src={`/images/cars/${isFavorite ? 'favoriteActive.svg' : 'favoriteNoActive.svg'}`}
              alt={isFavorite ? "Remove from favorites" : "Add to favorites"}
              width={24}
              height={24}
            />
          </button>
          <img
            src={product.image}
            alt={`${product.make} ${product.model}`}
            className={styles.productImage}
          />
        </div>
      </td>
      <td>{product.lotNumber}</td>
      <td>{product.year}</td>
      <td>{product.make}</td>
      <td>{product.model}</td>
      <td>{product.volume}L</td>
      <td>{formatNumber(product.odometer)} км</td>
      <td>
        <div className={styles.dateColumn}>
          <div>{formatDate(product.date).date}</div>
          <div>{formatDate(product.date).time}</div>
        </div>
      </td>
      <td>{formatNumber(product.currentBid)} $</td>
      <td>
        <div className={styles.actions}>
          <Button styleButton="primaryButton">
            Сделать ставку
          </Button>
          <div className={styles.buyNowPrice}>
            <a href="#">
              Купить сейчас за {formatNumber(product.buyNowPrice)} $
            </a>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ProductTableRow;
