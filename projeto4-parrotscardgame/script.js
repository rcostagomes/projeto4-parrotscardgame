




function inicio() {
    Movimentos = 0;
    StartTime = 0;
    Time = 0;
    CanFlip = [];
    Compare = [];
    images = [];
    GameOver = false;
    CanSelect = true;
  
    const qntCards = totalCards();
    
    gerarCards(qntCards);
  
    updateMoves();
    updateTime();
  
    alignCards();
  } 
  
  function totalCards() {
    let qntCards = 0;
  
    while (qntCards < 4 || qntCards > 14 || qntCards % 2 !== 0) {
      qntCards = prompt("Digite um número de cartas par entre 4 e 14");
      qntCards = parseInt(qntCards, 10);
    }
  
    return qntCards;
  }
  
  function gerarCards(qntCards) {
    let cards = "";
    images = pegarIMGs(qntCards);
  
    for (let i = 0; i < qntCards; i++) {
      cards += `
        <div id="card${i}" class="card" onclick="virarCartas(this)" data-identifier="card">
          <div class="back appearance">
            <img src="img/back.png" data-identifier="back-face">
          </div>
          <div class="front appearance flip" data-identifier="front-face">
            <img src="img/front-${images[i]}.gif">
          </div>
        </div>
        `;
    }
  
    let element = document.getElementById("cards");
    element.innerHTML = cards;
  }
  
  function pegarIMGs(qntCards) {
    let count = 0;
    for (let i = 0; i < qntCards/2; i ++) {
      images.push(count);
      images.push(count);
      CanFlip.push(true);
      CanFlip.push(true);
      count++; 
    }
  
    return images.sort((a, b) => 0.5 - Math.random());
  }


function virarCartas(card) {
    const cardId = parseInt(card.id.replace("card", ""), 10);

    if(CanFlip[cardId] && CanSelect) {
        CanFlip[cardId] = false;
        Compare.push(cardId);

        Movimentos++;
        if(Movimentos == 1) {
            startTime();
        }
        
        flip(card);

        if(Compare.length == 2) {
            CanSelect = false;
            setTimeout(function(){compareCards()},  1000);
        }
    }
}

function compareCards() {
    if (images[Compare[0]] == images[Compare[1]]) {
        for (let i = 0; i < 2; i++) {
            card = document.querySelector("#card" + Compare[i]);
            card.querySelector(".front").classList.add("found");
        }
        validateEndGame();
    } else {
        for (let i = 0; i < 2; i++) {
            CanFlip[Compare[i]] = true;
            var card = document.querySelector("#card" + Compare[i]);
            flip(card);
        }
    }
    Compare = [];
    CanSelect = true;
}

function flip(card) {
    card.querySelector(".back").classList.toggle("flip");
    card.querySelector(".front").classList.toggle("flip");
}

function validateEndGame() {
  for (let i = 0; i < CanFlip.length; i++) {
      if (CanFlip[i]) {
          return;
      }
  }

  GameOver = true;

  stopTime();

  setTimeout(function(){endGame()}, 500);
}




function endGame() {
  alert("Vitória em " + Movimentos + " jogadas, em " + strTime() + " minutos");

  var restart = "";
  while (restart !== "s" && restart !== "S" && restart !== "Sim" && restart !== "sim" && restart !== "n" && restart !== "N") {
      restart = prompt("Jogar novamente? (s ou n)");
  }

  if (restart == "s" || restart == "S" || restart == "Sim" || restart == "sim") {
      inicio();
  }
}



