
let Movimentos;





function alignCards() {
    const cardSize = 34 + 117 + 2;
    const cardsByLine = Math.trunc(window.innerWidth / cardSize);
    const rowLength = cardsByLine * cardSize;
    const margin = Math.trunc((window.innerWidth - rowLength) / 2);
  
    const element = document.querySelector(".cards");
    element.style.margin = "auto " + margin + "px";
  }
  
  function updateMoves() {
    const moves = document.getElementById("moves");
    moves.innerHTML = "<p>Move: "+ Movimentos+ "</p>" ;
  }
  
  function updateTime() {
    const time = document.getElementById("time");
    time.innerHTML = "<p>Time: " + strTime() + "</p>";
  }






function strTime() {
    let seg = Time % 60;
    let min = Math.trunc(Time / 60);
  
    if (seg < 10) {
        seg = "0" + seg;
    }
  
    if (min < 10) {
        min = "0" + min;
    }
  
    return min + ":" + seg;
  }
  
  function startTime() {
    StartTime = new Date();
    setTimeout(partialTime, 1000);
  }
  
  function partialTime() {
    if(GameOver == false) {
        Time = Math.trunc((new Date() - StartTime) / 1000);
    
        updateTime();
        setTimeout(partialTime, 1000);
    }
  }
  
  function stopTime() {
    Time = Math.trunc((new Date() - StartTime) / 1000);
  }
  
  window.addEventListener("resize", function () {
    alignCards();
  });
  
  inicio ();