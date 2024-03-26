function textGameStart() {
  let myWord = document.getElementById("myWord").value;
  let word = document.getElementById("word").innerText;

  let lastWord = word[word.length - 1];
  let firstWord = myWord[0];

  if (firstWord === lastWord) {
    document.getElementById("result").innerText = "정답!";
    document.getElementById("word").innerText = myWord;
    document.getElementById("myWord").value = "";
  } else {
    document.getElementById("result").innerText = "오답!";
    document.getElementById("myWord").value = "";
  }
}

function lottoGameStart() {
  let arr = [];
  for (let i = 0; i < 6; i++) {
    arr.push(String(Math.floor(Math.random() * 45) + 1));
    console.log(arr);
  }
  document.getElementById("lotto1").innerText = arr[0];
  document.getElementById("lotto2").innerText = arr[1];
  document.getElementById("lotto3").innerText = arr[2];
  document.getElementById("lotto4").innerText = arr[3];
  document.getElementById("lotto5").innerText = arr[4];
  document.getElementById("lotto6").innerText = arr[5];
}
