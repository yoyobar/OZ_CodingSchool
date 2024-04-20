//api request
const apiRandomDogs = 'https://dog.ceo/api/breeds/image/random/42';
const apiAllBreeds = 'https://dog.ceo/api/breeds/list/all';
//global
const $header = document.getElementById('header');
const $main = document.getElementById('main');
const $input = document.getElementById('filter-text');
const $button = document.getElementById('filter-button');
const $select = document.getElementById('filter-select');
const $more = document.getElementById('more');
const $top = document.getElementById('top');
const $reset = document.getElementById('reset');
//list
let currentDogs = [];
//status
let stat = false;

//api 랜덤요청
const apiRequestRandom = () => {
    stat = !stat;
    if (stat) {
        fetch(apiRandomDogs)
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                return json.message;
            })
            .then((arr) => {
                $main.innerHTML = '';
                arr.forEach((item) => {
                    currentDogs.push(item);
                });
                currentDogs.forEach((item) => {
                    const $dogImgDiv = document.createElement('div');
                    $dogImgDiv.classList.add('flex-item');
                    $dogImgDiv.innerHTML = `<img src=${item}>`;
                    $main.appendChild($dogImgDiv);
                });
                stat = false;
            })
            .catch((rej) => {
                throw new Error(rej);
            });
    } else {
        return alert('현재 로딩중 입니다.');
    }
};
//api 리스트 정렬
const apiRequestList = () => {
    fetch(apiAllBreeds)
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            return json.message;
        })
        .then((arr) => {
            const data = Object.keys(arr);
            data.forEach((item) => {
                const $option = document.createElement('option');
                $option.textContent = item;
                $option.value = item;
                $select.appendChild($option);
            });
        });
};

window.addEventListener('DOMContentLoaded', () => {
    $main.innerHTML = `<div class='loading'>로딩중...</div>`;
    apiRequestRandom();
    apiRequestList();
});

//filter function
const filterFunc = (value) => {
    const filteredDog = currentDogs.filter((item) => {
        return item.indexOf(value) !== -1;
    });

    filteredDog.forEach((item) => {
        const $dogImgDiv = document.createElement('div');
        $dogImgDiv.classList.add('flex-item');
        $dogImgDiv.innerHTML = `<img src=${item}>`;
        $main.appendChild($dogImgDiv);
    });
};

//input filter
$button.addEventListener('click', () => {
    $main.innerHTML = '';
    filterFunc($input.value);
});
//select filter
$select.addEventListener('change', (e) => {
    $main.innerHTML = '';
    filterFunc(e.target.value);
});
//more event
$more.addEventListener('click', () => {
    apiRequestRandom();
});
//top event
$top.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});
//reset event
$reset.addEventListener('click', () => {
    currentDogs = [];
    $input.value = '';
    $select.value = '';
    apiRequestRandom();
});
