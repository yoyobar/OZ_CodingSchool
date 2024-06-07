import MovieBrowse from '../components/MovieBrowse';
import MovieCard from '../components/MovieCard';

const MainPage = () => {
    return (
        <>
            <div className='gap-10 pl-10 pr-10 static lg:flex'>
                <MovieCard type='TOP_RATED' />
                <MovieCard type='NOW_PLAYING' />
                <MovieCard type='TRENDING' />
            </div>
            <div className='flex flex-col items-center'>
                <div className='text-3xl  text-center text-white font-mono p-2 bg-black mb-10 w-60 rounded-md animate-pulse'>
                    Movie Browse
                </div>
                <MovieBrowse />
            </div>
        </>
    );
};

export default MainPage;
