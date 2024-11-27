import React from 'react';
import styles from './ViewToggle.module.scss';
import { ViewMode } from '../../types';
import classNames from 'classnames';
import tableActiveIcon from '../../../../assets/images/icons/tableActive.svg';
import tableNoActiveIcon from '../../../../assets/images/icons/tableNoActive.svg';
import cardsActiveIcon from '../../../../assets/images/icons/cardsActive.svg';
import cardsNoActiveIcon from '../../../../assets/images/icons/cardsNoActive.svg';

interface ViewToggleProps {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ value, onChange }) => {
  return (
    <div className={styles.viewToggle}>
      <button
        className={classNames(styles.button, {
          [styles.active]: value === 'list'
        })}
        onClick={() => onChange('list')}
        title="Список"
      >
        <img 
          src={value === 'list' ? tableActiveIcon : tableNoActiveIcon} 
          alt="Список"
          width={24}
          height={24}
        />
      </button>
      <button
        className={classNames(styles.button, {
          [styles.active]: value === 'grid'
        })}
        onClick={() => onChange('grid')}
        title="Сетка"
      >
        <img 
          src={value === 'grid' ? cardsActiveIcon : cardsNoActiveIcon} 
          alt="Сетка"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};

export default ViewToggle;
