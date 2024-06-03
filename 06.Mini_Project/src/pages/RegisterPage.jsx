import FormContainer from '../components/FormContainer';
import MovieCard from '../components/MovieCard';

const RegisterPage = () => {
    return (
        <>
            <FormContainer />;
            <div className='absolute bottom-20 w-full mt-12 pl-4 pr-4 text-3xl text-white flex flex-col items-center'>
                <div>수 많은 영화정보를 손쉽게 확인해보세요</div>
                <div className='w-full animate-pulse'>
                    <MovieCard type='REGISTER' />
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
