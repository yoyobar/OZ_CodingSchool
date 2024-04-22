import logo from '../assets/Main.png';
export default function NavMobile() {
    return (
        <>
            <img className='w-16 absolute' src={logo}></img>
            <header className='pt-9 ml-14 mr-14 wrapper_header font-mono flex gap-14'>
                <div className='text-white font-thin text-5xl flex-grow'>WeatherMe</div>
            </header>
        </>
    );
}
