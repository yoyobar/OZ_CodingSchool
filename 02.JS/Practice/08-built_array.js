const vos = ['박지헌', '최현준', '김경록'];
console.log(vos[0]);
console.log(vos[1]);
console.log(vos[2]);

// 요소 추가
vos.push('test');
console.log(vos);

// 요소 제거
vos.pop();
console.log(vos);

// 요소 유무 확인
console.log(vos.indexOf('최현준'));

// 요소의 위치로 부터 지움, 본인 포함, 뒤에 내용 채우기 가능
// vos.splice(0, 2);
// console.log(vos);
vos.splice(0, 3, '지헌', '현준', '경록');
console.log(vos);

// 배열의 개별 요소에 대해 콜백
vos.forEach(function (i) {
    console.log('호출 테스트 : ' + i);
});

// 요소의 길이 확인
console.log(vos.length);
