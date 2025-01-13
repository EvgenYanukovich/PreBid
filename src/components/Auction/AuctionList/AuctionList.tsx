import { Box, Pagination, CircularProgress, Typography } from '@mui/material';
import AuctionCard from '../AuctionCard/AuctionCard';
import styles from './AuctionList.module.scss';
import { AuctionContent } from '../../../types/auction';

interface AuctionListProps {
  auctions: AuctionContent[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

const AuctionList: React.FC<AuctionListProps> = ({
  auctions,
  totalPages,
  currentPage,
  onPageChange,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!auctions?.length) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <Typography>Нет доступных аукционов</Typography>
      </Box>
    );
  }

  return (
    <div>
      {auctions.map((auction) => (
        <AuctionCard
          key={auction.id}
          id={auction.id}
          name={auction.name}
          vehicleCount={auction.transports_count}
          location={auction.countries_text?.[0] || 'Не указано'}
          dateStart={auction.date_start}
          isClosed={auction.is_closed}
        />
      ))}

      {totalPages > 1 && (
        <Box className={styles.pagination}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => onPageChange(page)}
            color="primary"
          />
        </Box>
      )}
    </div>
  );
};

export default AuctionList;
