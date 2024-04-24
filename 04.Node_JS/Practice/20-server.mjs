import http from 'http';

const port = 4000;
const server = http.createServer((req, res) => {
    //서버가 생성이되고 내부에서 어떻게 처리할지

    //response 값
    res.writeHead(200, {
        'Content-Type': 'application/json',
    });
    res.end(
        JSON.stringify({
            a: 'a',
            b: 'b',
        })
    );
});

server.listen(port, () => {
    //port 지정, 서버 생성당시 콘솔 메세지
    console.log(`listening on port ${port}`);
});

//TODO application/json
//TODO text/plain
//TODO text/HTML
