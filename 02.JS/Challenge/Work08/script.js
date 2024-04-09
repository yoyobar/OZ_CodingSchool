//선택 과제 추가 달성목표 달성

//그외 추가목록
//1. alert대신 메세지박스 출현
//2. 주민등록번호의 타입 확인
//3. css추가

//개선할 점
//1. 객체로 관리했으면 코드가 더 깔끔했을듯
//2. if문 남발로 가독성이 문제있음. 다음에 개선해야할듯

// 1. table 대신 flexBox를 사용하여 요소들을 정렬해야 합니다.
// 2. 입력받아야 하는 정보와 사용할 요소는 아래와 같습니다.
//     - 이름: `input:text`
//     - 주민번호: `input:text` - `input:password`
//     - 아이디: `input:text`
//     - 비밀번호: `input:password`
//     - 비밀번호 확인: `input:password`
//     - 이메일: `input:text` + `select`
//     - 주소: `input:text`
//     - 성별: `input:radio`
//     - 개인정보 동의: `input:checkbox`
// 3. 모든 항목은 필수 입력 항목이어야 합니다.
// 4. 비밀번호와 비밀번호 확인이 일치하지 않는 경우, 알림창으로 유저에게 알려야 합니다.
// 5. 아이디는 4글자 이상, 8글자 이하로 입력해야 합니다. 그렇지 않을 경우 알림창으로 유저에게 알려야 합니다.
// 6. submit 이벤트가 발생했을 때 새로고침이 일어나지 않아야 합니다.
// 7. 회원가입 버튼을 클릭했을 때 콘솔창에 입력한 모든 정보가 출력되어야 합니다.

//선택과제 달성
//필수 입력 항목 달성
//비밀번호 미일치 항목 달성
//아이디 항목 달성
//새로고침 x
//콘솔창 반환 확인

//email검증 및 데이터분할 추가

const form = document.querySelector('.user-info');

function getUserInfo(name, ssn_front, ssn_back, username, password, emailId, mailbox, address, gender, agree) {
    const userInfo = {
        name: name,
        ssn: ssn_front + '-' + ssn_back,
        username: username,
        password: password,
        email: emailId + '@' + mailbox,
        address: address,
        gender: gender,
        agree: agree,
    };
    return userInfo;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let genderSelect = '';
    if (e.target[8].checked) genderSelect = e.target[8].value;
    if (e.target[9].checked) genderSelect = e.target[9].value;
    console.log(e.target[6].value);

    const data = {
        name: e.target[0].value,
        ssn: e.target[1].value,
        ssn_front: e.target[1].value.split('-')[0],
        ssn_back: e.target[1].value.split('-')[1],
        id: e.target[2].value,
        pw: e.target[3].value,
        pwc: e.target[4].value,
        address: e.target[5].value,
        email: e.target[6].value,
        emailNext: e.target[7].value,
        gender: genderSelect,
        checked: e.target[10].checked,
        certification: true,
    };
    if (informationCheck.call(data)) {
        informationChange.call(data);
    }
});

function informationCheck() {
    // 주민등록번호 검증
    if (!(this.ssn.length == 14 && this.ssn.includes('-'))) {
        this.certification = false;
        return alert('주민등록번호는 000000-0000000 형태로 보내야 합니다.');
    }

    // 아이디 검증
    if (this.id.length < 4 || this.id.length > 8) {
        this.certification = false;
        return alert('아이디는 4자이상, 8자이하여야 합니다.');
    }

    // 비밀번호 검증
    if (!(this.pw === this.pwc)) {
        this.certification = false;
        return alert('비밀번호가 서로 다릅니다.');
    }

    //이메일 검증
    if (this.emailNext === '이메일을 선택해주세요') {
        return alert('이메일을 선택해야 합니다.');
    }

    if (this.emailNext === '직접 입력' && this.email.includes('@')) {
        const splitEmail = this.email.split('@');
        this.email = splitEmail[0];
        this.emailNext = splitEmail[1];
    }
    this.certification = true;
    return this.certification;
}

function informationChange() {
    console.log(
        getUserInfo(
            this.name,
            this.ssn_front,
            this.ssn_back,
            this.name,
            this.pw,
            this.email,
            this.emailNext,
            this.address,
            this.gender,
            this.checked
        )
    );
}
