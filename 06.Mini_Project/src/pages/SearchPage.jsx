import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';
import axios from '../api/axios';
import { useBookmark, useModal } from '../store';
import Loading from '../components/Loading';

const SearchPage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };
    const router = useNavigate();

    const query = useQuery();
    const searchTerm = useDebounce(query.get('q'), 500);
    const { setMark } = useBookmark();
    const { modalOn } = useModal();

    const fetchSearch = async (text) => {
        function filterMovie(data) {
            const filterList = data.filter((item) => item.title !== null && item.title !== undefined && item.backdrop_path !== null);
            return filterList;
        }

        try {
            const response = await axios.get(`/search/multi?include_adult=false&query=${text}`);
            const filterData = filterMovie(response.data.results);
            setSearchResults(filterData);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    const bookmarkHandler = (e) => {
        setMark(e.target.value);
        modalOn(`북마크 추가됨 ${e.target.name}`);
    };

    const imgHandler = (id) => {
        router(`/main/${id}`);
    };

    useEffect(() => {
        if (searchTerm) {
            fetchSearch(searchTerm);
        }

        if (searchTerm === '') {
            router('/main');
        }
    }, [router, searchTerm]);

    if (loading) return <Loading />;

    return (
        <>
            <div className='w-full flex flex-wrap justify-center gap-1 mt-20'>
                {searchResults.length === 0 && <div className='text-white text-2xl'>검색된 영화가 없습니다</div>}
                {searchResults.map((item) => {
                    return (
                        <div key={item.id} className='relative'>
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    imgHandler(item.id);
                                }}
                                className='relative sm:w-[200px] rounded-md cursor-pointer flex flex-col justify-center items-center flex-wrap'
                            >
                                <img
                                    className='scale-95 hover:scale-100 rounded-md transition w-full'
                                    src={`https://image.tmdb.org/t/p/w1280/${item.backdrop_path}`}
                                />

                                <div className='text-white'>{item.title}</div>
                            </div>
                            <button
                                onClick={bookmarkHandler}
                                value={item.id}
                                name={item.title}
                                className={
                                    loading
                                        ? 'hidden'
                                        : 'absolute bottom-10 right-8 text-2xl text-white [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] hover:scale-125 transition'
                                }
                            >
                                ▲
                            </button>
                        </div>
                    );
                })}
                <div id='observer'></div>
            </div>
        </>
    );
};

export default SearchPage;
