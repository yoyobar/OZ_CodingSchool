let todaySpan = document.querySelector('#today');
let numbersDiv = document.querySelector('.numbers');
let drawButton = document.querySelector('#draw');
let resetButton = document.querySelector('#reset');

// 로또 번호 추첨
let lottoNumbers = [];

// 로또 번호 스크린 할당
const paintNumber = (number) => {
    const randomColor = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
    const eachNumberDiv = document.createElement('div');
    eachNumberDiv.classList.add('eachNum');
    eachNumberDiv.textContent = number;
    eachNumberDiv.style.background = '#' + randomColor;
    numbersDiv.append(eachNumberDiv);
};

// 이벤트 핸들링
const eventHandler = (e) => {
    // 추첨 버튼 할당
    if (e.target.id == 'draw') {
        // 추첨 다시 눌러도 초기화 시키기
        if (lottoNumbers.length === 6) {
            lottoNumbers.splice(0, 6);
            numbersDiv.innerHTML = '';
        }
        // 반복 해서 랜덤 숫자 할당;
        while (lottoNumbers.length < 6) {
            let rn = Math.floor(Math.random() * 45) + 1;

            if (lottoNumbers.indexOf(rn) === -1) {
                lottoNumbers.push(rn);
                paintNumber(rn);
            }
        }
    }
    // 리셋 버튼 할당
    if (e.target.id == 'reset') {
        lottoNumbers.splice(0, 6);
        numbersDiv.innerHTML = '';
    }
};
// 버튼 할당
drawButton.addEventListener('click', eventHandler);
resetButton.addEventListener('click', eventHandler);

// 날짜 표시
const today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
let date = today.getDate();
todaySpan.textContent = `${year}년 ${month}월 ${date}일`;
