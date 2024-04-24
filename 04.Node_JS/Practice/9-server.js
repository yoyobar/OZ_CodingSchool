const http = require('http');

//포트 설정
const port = 3000;

//서버 데이터 생성
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Hello World</h1>');
});

//서버 실행
server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});

// TODO: 기능개발 유지
