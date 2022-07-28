const textField = document.querySelector('[data-out]');
const gameInput = document.querySelector('[data-game-input]');
let counterEl, timer, timerEl;
let totalWords = 0;
const player = {
  error: 0,
  words: 0,
  sec: 0,
  min: 0,
}

function test() {
  clearInterval(timer)
}

textField.addEventListener('click', test);
gameInput.addEventListener('input', checkInput);
gameInput.addEventListener('focus', () => {
  gameInput.setAttribute('placeholder', '');

  timer = setInterval(() => {
    let sec, min = ''
    
    if (player.sec < 60) {
      player.sec++;
    } else {
      player.min++;
      player.sec = 0;
    }

    if (player.sec < 10) sec = '0' + player.sec;
    if (player.sec >= 10) sec = player.sec;
    if (player.min < 10) min = '0' + player.min;
    if (player.min >= 10) min = player.min;
    

    timerEl.textContent = `${min}:${sec}`
    
  }, 1000)
}, {once: true});

function checkInput(e) {
  gameInput.classList.remove('wrong');
  let val = this.value;
  let word = getActiveEl().textContent;

  if (word + ' ' === val) {
    nextWord();
    gameInput.value = '';
    return
  }

  // ОШИБКА
  if (!word.startsWith(val)) {
    gameInput.classList.add('wrong');
    player.error++
    return
  }

  if (val === word && getActiveEl().dataset.order == totalWords) {
    counterEl.textContent = ++player.words;
    endGame();
    return
  }

  markEntered(val);

}

function nextWord() {
  let currEl = getActiveEl();
  let nextEl = currEl.nextElementSibling;
  if (nextEl.classList.contains('counter')) {
    counterEl.textContent = ++player.words;
    endGame();
    return false; //TODO: endgame
  }
  if (!nextEl) return false; //TODO: endgame
  currEl.innerHTML = currEl.textContent;

  currEl.classList.remove('active_word');
  nextEl.classList.add('active_word');
  counterEl.textContent = ++player.words;
}

function markEntered(val) {
  let currEl = getActiveEl();
  let endText = currEl.textContent.slice(val.length);

  currEl.innerHTML = `<mark>${val}</mark>` + endText;
}

function getActiveEl() {
  return textField.querySelector('.active_word');
}

function init() {
  gameInput.value = '';
  let text = textField.textContent;
  text = text.trim();
  textField.innerHTML = '';
  let words = text.split(' ');
  totalWords = words.length;

  for (let i = 0; i < words.length; i++) {
    const el = words[i];
    const span = document.createElement('span');
    const space = document.createTextNode(' ');

    
    span.dataset.order = i + 1;
    span.textContent = el;
    if (i === 0) {
      span.classList.add('active_word')
    }
    textField.append(span, space);
  }

  let div = document.createElement('div')
  timerEl  = document.createElement('div')
  counterEl = document.createElement('span')
  let span2 = document.createElement('span')

  div.classList.add('counter')
  timerEl.classList.add('timer')
  timerEl.textContent = '00:00'
  counterEl.textContent = player.words
  span2.textContent = ' / ' + totalWords
  div.append(counterEl, span2)
  textField.append(div, timerEl)
}

function endGame() {
  document.querySelector('.end_time').textContent = timerEl.textContent;
  document.querySelector('.end_error').textContent = player.error;
  document.querySelector('.end_word').textContent = totalWords;
  document.querySelector('.modal').classList.add('on');
  let currEl = getActiveEl();
  currEl.innerHTML = currEl.textContent;
  currEl.classList.remove('active_word');
  clearInterval(timer)
}
init()