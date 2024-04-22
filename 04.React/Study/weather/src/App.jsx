import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState } from 'react';

function App() {
    const [check, setCheck] = useState(false);
    const checkHandler = () => {
        setCheck(!check);
    };

    return (
        <div className='main bg-slate-900 '>
            <Header checkHandler={checkHandler} />
            <Content />
            <Footer />
        </div>
    );
}

export default App;
