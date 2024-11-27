import Dropdown from "../ui/Dropdown/Dropdown";
import styles from "./Header.module.scss";
import belarus from "../../assets/images/country/belarus.png"

interface ImageDrop {
  icon: string;
}

interface TextDrop {
  label: string;
}

const regions: ImageDrop[] = [
  { icon: belarus },
  { icon: belarus },
  { icon: belarus },
  { icon: belarus },
];

const languages: TextDrop[] = [
  { label: 'RU' },
  { label: 'EN' },
];

const currency: TextDrop[] = [
  { label: 'Доллар США' },
  { label: 'Рубль Беларусь' },
  { label: 'Рубль Россия' }
];

function HeaderUp() {
  return (
    <div className={styles.headerUp}>
      <p className={styles.headerUpLeft}>
        Название страны, город, номер телефона
      </p>
      <div className={styles.headerUpRight}>
        <div className={styles.headerUpRightComponent}>
          <p>Регион</p>
          <Dropdown
            options={regions.map(region => ({ icon: region.icon }))}
          />
        </div>
        <div className={styles.headerUpRightComponent}>
          <p>Язык</p>
          <Dropdown
            options={languages.map(language => ({ label: language.label }))}
          />
        </div>
        <div className={styles.headerUpRightComponent}>
          <p>Валюта</p>
          <Dropdown
            options={currency.map(currency => ({ label: currency.label }))}
          />
        </div>
      </div>
    </div>
  );
}

export default HeaderUp;
