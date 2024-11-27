import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import styles from "./Main.module.scss";

const Main = () => {
    return (
        <>
        <Header />
        <main className={styles.main}>
            <Outlet />
        </main>
        <Footer />
        </>
    );
};

export default Main;