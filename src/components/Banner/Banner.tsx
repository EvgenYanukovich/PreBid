import Button from "../ui/Button/Button";
import styles from "./Banner.module.scss";

const Banner = () => {
    return (
        <>
            <section className={styles.banner}>
                <div className={styles.bannerContent}>
                    <h1>Надежный способ продажи<br/>и покупки авто через аукцион</h1>
                    <div>
                        <Button styleButton="greenButton">Зарегистрироваться</Button>
                        <Button styleButton="blueButton">Войти</Button>
                    </div>
                </div>
                <img src="/banner-car.png" alt="Car" className="banner-image" />
            </section>
        </>
    );
};

export default Banner;
