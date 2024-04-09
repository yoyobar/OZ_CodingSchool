// abs 절대 값 변환
// floor 버림, 소수점 제거
// pow  제곱 (정수, 제곱수)
// random 0이상 1미만의 난수
// sign 부호 반환
// sqrt 제곱근

let number = 9;
console.log(Math.sqrt(number));

let randomNumber = Math.random();
console.log(randomNumber);

randomNumber = Math.random() * 1000;
console.log(randomNumber);

randomNumber = Math.floor(Math.random() * 10) + 1;
// 0이 안나오게 됨;
console.log(randomNumber);

// 상수 화
const MAX_NUM = 10;
const MIN_NUM = 1;
console.log(Math.floor(Math.random() * MAX_NUM) + MIN_NUM);
