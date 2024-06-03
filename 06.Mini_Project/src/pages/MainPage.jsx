import MovieCard from '../components/MovieCard';

const MainPage = () => {
    return (
        <>
            <div className='text-4xl font-mono text-white ml-16 bg-sky-700 w-[300px] p-2 text-center rounded-sm'>Movie Browse</div>

            <MovieCard type='TOP_RATED' />
            <MovieCard type='NOW_PLAYING' />
            <MovieCard type='TRENDING' />
        </>
    );
};

export default MainPage;
