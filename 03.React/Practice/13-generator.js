function* fn() {
    try {
        console.log(1);
        yield 1;
        console.log(2);
        console.log(3);
        yield 2;
        console.log(4);
        yield 3;
    } catch (error) {
        console.log(error);
    }
    return '완료';
}

const a = fn();
a.next(); //작동 X
a.throw('에러 발생'); //Error: 에러 발생
a.next(); //undefined, done:false;

function* world() {
    console.log('world');
    yield 1;
}
function* hello() {
    console.log('h');
    console.log('e');
    console.log('l');
    console.log('o');
    console.log('o');
    yield* world();
}

const c = hello();
a.next(); //h,e,l,l,o 'world'

function* prom() {
    const num1 = yield '첫번째 숫자';
    console.log(num1);

    const num2 = yield '두번째 숫자';
    console.log(num2);

    return num1 + num2;
}

const f = prom();
f.next(3); //3 done:false;
f.next(6); //6 done:false;
f.next(); //9, done:true;
