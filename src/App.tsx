import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './assets/scss/reset.scss'
import { useUserInfo } from './hooks/useUserInfo';
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ContactsPage from "./pages/ContactsPage";
import Main from "./layouts/Main";


function App() {
    // Загружаем информацию о пользователе при старте
    useUserInfo();

    return (
            <Router
              future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
              }}
            >
                <Routes>
                  <Route path="/" element={<Main />}>
                    <Route index element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/contacts" element={<ContactsPage />} />

                    <Route path="/news" element={<div>Новости</div>} />
                    <Route path="/careers" element={<div>Карьера</div>} />

                    <Route path="/faq" element={<div>Частые вопросы</div>} />
                    <Route path="/support" element={<div>Техподдерка</div>} />
                    <Route path="/warranty" element={<div>Гарантия</div>} />
                    <Route path="/returns" element={<div>Политика возврата</div>} />

                    <Route path="/sell/estimate" element={<div>Оценка авто</div>} />
                    <Route path="/sell/faq" element={<div>Часто задаваемые вопросы</div>} />
                    <Route path="/sell/contact" element={<div>Свяжитесь с нами</div>} />

                    <Route path="/buy/search" element={<div>Поиск авто</div>} />
                    <Route path="/buy/tips" element={<div>Советы покупателям</div>} />
                    <Route path="/buy/warranty" element={<div>Гарантия качества</div>} />

                    <Route path="/sitemap" element={<div>Карта сайта</div>} />
                    <Route path="/advertising" element={<div>Реклама</div>} />
                    <Route path="/partners" element={<div>Партнёрская программа</div>} />
                  </Route>
                </Routes>
            </Router>
    );
}

export default App;
