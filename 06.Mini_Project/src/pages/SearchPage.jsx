import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';
import axios from '../api/axios';
import MovieCard from '../components/MovieCard';

const SearchPage = () => {
    const [searchResults, setSearchResults] = useState([]);

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };
    const router = useNavigate();

    const query = useQuery();
    const searchTerm = useDebounce(query.get('data'), 500);

    const fetchSearch = async (text) => {
        try {
            const response = await axios.get(`/search/multi?include_adult=false&query=${text}`);
            setSearchResults(response.data.results);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (searchTerm) {
            fetchSearch(searchTerm);
        }

        if (searchTerm === '') {
            router('/main');
        }
    }, [router, searchTerm]);

    return <MovieCard type='SEARCH' data={searchResults} />;
};

export default SearchPage;
