// Json Javascript Object Notation, 문자열 데이터포맷
const meal = {
    what: '제육볶음',
    who: '혼자',
    when: '어제 저녁',
};
console.log(...meal.what);
console.log(...meal.who);
console.log(...meal.when);
// stringify, JSON형태 변환
const mealJson = JSON.stringify(meal);
console.log(mealJson);

// parse, 기본 형태 반환
const mealObject = JSON.parse(mealJson);
console.log(mealObject);
