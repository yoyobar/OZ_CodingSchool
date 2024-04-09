// 자바스크립트에서 자체적으로 지원하는 생성자 (new, date등)
// 자바스크립트에서 자체적으로 지원하는 객체

const now = new Date();
console.log(now);
// 코드 생성 당시 시간 정보

const then = new Date(2008, 5, 10);
console.log(then);
// 코드 생성시 입력한 시간정보

const interval = now - then;
console.log(interval);
// Date끼리는 밀리초 단위로 연산
// 월은 0부터 시작함

let year = now.getFullYear();
let month = now.getMonth() + 1;
let date = now.getDate();
let hour = now.getHours();
let minute = now.getMinutes();
let second = now.getSeconds();

console.log(`${year} - ${month} - ${date} - ${hour} - ${minute} - ${second}`);
