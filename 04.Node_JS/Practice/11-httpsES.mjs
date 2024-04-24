import { send } from './11-requestES.mjs';
import { read } from './11-responseES.mjs';

function makeRequest(url, data) {
    //요청을 보내기
    send(url, data);

    //데이터 Return
    return read(data);
}

const response = makeRequest('https://naver.com', 'Data');
console.log(response);

//https 통신방식의 구현
//요청 -> 암호화 -> 복호화 -> 응답
