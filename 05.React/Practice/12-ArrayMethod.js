// 콜백 함수를 인수로 전달
// 배열의 멤버를 기반으로 새로운 배열 생성 (return)
// map : 내용을 변경 후 새로운 배열 생성
// filter : true 반환한 값만 새로운 배열 생성

let crops = ['토마토', '고추', '가지', '고구마', '들깨'];
crops.forEach((item) => {
    console.log(item);
});

let cropsMap = crops.map((item) => {
    return item + ' 맛있다';
});
console.log(cropsMap);

let cropsFilter = crops.filter((item) => {
    return item.length === 2;
});
console.log(cropsFilter);
