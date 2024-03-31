// 전역 변수
navState = 0;
timerState = 0;
watchState = 0;
timerRunning = 0;
watchRunning = 0;
let timerInterval;
let watchInterval;

// nav바 애니메이션
const toggleNav = () => {
    document.querySelector('.body__home').style.opacity = '0';
    const content = document.querySelector('.head__nav');
    const button1 = document.querySelector('.nav__icon span:nth-child(1)');
    const button2 = document.querySelector('.nav__icon span:nth-child(2)');
    const button3 = document.querySelector('.nav__icon span:nth-child(3)');
    if (navState === 0) {
        // Nav
        content.style.animation = 'navbar-start 0.2s ease-in-out';
        content.style.top = '0px';
        // Button
        button1.style.transformOrigin = '0% 0%';
        button1.style.transform = 'rotateZ(45deg)';
        button2.style.transform = 'scaleY(0)';
        button3.style.transformOrigin = '0% 100%';
        button3.style.transform = 'rotateZ(-40deg)';
        navState = 1;
    } else {
        // Nav
        content.style.animation = 'navbar-stop 0.2s ease-in-out';
        content.style.top = '-50px';
        // Button
        button1.style.transform = 'none';
        button2.style.transform = 'none';
        button3.style.transform = 'none';
        navState = 0;
    }
};
// 캐러셀
const toggleTimer = () => {
    const content = document.querySelector('.body__timer');
    const anotherContent = document.querySelector('.body__stopwatch');
    const description = document.querySelector('.head__description');
    const cover = document.querySelector('.head__menubar');
    if (watchState === 1 || timerState === 0) {
        anotherContent.style.left = '800px';
        content.style.right = '0px';
        content.style.transition = '1s ease-out';
        content.style.zIndex = '3';
        anotherContent.style.zIndex = '2';
        description.innerText = 'TIMER';
        cover.style.background = '#63c8ff';
        watchState = 0;
        timerState = 1;
    }
};
const toggleStopWatch = () => {
    const content = document.querySelector('.body__stopwatch');
    const anotherContent = document.querySelector('.body__timer');
    const description = document.querySelector('.head__description');
    const cover = document.querySelector('.head__menubar');
    if (timerState === 1 || watchState === 0) {
        anotherContent.style.right = '800px';
        content.style.left = '0px';
        content.style.transition = '1s ease-out';
        content.style.zIndex = '3';
        anotherContent.style.zIndex = '2';
        description.innerText = 'STOPWATCH';
        cover.style.background = '#f553d7';
        watchState = 1;
        timerState = 0;
    }
};

// 타이머 위 조절 파트
const uYear = () => {
    const content = document.querySelector('.nYear');
    let value = Number(content.innerText);
    if (value === 9999) {
        value = 2024;
        content.innerText = value;
    } else {
        value++;
        content.innerText = value;
    }
};
const uMonth = () => {
    const content = document.querySelector('.nMonth');
    let value = Number(content.innerText);
    if (value === 12) {
        value = 1;
        content.innerText = value;
    } else {
        value++;
        content.innerText = value;
    }
};
const uDate = () => {
    const content = document.querySelector('.nDate');
    let value = Number(content.innerText);
    if (value === 31) {
        value = 1;
        content.innerText = value;
    } else {
        value++;
        content.innerText = value;
    }
};
// 타이머 아래 조절 파트
const dYear = () => {
    const content = document.querySelector('.nYear');
    let value = Number(content.innerText);
    if (value === 1) {
        value = 2024;
        content.innerText = value;
    } else {
        value--;
        content.innerText = value;
    }
};
const dMonth = () => {
    const content = document.querySelector('.nMonth');
    let value = Number(content.innerText);
    if (value === 1) {
        value = 12;
        content.innerText = value;
    } else {
        value--;
        content.innerText = value;
    }
};
const dDate = () => {
    const content = document.querySelector('.nDate');
    let value = Number(content.innerText);
    if (value === 1) {
        value = 31;
        content.innerText = value;
    } else {
        value--;
        content.innerText = value;
    }
};

// 입력 시간
const targetTime = () => {
    const targetYear = document.querySelector('.nYear').innerText;
    const targetMonth = document.querySelector('.nMonth').innerText;
    const targetDate = document.querySelector('.nDate').innerText;
    const dateFormat = new Date(`${targetYear}-${targetMonth}-${targetDate}`).setHours(0, 0, 0, 0);
    return dateFormat;
};

// 현재시간 및 시간 계산
const totalTime = () => {
    if (timerRunning === 0) {
        timerRunning = 1;
        timerInterval = setInterval(function () {
            // 0 미만시 초기화
            // 각각 할당
            const dateResult = document.querySelector('.rDate');
            const hourResult = document.querySelector('.rHour');
            const minuteResult = document.querySelector('.rMinute');
            const secondResult = document.querySelector('.rSecond');

            // 날짜 변수
            const targetDate = targetTime();
            const nowDate = new Date();
            const remain = (targetDate - nowDate) / 1000;
            // 날짜, 시간, 분, 초, 계산
            const remainDate = Math.floor(remain / 3600 / 24);
            const remainHour = Math.floor(remain / 3600) % 24;
            const remainMinute = Math.floor(remain / 60) % 60;
            const remainSecond = Math.floor(remain) % 60;
            dateResult.innerText = remainDate + ': ';
            hourResult.innerText = remainHour + ': ';
            minuteResult.innerText = remainMinute + ': ';
            secondResult.innerText = remainSecond;
            if (remain === 0) {
                alert('날짜가 바뀌었어요');
                timerRunning = 0;
                document.querySelector('.rDate').innerText = '';
                document.querySelector('.rHour').innerText = '';
                document.querySelector('.rMinute').innerText = '';
                document.querySelector('.rSecond').innerText = '';
                clearInterval(timerInterval);
            }
            if (remain < 0) {
                timerRunning = 0;
                document.querySelector('.rDate').innerText = '';
                document.querySelector('.rHour').innerText = '';
                document.querySelector('.rMinute').innerText = '';
                document.querySelector('.rSecond').innerText = '';
                return clearInterval(timerInterval);
            }
        }, 1000);
    }
};
const stopped = () => {
    document.getElementById('tStart').disabled = false;
    timerRunning = 0;
    clearInterval(timerInterval);
    document.getElementById('tStart').style.visibility = 'visible';
    document.querySelector('.rDate').innerText = '00';
    document.querySelector('.rHour').innerText = '00';
    document.querySelector('.rMinute').innerText = '00';
    document.querySelector('.rSecond').innerText = '00';
};

const stopWatch = () => {
    let hour = 0;
    let minute = 0;
    let second = 0;
    let ms = 0;
    if (watchRunning === 0) {
        watchInterval = setInterval(function () {
            if (ms == 100) {
                second++;
                ms = 0;
            }
            if (second == 60) {
                minute++;
                second = 0;
            }
            if (minute == 60) {
                hour++;
                minute = 0;
            }
            if (hour == 99) {
                alert('더 시간을 기록할 수 없습니다.');
                hour = 0;
                minute = 0;
                second = 0;
                ms = 0;
                clearInterval(watchInterval);
            }
            ms++;
            document.querySelector('.stopwatch__btn').innerText = '정지';
            document.querySelector('.watchMs').innerText = ms;
            document.querySelector('.watchS').innerText = second;
            document.querySelector('.watchM').innerText = minute;
            document.querySelector('.watchH').innerText = hour;
        }, 10);
    }
    if (watchRunning === 1) {
        document.querySelector('.stopwatch__btn').innerText = '시작';
        document.querySelector('.watchMs').innerText = '00';
        document.querySelector('.watchS').innerText = '00';
        document.querySelector('.watchM').innerText = '00';
        document.querySelector('.watchH').innerText = '00';
        clearInterval(watchInterval);
        return watchRunning--;
    }
    watchRunning++;
};
