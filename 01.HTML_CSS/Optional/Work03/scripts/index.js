const menuHome = () => {
  document.getElementById("contentFrame").setAttribute("src", "home.html");
  if (document.querySelector("#menuHome").classList.value == "navigation__item") {
    document.querySelector("#menuHome").classList.add("colorBlack");
    document.querySelector("#menuJukebox").classList.remove("colorBlack");
    document.querySelector("#menuGame").classList.remove("colorBlack");
  }
};
const menuJukebox = () => {
  document.getElementById("contentFrame").setAttribute("src", "jukebox.html");
  if (document.querySelector("#menuJukebox").classList.value == "navigation__item") {
    document.querySelector("#menuHome").classList.remove("colorBlack");
    document.querySelector("#menuJukebox").classList.add("colorBlack");
    document.querySelector("#menuGame").classList.remove("colorBlack");
  }
};
const menuGame = () => {
  document.getElementById("contentFrame").setAttribute("src", "game.html");
  if (document.querySelector("#menuGame").classList.value == "navigation__item") {
    document.querySelector("#menuHome").classList.remove("colorBlack");
    document.querySelector("#menuJukebox").classList.remove("colorBlack");
    document.querySelector("#menuGame").classList.add("colorBlack");
  }
};

// classList(클래스 리스트 추출)
