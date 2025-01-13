import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import AdminPanel from '../components/AdminPanel/Panel/AdminPanel';
import AddAuctionForm from '../components/AdminPanel/AddAuctions/AddAuctionForm';
import AuctionList from '../components/Auction/AuctionList/AuctionList';
import RegionTabs from '../components/Auction/RegionTabs/RegionTabs';
import DateRangePicker from '../components/Auction/DateRangePicker/DateRangePicker';
import ItemsPerPage from '../components/Auction/ItemsPerPage/ItemsPerPage';
import LoginForm from '../components/Auth/LoginForm';
import Modal from '../components/ui/Modal/Modal';
import { RootState } from '../store';
import auctionService from '../services/auction.service';
import { AuctionContent } from '../types/auction';
import styles from './AuctionsPage.module.scss';

const itemsPerPageOptions = [10, 20, 50];

const AuctionsPage = () => {
  const { isAuthenticated, userInfo } = useSelector((state: RootState) => state.auth);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [auctions, setAuctions] = useState<AuctionContent[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [adminView, setAdminView] = useState<'list' | 'add'>('list');

  const fetchAuctions = async () => {
    if (!userInfo) return;

    try {
      setIsLoading(true);
      const response = await auctionService.searchAuctions({
        page: currentPage,
        limit: itemsPerPage,
        search: {
          date_start_select: startDate || '',
          date_end_select: endDate || '',
          country_id: selectedCountryId || '',
        },
      });

      if (response.status === 'success' && response.content?.length > 0) {
        const allAuctions = response.content.flatMap(day => day.contents);
        setAuctions(allAuctions);
        setTotalPages(Math.ceil(response.pagination.total_results / itemsPerPage));
        setTotalResults(response.pagination.total_results);
      } else {
        setAuctions([]);
        setTotalPages(0);
        setTotalResults(0);
      }
    } catch (error) {
      console.error('Error fetching auctions:', error);
      setAuctions([]);
      setTotalPages(0);
      setTotalResults(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
    } else {
      setIsLoginModalOpen(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && userInfo) {
      fetchAuctions();
    }
  }, [isAuthenticated, userInfo, currentPage, itemsPerPage, selectedCountryId, startDate, endDate]);

  // const handleDateRangeChange = (start: string, end: string) => {
  //   setStartDate(start);
  //   setEndDate(end);
  //   setCurrentPage(1);
  // };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const isAdmin = userInfo?.role?.code === 'admin';

  if (!isAuthenticated) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Для просмотра аукционов необходима авторизация
        </Typography>
        <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
          <LoginForm
            onSuccess={() => { }}
            onRegisterClick={() => { }}
            onLoginClick={() => { }}
          />
        </Modal>
      </Box>
    );
  }

  return (
    <Box className={styles.auctionsPage} sx={{ py: 7 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: '40px' }}>
        Аукционы
      </Typography>

      <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
        {isAdmin && (
          <AdminPanel
            totalAuctions={totalResults}
            currentView={adminView}
            onViewChange={setAdminView}
          />
        )}

        <Box sx={{ flex: 1 }}>
          {adminView === 'list' ? (
            <>
              <RegionTabs
                selectedCountryId={selectedCountryId}
                onTabChange={countryId => {
                  setSelectedCountryId(countryId);
                  setCurrentPage(1);
                }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: '20px', mb: '40px', mt: '40px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ fontSize: '16px', color: '#000' }}>
                    Показать за период
                  </Typography>
                  <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(start, end) => {
                      setStartDate(start);
                      setEndDate(end);
                      setCurrentPage(1);
                    }}
                  />
                </Box>

                <ItemsPerPage
                  value={itemsPerPage}
                  options={itemsPerPageOptions}
                  onChange={(value) => {
                    setItemsPerPage(value);
                    setCurrentPage(1);
                  }}
                />
              </Box>

              <Typography variant="body1" sx={{ fontSize: '20px', color: '#000', mb: 4 }}>
                <span style={{ color: '#6b7a99', fontWeight: '400', fontSize: '20px' }}>Найдено</span> {totalResults} результатов
              </Typography>

              <AuctionList
                auctions={auctions}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                isLoading={isLoading}
              />
            </>
          ) : (
            <AddAuctionForm onSuccess={() => {
              setAdminView('list');
              fetchAuctions();
            }} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AuctionsPage;
