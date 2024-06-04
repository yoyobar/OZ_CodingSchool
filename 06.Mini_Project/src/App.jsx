import { Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/NavBar';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Message from './components/Message';
import SearchPage from './pages/SearchPage';

const Layout = () => {
    const { pathname } = useLocation();
    const router = useNavigate();
    const [user, setUser] = useState(false);

    //! 인증정보 관리 mount: 첫 렌더링
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(true);
            } else {
                setUser(false);
            }
        });
    }, []);

    //! 라우팅 관리 mount: 라우팅 변경 / user정보 변경시
    useEffect(() => {
        if (!user && pathname !== '/register') {
            router('/');
        }

        if (user && pathname === '/') {
            router('/main');
        }
    }, [pathname, router, user]);

    return (
        <div className='select-none'>
            <Navbar />;
            <Outlet />;
            <Message />
        </div>
    );
};

function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<LoginPage />}></Route>
                <Route path='/main' element={<MainPage />}></Route>
                <Route path='/main/:id' element={<DetailPage />}></Route>
                <Route path='/register' element={<RegisterPage />}></Route>
                <Route path='/search' element={<SearchPage />}></Route>
            </Route>
        </Routes>
    );
}

export default App;
