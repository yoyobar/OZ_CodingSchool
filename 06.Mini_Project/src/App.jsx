import { useEffect, useState } from 'react';
import MovieCard from './components/MovieCard';
import { Route, Routes } from 'react-router-dom';
import MovieDetail from './components/MovieDetail';
import axios from './api/axios';
import request from './api/request';

function App() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(request.fetchNowPlaying);
            setMovies(response.data.results);
        }

        fetchData();
    }, []);

    return (
        <div className='w-full h-[110vh]'>
            <Routes>
                <Route path='/' element={<MovieCard movies={movies} />}></Route>
                <Route path='/detail/:id' element={<MovieDetail />}></Route>
            </Routes>
        </div>
    );
}

export default App;
