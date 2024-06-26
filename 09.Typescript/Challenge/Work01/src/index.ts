interface TypeTest {
    string: string;
    number: number;
    boolean: boolean;
    null: null;
    any: any;
}

const 글자: TypeTest['string'] = '글자';
const 숫자: TypeTest['number'] = 1;
const 불: TypeTest['boolean'] = true;
const 눌: TypeTest['null'] = null;
const 애니: TypeTest['any'] = '아무거나';

console.log(글자, 숫자, 불, 눌, 애니);
