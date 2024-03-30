// 객체 생성은 보통 대문자로
const Dog = function (name, breed) {
    this.name = name;
    this.breed = breed;
};

const myDog1 = new Dog('바둑이', '진돗개');
const myDog2 = new Dog('하나코', '시바견');
const myDog3 = new Dog('마르코', '셰퍼드');
console.log(myDog1.name);
console.log(myDog2.name);
console.log(myDog3.name);

function BestSinger(name, member) {
    this.name = name;
    this.member = member; //속성
    this.singing = function () {
        //메서드
        return console.log(`${name} 노래를 부릅니다.`);
    };
}

const singer = new BestSinger('나', '나,나,나');
console.log(singer.name);
console.log(singer.member);
singer.singing();

// 자바 스크립트 내 존재하지않는 형태의 함수와 메서드를 생성함
