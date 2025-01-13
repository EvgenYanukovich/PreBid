import { useEffect, useState } from 'react';
import styles from './RegionTabs.module.scss';
import countriesService, { Country } from '../../../services/countries.service';

interface RegionTabsProps {
  selectedCountryId: number | null;
  onTabChange: (countryId: number | null) => void;
}

const RegionTabs: React.FC<RegionTabsProps> = ({ selectedCountryId, onTabChange }) => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await countriesService.getCountries();
      setCountries(data);
    };
    fetchCountries();
  }, []);

  const tabs = [
    { label: 'Все', value: null },
    ...countries.map(country => ({
      label: country.name_ru,
      value: country.id
    }))
  ];

  return (
    <div className={styles.regionTabs}>
      {tabs.map((tab) => (
        <button
          key={tab.value === null ? 'all' : tab.value}
          className={`${styles.tab} ${selectedCountryId === tab.value ? styles.active : ''}`}
          onClick={() => onTabChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default RegionTabs;
