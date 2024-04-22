import temp from '../assets/icon_temperature.png';
import location from '../assets/icon_location.png';

export default function Carousel() {
    return (
        <>
            <div className='border-b-2 border-slate-600 flex justify-between flex-col gap-4 pt-6 pb-6 font-mono text-white rounded-3xl pl-4 pr-4 h-96 bg-gradient-to-tl to-purple-700 to-90% from-gray-700 from-30%'>
                <div className='text-xl flex'>
                    <div>Burdwan</div>
                    <img className='w-6 h-6 hover:brightness-75' src={location}></img>
                </div>
                <div className='flex pt-24 gap-4 justify-center items-center'>
                    <div className='relative text-5xl gap-4 font-sans flex justify-center items-center'>
                        <img className='w-3 h-10' src={temp}></img>
                        <div>27도</div>
                    </div>
                    <img src='http://via.placeholder.com/48x48'></img>
                </div>
                <div className='cursor-pointer underline'>Aug 23, Tue</div>

                <aside className='pl-8 pr-8 flex justify-between'>
                    <nav className='flex flex-col items-center'>
                        <div>HUMIDITY</div>
                        <div>99%</div>
                    </nav>
                    <nav className='flex flex-col items-center'>
                        <div>VISIBLITY</div>
                        <div>8km</div>
                    </nav>
                    <nav className='flex flex-col items-center'>
                        <div>AIR PRESSURE</div>
                        <div>1005hpa</div>
                    </nav>
                    <nav className='flex flex-col items-center'>
                        <div>WIND</div>
                        <div>2mph</div>
                    </nav>
                </aside>
            </div>
        </>
    );
}
