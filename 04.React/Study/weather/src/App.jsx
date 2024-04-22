import Header from './components/Header';
import Content from './components/Content';
import Weekly from './components/Weekly';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
    return (
        <div className='main bg-slate-900 '>
            <Header />
            <Content />
            <Weekly />
        </div>
    );
}

export default App;
