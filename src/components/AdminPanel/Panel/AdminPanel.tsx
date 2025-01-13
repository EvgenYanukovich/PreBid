import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import styles from './AdminPanel.module.scss';

interface AdminPanelProps {
  totalAuctions: number;
  onViewChange: (view: 'list' | 'add') => void;
  currentView: 'list' | 'add';
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  totalAuctions,
  onViewChange,
  currentView
}) => {
  const handleViewChange = (view: 'list' | 'add') => {
    if (view !== currentView) {
      onViewChange(view);
    }
  };

  return (
    <Box className={styles.adminPanel}>
      <div
        className={styles.menuItem}
        onClick={() => handleViewChange('list')}
      >
        Список аукционов
        <span className={styles.counter}>{totalAuctions}</span>
      </div>

      <div
        className={styles.menuItem}
        onClick={() => handleViewChange('add')}
      >
        Добавить аукцион
        <span className={styles.icon}>
          <AddIcon />
        </span>
      </div>
    </Box>
  );
};

export default AdminPanel;