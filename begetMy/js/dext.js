const gameField = document.querySelector('.game');
const startBtn = document.querySelector('.start-btn');
const lifeBlock = document.querySelector('#life__bar');
const lifes = document.querySelectorAll('[data-heart]');
const score = document.getElementsByClassName('game__score');
const winScreen = document.querySelector('.win');
let timerEl = document.getElementsByClassName('game__timer');
let targets = document.querySelectorAll('._targets');
let scoreCount = 0;
let life = 3;
const targetsSrc = [
  'img/dext/1.png',
  'img/dext/2.png',
  'img/dext/3.png',
  'img/dext/4.png',
  'img/dext/5.png',
];




function rndInt(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
let k = 0;

//Targets appear by time
function newTargetByTime() { 
    k = 0;
    for (let i = 0;i < targets.length; i++) {
      if (targets[i].dataset.hit == 'b') k++;
    }
    if (k < 4) {
      let trgTmp;
      for (let i = 0;i < targets.length; i++) {
        if (targets[i].dataset.hit == 'a') {
          trgTmp = targets[i];
          break;
        }
      }
      trgTmp.classList.remove('_hitted');
      trgTmp.dataset.hit = 'b';
      trgTmp.style.top = rndInt(0, (gameField.offsetHeight - 90)) + 'px';
      move (trgTmp);
    }  
  if (k < 4 && life > 0) setTimeout(newTargetByTime, rndInt(500, 3000));
}


//Start btn
startBtn.addEventListener('click', startGame);


//Game fnc
function startGame() {
  timer();
  newTargetByTime();
  startBtn.classList.add('_hide');
  lifeBlock.classList.remove('_hide');
  timerEl[0].classList.remove('_hide');
  score[0].classList.remove('_hide');
  gameField.addEventListener('mousedown', hit);
}

//Hit
function hit(ev) {

  console.log(ev.target);

  if (ev.target.classList.contains('_targets')) {
    ev.target.classList.add('_hitted');
    ev.target.dataset.hit = 'a';
    scoreCount++
    score[0].innerHTML = scoreCount;
    if (k < 4 && life > 0) setTimeout(newTargetByTime, rndInt(500, 3000));

  }
}

//Timer!
function timer() {
  let sec = 0;
  let minutes = 0;
  timerInterval = setInterval(() => {
    if (sec > 59) {
      sec = 0;
      minutes++;
    }
    timerStr = '';
    if (sec < 10) {
      timerStr = minutes + ':0' + sec;
    } else { timerStr = minutes + ':' + sec }

    if (minutes < 1) {
      timerEl[0].innerText = timerStr;
    } else {
      timerEl[0].innerText = timerStr;
    }
    sec++;    
  }, 1000);
  return timerInterval;
}


//Play interval
function move (targ) {
  let spd = 0;
  let spdModif = rndInt(2,7);
  moveTime();
  function moveTime() {
    if (life == 0) {
      endGame();
    }
    if (targ.dataset.hit == 'b' && spd < gameField.offsetWidth) {
      targ.style.left = spd + 'px';
      spd += spdModif;
      setTimeout(moveTime, 10);
    } else if (targ.dataset.hit == 'a') {
      targ.style.left = 0;
      targ.classList.add('_hitted');
      spd = 0;
      targ.dataset.hit = 'a';
    } else if (spd > (gameField.offsetWidth - 15)) {
      targ.style.left = 0;
      targ.classList.add('_hitted');
      spd = 0;
      targ.dataset.hit = 'a';
      if (life > 0) {
        let nextLife = lifeBlock.firstElementChild;
        lifeBlock.removeChild(nextLife);
      }
      life--;
    }
    
  }
}

//Endgame func  Доделать
function endGame () {
  clearInterval(timerInterval);
  winScreen.innerHTML = `<p> Счёт: ${scoreCount}<br> Время: ${timerStr}</p>`
  winScreen.classList.remove('_hide');
}