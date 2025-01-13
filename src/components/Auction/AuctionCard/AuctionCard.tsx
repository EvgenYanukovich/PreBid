import { Button } from '@mui/material';
import styles from './AuctionCard.module.scss';

interface AuctionCardProps {
  id: number;
  name: string;
  location: string;
  vehicleCount: number;
  dateStart: string;
  isClosed: number;
}

const AuctionCard: React.FC<AuctionCardProps> = ({
  id,
  name,
  location,
  vehicleCount,
  dateStart,
  isClosed,
}) => {
  const getRemainingTime = (startDate: string) => {
    const start = new Date(startDate).getTime();
    const now = new Date().getTime();
    const diff = start - now;

    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${days} д ${hours} ч ${minutes} м ${seconds} с`;
  };

  const remainingTime = !isClosed ? getRemainingTime(dateStart) : null;
  const formattedDate = new Date(dateStart).toLocaleString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <article className={styles.auctionItem}>
      <ul className={styles.list}>
        <li>
          <div className={styles.mainInfo}>
            <div className={styles.location}>
              <div className={styles.countryBadge}>{location}</div>
            </div>
            <div className={styles.details}>
              <div className={styles.name}>{name}</div>
              <div className={styles.idRow}>ID аукциона {id}</div>
              <div className={styles.type}>{isClosed ? 'Закрытый' : 'Открытый'}</div>
            </div>
          </div>
        </li>
        <li>
          <div className={styles.vehicleInfo}>
            <div>Количество транспортных средств</div>
            <div>{vehicleCount}</div>
          </div>
        </li>
        <li>
          <div className={styles.timeInfo}>
            {isClosed ? (
              <div className={styles.startDate}>
                <span className={styles.inProgress}>Сейчас проходит</span>
              </div>
            ) : (
              <>
                <div className={styles.startDate}>
                  Дата начала {formattedDate}
                </div>
                {remainingTime && (
                  <div className={styles.remainingTime}>
                    Оставшееся время {remainingTime}
                  </div>
                )}
              </>
            )}
          </div>
        </li>
        <li>
          <Button
            variant="contained"
            color="primary"
            size="small"
          >
            Смотреть подробнее
          </Button>
        </li>
      </ul>
    </article>
  );
};

export default AuctionCard;
