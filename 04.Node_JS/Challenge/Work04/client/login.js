// 'loginForm' ID를 가진 HTML 요소에서 'submit' 이벤트가 발생하면 아래 함수를 실행합니다.
document.getElementById('loginForm').addEventListener('submit', function (event) {
    // 기본 이벤트 동작을 방지하여 페이지가 새로고침되는 것을 막습니다.
    event.preventDefault();

    // 사용자 이름과 비밀번호 입력 필드를 DOM에서 가져옵니다.
    const username = document.getElementById('username');
    const password = document.getElementById('password');

    // 사용자 이름과 비밀번호가 'admin'과 'password'인지 확인합니다.
    if (username.value === 'admin' && password.value === 'password') {
        // 조건이 참일 경우, 로그인을 시도하기 위해 서버에 POST 요청을 보냅니다.
        fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username.value }), // JSON 형식의 데이터를 요청 본문에 포함시킵니다.
        })
            .then((response) => response.json()) // 서버로부터 받은 응답을 JSON으로 변환합니다.
            .then((data) => {
                // JSON 응답에서 accessToken을 추출합니다.
                const accessToken = data.accessToken;

                // accessToken을 사용하여 'posts' 엔드포인트에 GET 요청을 보냅니다.
                fetch('http://localhost:4000/posts', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // 요청 헤더에 인증 토큰을 포함시킵니다.
                    },
                })
                    .then((response) => response.json()) // 서버로부터 받은 응답을 JSON으로 변환합니다.
                    .then((posts) => {
                        // 'postsList' ID를 가진 요소를 DOM에서 찾습니다.
                        const postsList = document.getElementById('postsList');
                        postsList.innerHTML = ''; // 기존에 게시된 게시물 목록을 비웁니다.
                        // 서버로부터 받은 게시물 배열을 반복하면서 각 게시물을 목록에 추가합니다.
                        posts.forEach((post) => {
                            const li = document.createElement('li'); // 'li' 요소를 생성합니다.
                            li.classList.add('post-item'); // 'li' 요소에 클래스를 추가합니다.
                            const idSpan = document.createElement('span'); // 게시물 ID를 표시할 'span' 요소를 생성합니다.
                            idSpan.classList.add('post-id'); // ID를 위한 'span'에 클래스를 추가합니다.
                            idSpan.textContent = `${post.id}`; // ID를 텍스트로 설정합니다.
                            const usernameSpan = document.createElement('span'); // 사용자 이름을 표시할 'span'을 생성합니다.
                            usernameSpan.classList.add('post-username'); // 사용자 이름을 위한 'span'에 클래스를 추가합니다.
                            usernameSpan.textContent = `${post.username}`; // 사용자 이름을 텍스트로 설정합니다.
                            const postContentSpan = document.createElement('span'); // 게시물 내용을 표시할 'span'을 생성합니다.
                            postContentSpan.classList.add('post-content'); // 게시물 내용을 위한 'span'에 클래스를 추가합니다.
                            postContentSpan.textContent = `${post.post}`; // 게시물 내용을 텍스트로 설정합니다.
                            li.appendChild(idSpan); // 'li' 요소에 ID 'span'을 추가합니다.
                            li.appendChild(postContentSpan); // 'li' 요소에 내용 'span'을 추가합니다.
                            li.appendChild(usernameSpan); // 'li' 요소에 사용자 이름 'span'을 추가합니다.
                            postsList.appendChild(li); // 완성된 'li' 요소를 게시물 목록에 추가합니다.
                        });
                        const h2 = document.querySelector('h2'); // 페이지의 'h2' 요소를 찾습니다.
                        postsList.classList.remove('hide'); // 게시물 목록을 보이게 합니다.
                        h2.classList.add('hide'); // 'h2' 요소를 숨깁니다.
                        username.value = ''; // 사용자 이름 입력 필드를 비웁니다.
                        password.value = ''; // 비밀번호 입력 필드를 비웁니다.
                    });
            });
    } else {
        // 사용자 이름과 비밀번호가 일치하지 않는 경우, 경고 메시지를 표시합니다.
        alert('아이디와 비밀번호를 확인하세요.');
    }
});
