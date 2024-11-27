import React, { useState } from 'react';
import styles from './ProductCard.module.scss';
import { Product } from '../../types';
import Button from '../../../ui/Button/Button';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('ru-RU').format(num);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      <button 
        className={styles.bookmark}
        onClick={handleFavoriteClick}
      >
        <img 
          src={`/images/cars/${isFavorite ? 'favoriteActive.svg' : 'favoriteNoActive.svg'}`}
          alt={isFavorite ? "Remove from favorites" : "Add to favorites"}
          width={24}
          height={24}
        />
      </button>
      
      <div className={styles.imageContainer}>
        <img src={product.image} alt={`${product.make} ${product.model}`} className={styles.image} />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>
          {product.year} {product.make} {product.model}
        </h3>

        <div className={styles.infoTable}>
          <div className={styles.infoRow}>
            <span className={styles.label}>Номер лота</span>
            <span className={`${styles.value} ${styles.lotNumber}`}>{product.lotNumber}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Дата акциона</span>
            <span className={styles.value}>{new Date(product.date).toLocaleDateString('ru-RU')}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Объем двигателя</span>
            <span className={styles.value}>{product.volume}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Тип топлива</span>
            <span className={styles.value}>{product.fuelType}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Одометр</span>
            <span className={styles.value}>{formatNumber(product.odometer)} км</span>
          </div>
        </div>

        <div className={styles.bidSection}>
          <div className={styles.currentBid}>
            <div className={styles.bidInfo}>
              <span className={styles.bidLabel}>Текущая ставка</span>
              <span className={styles.price}>$ {formatNumber(product.currentBid)}</span>
            </div>
            <Button styleButton="blueButton">
              Сделать ставку
            </Button>
          </div>
          
          {product.buyNowPrice && (
            <a href="#" className={styles.buyNowLink}>
              Купить сейчас за {formatNumber(product.buyNowPrice)}$
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
