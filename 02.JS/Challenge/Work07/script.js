/* -----------------------------------------------------------------------------*/
// <요구사항>
// 1. input에 트윗을 입력하고 '게시'버튼을 누르면 트윗이 생성되어야 합니다.
// 2. 생성된 트윗은 게시글, 좋아요 버튼, 좋아요 카운트하는 요소를 포함해야 합니다.
// 3. input에 아무것도 입력되어 있지 않으면 트윗이 생성되지 않아야 합니다. (if문)
// 4. 좋아요 버튼을 클릭하면 좋아요 카운트가 1씩 증가해야 합니다.
// 5. styles.css 파일을 보고 새롭게 생성한 요소에 class를 추가하면 미리 작성해둔 스타일이 적용됩니다.
// 6. 스타일은 마음껏 수정해도 좋습니다.
/* -----------------------------------------------------------------------------*/

//global
const postTweet = document.querySelector('#postTweet');
const tweetInput = document.querySelector('#tweetInput');
const tweetsContainer = document.querySelector('#tweets_container');
const tweetAlertMsg = document.querySelector('.input-alert');
let tweetDb = [];

//input 버튼 이벤트
postTweet.addEventListener('click', function () {
    if (tweetInput.value.length === 0) {
        return tweetAlert();
    }
    tweetData();
    tweetDisplay();
    tweetInput.value = '';
});
//input 엔터키 이벤트, form 태그를 사용해서 처리해도 되나, 여기선 엔터키로 연습
tweetInput.addEventListener('keyup', function (e) {
    if (tweetInput.value.length === 0) {
        return tweetAlert();
    }
    if (e.key === 'Enter') {
        tweetData();
        tweetDisplay();
        tweetInput.value = '';
    }
});

//좋아요 버튼과 각각의 like와의 관계를 알기위해 작성
function tweetData() {
    const buttonData = {
        value: tweetInput.value,
        id: tweetDb.length,
        like: 0,
    };
    tweetDb.push(buttonData);
    tweetSave();
}

//Db의 값을 기준으로 HTML을 초기화하고, Db의 값을 기준으로 재생성
function tweetDisplay() {
    tweetsContainer.innerHTML = '';
    tweetDb.forEach((aTweet) => {
        const tweet = document.createElement('tweet');
        const tweetText = document.createElement('div');
        const tweetLikeBtn = document.createElement('button');
        const tweetLikeCnt = document.createElement('div');
        tweet.classList.add('tweet');
        tweetText.classList.add('tweet-text');
        tweetLikeBtn.classList.add('like-button');
        tweetLikeCnt.classList.add('like-counter');
        tweetText.innerText = aTweet.value;
        tweetLikeBtn.innerText = '좋아요';
        tweetLikeCnt.innerText = aTweet.like;

        //생성
        tweetsContainer.append(tweet);
        tweet.append(tweetText);
        tweet.append(tweetLikeBtn);
        tweet.append(tweetLikeCnt);

        //Event 처리
        tweetLikeBtn.addEventListener('click', () => {
            tweetLikePlus(aTweet.id);
        });
    });
}

//input 알림 처리
function tweetAlert() {
    if (tweetInput.value.length === 0) {
        tweetAlertMsg.style.visibility = 'visible';
    }
}
//input 내용 처리
tweetInput.addEventListener('keyup', (e) => {
    if (e.target.value.length > 0) {
        tweetAlertMsg.style.visibility = 'hidden';
    }
});

//좋아요 처리
function tweetLikePlus(id) {
    const counterId = document.querySelectorAll('.like-counter')[id];
    tweetDb = tweetDb.map((aTweet) => {
        if (id === aTweet.id) {
            return {
                ...aTweet,
                like: aTweet.like + 1,
            };
        } else {
            return {
                ...aTweet,
            };
        }
    });
    tweetDisplay();
    tweetSave();
}

//localStorage SetItem 처리
function tweetSave() {
    const saveData = JSON.stringify(tweetDb);
    localStorage.setItem('tweet', saveData);
}
//localStorage GetItem 처리
function tweetLoad() {
    const loadData = JSON.parse(localStorage.getItem('tweet'));

    if (loadData === null || undefined) {
        return;
    } else {
        tweetDb = loadData;
        tweetDisplay();
    }
}
//localStorage Event
document.addEventListener('DOMContentLoaded', () => {
    tweetLoad();
});
