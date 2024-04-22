export default function Card() {
    return (
        <div className='relative font-mono'>
            <div className='w-24 h-24 bg-slate-200 rounded-xl flex flex-col items-center gap-1'>
                <div>19:00 pm</div>
                <img className='rounded-sm relative z-10' src='http://via.placeholder.com/40x40'></img>
                <div className='relative z-10'>29°C</div>
            </div>
            <div className='absolute w-24 h-10 bg-gradient-to-t to-gray-600 from-gray-800 -bottom-1 rounded-xl'></div>
        </div>
    );
}
