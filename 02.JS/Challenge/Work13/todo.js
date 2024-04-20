//global

const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const alertBox = document.querySelector('.notice-box');
const weather = document.querySelector('.weather');
const weatherBox = document.querySelector('.weather-description');
const weatherIconBox = document.querySelector('.weather-icon-img');
const progressBar = document.querySelector('progress');

let todoArray = [];

// 생성된 li>button으로의 삭제판단, 조건 : 이벤트 발생 후 함수호출, Array.filter로 반환
const todoDel = (todoId) => {
    todoArray = todoArray.filter((aTodo) => {
        return aTodo.id !== todoId;
    });
    todoDisplay();
    todoSave();
};

// 생성된 li의 mark변환, 조건 : 이벤트 발생 후 함수호출, Array.map로 변환
const todoMark = (todoId) => {
    todoArray = todoArray.map((aTodo) => {
        if (aTodo.id === todoId) {
            return {
                ...aTodo,
                mark: !aTodo.mark,
            };
        } else {
            return {
                ...aTodo,
            };
        }
    });
    todoDisplay();
    todoSave();
};

// 생성된 Array표기, 조건 : 이벤트 발생 후 함수호출, 각각 forEach로 데이터 참조 가능하게
const todoDisplay = () => {
    todoList.innerHTML = '';
    todoArray.forEach((aTodo) => {
        const todoItem = document.createElement('li');
        const todoItemBtn = document.createElement('button');
        todoItem.title = '누를 경우 완료 처리 됩니다';
        todoItemBtn.title = '누를 경우 삭제 처리 됩니다';
        todoItem.textContent = aTodo.name;
        todoItemBtn.textContent = 'X';

        // 클래스 삽입으로 구별
        if (aTodo.mark) {
            todoItem.classList.add('marked');
        } else {
            todoItem.classList.add('unmarked');
        }
        todoItem.addEventListener('click', () => {
            todoMark(aTodo.id);
        });
        todoItemBtn.addEventListener('click', () => {
            todoDel(aTodo.id);
        });
        todoList.appendChild(todoItem);
        todoItem.appendChild(todoItemBtn);
    });
};

// Array 생성, 조건 : submit 이벤트 발생
if (todoForm instanceof Element) {
    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log(todoForm.todo.value);

        //trim(), 문자열 공백 값 제거
        if (todoForm.todo.value.trim() === '') {
            return alertBoxMsg('빈 내용의 리스트는 허용되지 않습니다.');
        }

        const addContent = {
            name: todoForm.todo.value,
            id: new Date().getTime(),
            mark: false,
        };

        todoArray.push(addContent);
        todoForm.todo.value = '';
        todoDisplay();
        todoSave();
    });
}

// localStorage의 저장
const todoSave = () => {
    const todoSaveList = JSON.stringify(todoArray);
    localStorage.setItem('myTodo', todoSaveList);
};

// localStorage의 불러오기
const todoLoad = () => {
    const todoLoadList = localStorage.getItem('myTodo');
    if (todoLoadList === null || undefined) {
        return;
    } else {
        todoArray = JSON.parse(todoLoadList);
        todoDisplay();
    }
};
//API 처리
const weatherDataActive = function ({ weatherLoc, weatherTemp, weatherMain, weatherIcon }) {
    progressBar.classList.add('disabled');

    switch (weatherMain) {
        case 'Clear':
            weatherMain = '맑음';
            break;
        case 'Clouds':
            weatherMain = '구름 낌';
            break;
        case 'Drizzle':
            weatherMain = '이슬비';
            break;
        case 'Fog':
            weatherMain = '안개';
            break;
        case 'Rain':
            weatherMain = '비';
            break;
        case 'Snow':
            weatherMain = '눈';
            break;
        case 'Thunderstorm':
            weatherMain = '뇌우';
            break;
        default:
            break;
    }
    weatherBox.textContent = `위치 : ${weatherLoc} 온도 : ${weatherTemp} 날씨 : ${weatherMain}`;
    weatherIconBox.src = weatherIcon;
    weather.classList.remove('disabled');
    weather.style.bottom = '0px';
};

//API 요청
const weatherSearch = function ({ latitude, longitude }) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=e83cbcd7f0cb5b4bb7a22680f6cdd447`
    )
        .then((res) => {
            return res.json(); //res -> json, parse는 header존재시 사용불가
        })
        .then((json) => {
            const weatherData = {
                weatherLoc: json.name,
                weatherTemp: (json.main.temp - 273.15).toFixed(0) + '°C',
                weatherMain: json.weather[0].main,
                weatherIcon: `https://openweathermap.org/img/wn/${json.weather[0].icon}@4x.png`,
            };
            weatherDataActive(weatherData);
        })
        .catch((err) => {
            return alertBoxMsg(new Error(err));
        });
};

//geo 경도, 위도 데이터 처리
const accessToGeo = ({ coords }) => {
    const { latitude, longitude } = coords;
    const positionObj = {
        //shorthand property
        latitude, //경도
        longitude, //위도
    };
    weatherSearch(positionObj);
};

//geo 경도, 위도 불러오기
const askForLocation = () => {
    navigator.geolocation.getCurrentPosition(accessToGeo, (err) => {
        if (err.code === 1) {
            return alertBoxMsg('GPS를 허용해 주세요!');
        }
    });
};

//새로고침 이벤트 활성화
document.addEventListener('DOMContentLoaded', () => {
    askForLocation();
    todoLoad();
});

//alert 박스 만들기
function alertBoxMsg(text) {
    if (alertBox.classList[1] === 'disabled') {
        alertBox.style.transition = 'all 1s';
        setTimeout(() => {
            alertBox.classList.remove('disabled');
            alertBox.textContent = text;
            alertBox.style.right = '0vw';
        }, 10);
    }
}
//alert 박스 처리
alertBox.addEventListener('click', () => {
    alertBox.style.right = '100vw';
    setTimeout(() => {
        alertBox.classList.add('disabled');
    }, 10);
});
