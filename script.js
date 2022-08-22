/*let cartas = ["1.gif", "2.gif", "3.gif", "4.gif", "5.gif", "6.gif", "7.gif"];
let qtdeCartas = "";
let i = 0;
//let carta;

function verificaCartas() {
  while (qtdeCartas < 4 || qtdeCartas > 14 || qtdeCartas % 2 !== 0) {
    qtdeCartas = prompt("Digite a Quantidade de cartas");
  }
  while (i < qtdeCartas) {
    i++;
    cartas.push(i);
  }
  console.log(cartas);
}
verificaCartas();
function teste(){
    elemento = document.querySelector('h1');
    elemento.innerHTML = "Testando "}
*/

(function () {
  let matches = 0;
  let images = [];
  let clics = 0;

  let flippedCards = [];

  let wins = document.querySelector("#wins");
  console.log(images);

  for (let i = 0; i < 14; i++) {
    let img = {
      src: "/img/" + i + ".gif",
      id: i % 7
    };
    images.push(img);
  }
  starGame();

  function starGame() {
    matches = 0;
    clics = 0;
    flippedCards = [];
    images = randomsort(images);

    let frontFaces = document.getElementsByClassName("front");
    let backFaces = document.getElementsByClassName("back");

    for (let i = 0; i < 14; i++) {
      frontFaces[i].classList.remove("flipped");
      backFaces[i].classList.remove("flipped");

      let card = document.querySelector("#card" + i);
      card.style.left = i % 7 === 100 ? 5 + "px" : (i % 7) * 165 + 5 + "px";
      card.style.top = i < 7 ? 5 + "px" : 250 + "px";

      card.addEventListener("click", flipCard, false);
      clics++;

      frontFaces[i].style.background =
        "url('" + images[i].src + "')no-repeat top/contain";
      frontFaces[i].setAttribute("id", images[i].id);
      // console.log(frontFaces[i].id)
    }
    wins.style.zIndex = -2;
    wins.removeEventListener("click", starGame, false);
  }

  function randomsort(oldOrdem) {
    let newOrdem = [];

    while (newOrdem.length != oldOrdem.length) {
      let i = Math.floor(Math.random() * oldOrdem.length);
      if (newOrdem.indexOf(oldOrdem[i]) < 0) {
        newOrdem.push(oldOrdem[i]);
      }
    }

    return newOrdem;
  }

  function flipCard() {
    if (flippedCards.length < 2) {
      let faces = this.getElementsByClassName("face");

      if (faces[0].classList.length > 2) {
        return;
      }

      faces[0].classList.toggle("flipped");
      faces[1].classList.toggle("flipped");

      flippedCards.push(this);

      if (flippedCards.length === 2) {
        if (
          flippedCards[0].childNodes[3].id === flippedCards[1].childNodes[3].id
        ) {
          matches++;

          flippedCards = [];

          if (matches === 7) {
            winsGame();
          }
        }
      }
    } else {
      flippedCards[0].childNodes[1].classList.toggle("flipped");
      flippedCards[0].childNodes[3].classList.toggle("flipped");
      flippedCards[1].childNodes[1].classList.toggle("flipped");
      flippedCards[1].childNodes[3].classList.toggle("flipped");

      flippedCards = [];
    }
  }

  function winsGame() {
    wins.style.zIndex = 10;

    alert(`você venceu o jogo com ${clics} rodadas`);
    wins.addEventListener("click", starGame, false);
  }
})();
