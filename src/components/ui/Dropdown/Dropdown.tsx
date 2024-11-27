import { useEffect, useRef, useState } from "react";
import styles from './Dropdown.module.scss';
import dropdown from '../../../assets/images/icons/dropdown.png'

interface Option {
  icon?: string;
  label?: string;
  value?: string;  
}

interface DropdownProps {
  options: Option[];
  onChange?: (option: Option) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={styles.dropdown}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.dropdownToggle}>
        {selectedOption ? (
          <div className={styles.selectedOption}>
            {selectedOption.icon && (
              <img src={selectedOption.icon} alt={selectedOption.label || "option"} />
            )}
            {selectedOption.label && <span>{selectedOption.label}</span>}
            <img
              src={dropdown}
              className={`${styles.dropImage} ${isOpen ? styles.open : ''}`}
            />
          </div>
        ) : (
          <>
            {options[0].icon && <img src={options[0].icon} alt={options[0].label || "option"} />}
            {options[0].label && <span>{options[0].label}</span>}
            <img
              src={dropdown}
              className={`${styles.dropImage} ${isOpen ? styles.open : ''}`}
            />
          </>
        )}
      </button>

      <ul
        className={`${styles.dropdownMenu} ${isOpen ? styles.open : ''}`}
      >
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => handleSelect(option)}
            className={styles.dropdownItem}
          >
            {option.icon && <img src={option.icon} alt={option.label || "option"} />}
            {option.label && <span>{option.label}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
