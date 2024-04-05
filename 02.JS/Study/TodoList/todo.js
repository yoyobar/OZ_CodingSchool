// 0. 버튼을 클릭했을 때 실행되는 이벤트 함수입니다.
// 1. index.html에 있는 input 요소에 입력된 값(value)과 button 요소를 변수에 할당합니다.
// 2. 새로운 li요소를 만들고 input 요소에 입력된 값을 textContent로 갖도록 합니다.
// 3. li 요소는 클릭하면 해당 li 요소가 지워지는 delete 버튼을 가지고 있어야 합니다.
// 4. 입력창은 초기화되어야 합니다.
// 5. 만약 입력창에 아무것도 입력하지 않은 경우 alert로 유저에게 입력을 요청해야 합니다.
// 심화1) 입력한 TO-DO가 Local Storage에 저장되어 새로 고침 후에도 유지되도록 해보세요.
// 심화2) 할 일 항목에 완료 표시를 할 수 있는 체크박스를 추가해 보세요.
// 심화3) TO-DO 리스트를 드래그 앤 드롭으로 정렬할 수 있는 방법을 검색하고 적용해 보세요.

//심화 1: localStorage 구현 완료
//심화 2: li클릭시 스타일변화, 구현 완료
//추가 1: AlertBox 기능
//추가 2: Progress 기능
//추가 3: Weather API 요청 기능

//global
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const alertBox = document.querySelector('.notice-box');
const box = document.querySelector('.weather');
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
        const newList = document.querySelectorAll('li');
    });
};

// Array 생성, 조건 : submit 이벤트 발생
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

//API 요청
const weatherSearch = function (position) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=e83cbcd7f0cb5b4bb7a22680f6cdd447`
    )
        .then((res) => {
            return res.json(); //res -> json, parse는 header존재시 사용불가
        })
        .then((json) => {
            const weatherLoc = json.name;
            const weatherTemp = (json.main.temp - 273.15).toFixed(1);
            const weatherMain = json.weather[0].main;
            const weatherIcon = `https://openweathermap.org/img/wn/${json.weather[0].icon}@4x.png`;

            progressBar.classList.add('disabled');
            weatherBox.textContent = `위치 : ${weatherLoc} 온도 : ${weatherTemp} 날씨 : ${weatherMain}`;
            weatherIconBox.src = weatherIcon;
            box.classList.remove('disabled');
            box.style.bottom = '0px';
        })
        .catch((err) => {
            return alertBoxMsg(new Error(err));
        });
};

//geo 경도, 위도 데이터 처리
const accessToGeo = (position) => {
    const positionObj = {
        latitude: position.coords.latitude, //경도
        longitude: position.coords.longitude, //위도
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
