/**
 * 로또 번호 생성기: 사용자 인터페이스를 통해 로또 당첨 번호 및 로또 번호를 자동으로 생성하고 표시합니다.
 *
 * 기본 요구사항:
 * 1. 로또 당첨 번호 생성 기능:
 *    - '이번 주 당첨 번호 생성하기' 버튼을 클릭하면 1부터 45까지의 숫자 중 랜덤하게 6개를 선택하여 오름차순으로 표시합니다.
 *    - 중복된 숫자가 없어야 하며, 이전에 생성된 번호는 새 번호 생성 시 화면에서 제거됩니다.
 * 2. 로또 번호 자동 선택 기능:
 *    - '로또 번호 자동 생성' 버튼을 클릭하면 5세트의 로또 번호(각 세트는 6개의 숫자)를 랜덤하게 생성하여 표시합니다.
 *    - 각 번호 세트는 중복 없이 오름차순으로 정렬되어야 하며, 당첨 번호 생성 후에만 사용 가능해야 합니다.
 * 3. 매칭 표시 기능: 자동 생성된 번호 중 당첨 번호와 일치하는 숫자는 특별히 강조하여 표시합니다.
 *
 * 사용 예:
 * - 당첨 번호 생성하기 버튼 클릭 -> 당첨 번호가 화면에 표시됩니다.
 * - 로또 번호 자동 생성 버튼 클릭 -> 5세트의 로또 번호가 화면에 표시됩니다. 당첨 번호와 일치하는 숫자는 강조됩니다.
 */

const $generateWinningNumbers = document.getElementById('generateWinningNumbers');
const $generateLottoNumbers = document.getElementById('generateLottoNumbers');
const $winningNumContainer = document.getElementById('winningNumbers');
const $lottoNumContainer = document.getElementById('lottoNumbers');
let winningNumbers = [];
let randomNumbers = [[]];
/**
 * 1부터 45까지의 숫자 중에서 무작위로 6개의 숫자를 선택하여 배열로 반환하는 함수입니다.
 * 중복된 숫자가 없도록 하며, 반환된 배열은 오름차순으로 정렬됩니다.
 */
function generateNumbers() {
    lottoNumber = 0;
    winningNumbers = winningNumbers.filter(() => false);

    while (winningNumbers.length < 6) {
        lottoNumber = String(Math.floor(Math.random() * 45) + 1).padStart(2, '0');
        if (winningNumbers.includes(lottoNumber)) {
            continue;
        }
        winningNumbers.push(lottoNumber);
    }
    winningNumbers.sort((a, b) => {
        return a - b;
    });

    return winningNumbers;
}

/* TODO:
         1. 숫자 배열을 받아서 HTML 요소로 변환하여 반환하는 함수입니다.
         2. 각 숫자는 <span> 요소로 감싸지며, 당첨 번호와 일치하는 경우 특별한 스타일이 적용됩니다.
         3. 매개변수에 대한 설명
           - numbers - 표시할 숫자의 배열
           - winningNumbers - 당첨 번호 배열 (선택 사항)
       */
function displayNumbers(numbers, winningNumbers = []) {
    if ($winningNumContainer.childNodes.length === 6) {
        numbers.forEach((item, index) => {
            const $winningNumber = document.querySelectorAll('.winningNumber');
            $winningNumber[index].innerText = item;
        });
        return;
    }
    numbers.forEach((item) => {
        const $span = document.createElement('span');
        $span.classList.add('winningNumber');
        $span.innerText = item;
        $winningNumContainer.appendChild($span);
    });
    $generateLottoNumbers.disabled = false;
}

$generateWinningNumbers.addEventListener('click', () => {
    /* TODO:
         - '이번 주 당첨 번호 생성하기' 버튼 클릭 시 실행되는 이벤트 핸들러입니다.
         - generateNumbers 함수를 호출하여 당첨 번호를 생성하고, 이를 화면에 표시합니다.
         - 이전에 표시된 당첨 번호가 있다면, 화면에서 제거한 후 새로운 당첨 번호를 표시합니다.
       */

    generateNumbers();
    displayNumbers(winningNumbers, 'test');
});

$generateLottoNumbers.addEventListener('click', () => {
    randomNumbers = randomNumbers.filter(() => false);
    while (randomNumbers.length < 5) {
        randomNumbers.push(generateNumbers());
    }

    if ($lottoNumContainer.childNodes.length === 30) {
        let pow = 0;
        randomNumbers.forEach((arr) => {
            arr.forEach((item, index) => {
                const $winningNumber = document.querySelectorAll('.winningNumber');
                const $randomNumber = document.querySelectorAll('.randomNumber');
                $randomNumber[pow + index].innerText = item;
                $randomNumber[pow + index].innerText === $winningNumber[index].innerText
                    ? ($randomNumber[pow + index].style.color = '#ff2a00')
                    : ($randomNumber[pow + index].style.color = 'white');
            });
            pow += 6;
        });

        return;
    }
    randomNumbers.forEach((item) => {
        for (let i = 0; i < item.length; i++) {
            const $randomNumber = document.createElement('span');
            $randomNumber.innerText = item[i];
            $randomNumber.classList.add('randomNumber');
            $lottoNumContainer.appendChild($randomNumber);
        }
    });
});
