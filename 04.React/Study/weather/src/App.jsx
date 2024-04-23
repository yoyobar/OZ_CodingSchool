import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useRef, useState } from 'react';
import { createContext } from 'react';

export const WeatherStateContext = createContext();
export const CheckStateContext = createContext();

function App() {
    const [check, setCheck] = useState(false);
    const [weather, setWeather] = useState({});
    const apiRequest = useRef(true);
    const checkHandler = () => {
        setCheck(!check);
    };

    //API DATA FILTER
    const dataSetting = (json, list) => {
        //API 요청으로 받아온 데이터의 필요한 데이터 포맷
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
        //40개의 최종 데이터중 00:00:00에 해당하는 배열 제거
        const filteredData = weatherData.filter((item) => item.time !== '00:00:00');
        //35개의 array를 2중 depth로 7x5의 배열을 생성함
        const reducedData = filteredData.reduce((acc, curr, index) => {
            const chunkIndex = Math.floor(index / 7);
            if (!acc[chunkIndex]) {
                acc[chunkIndex] = [];
            }
            acc[chunkIndex].push(curr);
            return acc;
        }, []);
        setWeather(reducedData);
    };

    //OPENWEATHER API DATA LOAD
    async function weatherApiCall(latitude, longitude) {
        if (apiRequest.current) {
            apiRequest.current = !apiRequest.current;

            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&lang=KR&appid=e83cbcd7f0cb5b4bb7a22680f6cdd447`
                );
                const json = await response.json();
                const { list } = json;
                dataSetting(json, list);
                apiRequest.current = !apiRequest.current;
            } catch (error) {
                console.error('WEATHER DATA ERROR', error);
                apiRequest.current = !apiRequest.current;
            }
        } else {
            return alert('API 처리중 입니다.');
        }
    }

    //OPENWEATHER API DATA REQUEST
    async function weatherApiSearch(city) {
        if (apiRequest.current) {
            apiRequest.current = !apiRequest.current;

            try {
                const response = await fetch(
                    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=e83cbcd7f0cb5b4bb7a22680f6cdd447`
                );
                const [json] = await response.json();
                //도시정보 API와 날씨정보 API가 버전이 달라 실제 geo데이터가 다른경우가 있음
                let geoData = [];
                switch (json.name) {
                    case 'Gwangju':
                        geoData = [37.41, 127.2572];
                        break;
                    case 'Incheon':
                        geoData = [37.45, 126.4161];
                        break;
                    default:
                        geoData = [json.lat, json.lon];
                        break;
                }
                apiRequest.current = !apiRequest.current;
                weatherApiCall(geoData[0], geoData[1]);
            } catch (error) {
                console.error('SEARCH DATA ERROR');
                apiRequest.current = !apiRequest.current;
            }
        } else {
            return alert('API 처리중 입니다.');
        }
    }

    //GEO LOCATION SETTING
    const accessGeo = ({ coords }) => {
        const { latitude, longitude } = coords;
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
            <WeatherStateContext.Provider value={{ weather, weatherApiSearch }}>
                <CheckStateContext.Provider value={checkHandler}>
                    <Header />
                    <Content />
                    <Footer />
                </CheckStateContext.Provider>
            </WeatherStateContext.Provider>
        </div>
    );
}

export default App;
