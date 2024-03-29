// 이벤트 핸들링
const form = document.getElementById("form");

addEventListener("submit", function (event) {
  event.preventDefault();
  //   event.target.name.value 숙지!!
  //    위치.appendChild(대상); 기억하기
  //  위치.createElement("속성") 기억하기
  let userId = event.target.id.value;
  let userPw1 = event.target.pw1.value;
  let userPw2 = event.target.pw2.value;
  let userName = event.target.name.value;
  let userPhone = event.target.phone.value;
  let userPosition = event.target.position.value;
  let userGender = event.target.gender.value;
  let userEmail = event.target.email.value;
  let userIntro = event.target.intro.value;

  // 입력 값에 문제가 있을 경우 감지
  if (userId.length < 6) {
    alert("아이디가 너무 짧습니다. 6자이상 입력해 주세요");
    return;
  }
  if (userPw1 !== userPw2) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }
  //   가입 환영 인사 제공
  document.body.innerHTML = "";
  this.document.write(`
  <p>${userId}님 어서오세요</p><br>
  <p>회원가입시 입력하신 내용은 다음과 같습니다.</p><br>
  <p>아이디: ${userId}</p><br>
  <p>이름: ${userName}</p><br>
  <p>전화번호: ${userPhone}</p><br>
  <p>원하는직무: ${userPosition}</p><br>
  <p>성별: ${userGender}</p><br>
  `);
});
