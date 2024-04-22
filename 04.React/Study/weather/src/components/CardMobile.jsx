export default function CardMobile() {
    return (
        <div className='relative font-mono'>
            <div className='w-12 h-12 bg-slate-200 rounded-xl flex flex-col justify-center items-center'>
                <img className='rounded-sm relative z-10' src='http://via.placeholder.com/30x30'></img>
            </div>
            <div className='absolute w-12 h-7 bg-gradient-to-t to-gray-600 from-gray-800 -bottom-1 rounded-xl'></div>
        </div>
    );
}
