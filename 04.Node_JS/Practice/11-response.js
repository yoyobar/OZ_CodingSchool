//복호화
function decrypt(data) {
    return 'decrypted data';
}

//응답 --> 복호화

//응답
function read() {
    return decrypt('data');
}

// 모듈 캐싱, 로드될때 실행됨, 한번만 실행됨
// 모든 모듈에서 가져오려할때마다 실행되지 않음
// console.log('we are in the response module');

module.exports = { read };
