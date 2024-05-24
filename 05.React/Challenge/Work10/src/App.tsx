import { Routes, Route, Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import LoginPage from './pages/LoginPage';
import DetailPage from './pages/DetailPage';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import RegisterPage from './pages/RegisterPage';
import Message from './components/Message';

const Layout = () => {
    return (
        <>
            <Nav />
            <Outlet />
            <Message />
        </>
    );
};

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<LoginPage />} />
                    <Route path='main' element={<MainPage />} />
                    <Route path='Register' element={<RegisterPage />} />
                    <Route path=':movieId' element={<DetailPage />} />
                    <Route path='search' element={<SearchPage />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
