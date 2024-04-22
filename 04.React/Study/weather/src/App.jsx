import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from 'react';

function App() {
    const [check, setCheck] = useState(false);
    const [weather, setWeather] = useState({});
    const checkHandler = () => {
        setCheck(!check);
    };

    //OPENWEATHER API DATA REQUEST
    async function weatherApiSearch(city) {
        try {
            const response = await fetch(
                `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=e83cbcd7f0cb5b4bb7a22680f6cdd447`
            );
        } catch (error) {
            console.error('SEARCH DATA ERROR');
        }
    }

    //OPENWEATHER API DATA LOAD
    async function weatherApiCall(latitude, longitude) {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&lang=KR&appid=e83cbcd7f0cb5b4bb7a22680f6cdd447`
            );
            const json = await response.json();
            const { list } = json;
            const weatherData = list.map((item) => {
                return {
                    city: json.city.name,
                    weather: item.weather[0].description,
                    weatherIcon: item.weather[0].icon,
                    temp: (item.main.temp - 273.15).toFixed(0),
                    date: item.dt_txt.split(' ')[0],
                    time: item.dt_txt.split(' ')[1],
                    humidity: item.main.humidity,
                    pressure: item.main.pressure,
                    wind: item.wind.speed,
                    visibility: item.visibility,
                };
            });
            const filteredData = weatherData.filter((item) => item.time !== '00:00:00');
            setWeather(filteredData);
        } catch (error) {
            console.error('WEATHER DATA ERROR', error);
        }
    }
    //GEO LOCATION SETTING
    const accessGeo = ({ coords }) => {
        const { latitude, longitude } = coords;
        if (latitude === undefined || longitude === undefined) {
            return alert('GPS INFORMATION PARSE FAILED');
        }
        weatherApiCall(latitude, longitude);
    };

    //GEO LOCATION LOAD
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(accessGeo, (err) => {
            if (err.code === 1) {
                return alert('CHECK GPS PERMISSION');
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='main bg-slate-900 '>
            <Header checkHandler={checkHandler} />
            <Content />
            <Footer />
        </div>
    );
}

export default App;
