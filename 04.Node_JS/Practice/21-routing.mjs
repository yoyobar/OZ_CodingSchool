import http from 'http';

const port = 4000;
const targetObject = { a: 'a', b: 'b' };
const server = http.createServer((req, res) => {
    //? POST 분기처리
    if (req.method === 'POST' && req.url === '/home') {
        //? 데이터를 받아서 처리,
        req.on('data', (data) => {
            //? 해쉬 형태로 데이터가 전송됨, String 변환
            const stringifyData = data.toString();

            //? json 객체 형태로 데이터 변환
            const jsonData = JSON.parse(stringifyData);
            Object.assign(targetObject, jsonData);

            console.log('json data is coming');
        });
    } else {
        //? 라우팅은 request임
        if (req.url === '/home') {
            res.writeHead(200, {
                'Content-Type': 'application/json',
            });
            res.end(JSON.stringify(targetObject));
        } else if (req.url === '/about') {
            res.setHeader('Content-Type', 'text/html');
            res.write('<html>');
            res.write('<body>');
            res.write('<h1> About Page </h1>');
            res.write('</body>');
            res.write('</html>');
            res.end();
        } else {
            res.statusCode = 404; // 여기서 수정
            res.end();
        }
    }
});

server.listen(port, () => {
    console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});

//! fetch 활용해서 데이터 전송
fetch('http://localhost:4000/home', {
    method: 'POST',
    body: JSON.stringify({ c: 'c' }),
});
