// Назначаем константы
const wsServerUrl = 'ws://localhost:16969'
// const wsServerUrl = 'ws://hommy.b96087jw.beget.tech:16969'

const popup = document.querySelector('.popup');
const gameWrap = document.querySelector('.game__wrap');
const modal = document.querySelector('.modal');
// const testBtn = document.querySelector('.test_btn');
const startBtn = document.querySelector('.modal__btn--start');
let ws
let player
let oponent
let turn = false
let game = true
let board = []

//слушатели
// testBtn.addEventListener('click', test)
startBtn.addEventListener('click', findVersus, {once: true})

//Функции
function start() {
  //Вставляем ячейки в поле
  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
      let cell = document.createElement('div')
      cell.classList.add('cell')
      cell.dataset.x = i
      cell.dataset.y = j
      cell.dataset.player
      gameWrap.append(cell)
    }
    board.push(['', '', ''])
  }
}

function findVersus() {
  this.classList.add('find')
  ws = new WebSocket(wsServerUrl);

  ws.onopen = e => {
    const data = JSON.stringify({type: 'greeting', data: `ping`});
    ws.send(data);
  };

  ws.onmessage = event => {
    const data = JSON.parse(event.data)

    switch (data.type) {
      //Пинг
      case 'greeting':
        showPopup(data.data)
        break;

      case 'message':
        showPopup(data.data)
        break;
      
      case 'start':
        player = data.data
        startGame();
        break;
        
        case 'step':
          let stepInfo = data.data;
          if (stepInfo.player !== player) turn = true
          drawStep(stepInfo)
          isWin()
          break;
          
        case 'close':
          showPopup('Опонент покинул игру', 4000)
          clearGame()
          break;

      default:
        break;
    }
  };
  
  ws.onclose = function(event) {
    if (event.wasClean) {
      console.log(`[close] Соединение закрыто чисто, код=${event.code}`);
    } else {
      console.log('[close] Соединение прервано');
    }
  };
  
  ws.onerror = function(error) {
    console.log(`[error] ${error.message}`);
  };
}

function startGame() {
  modal.classList.add('hide')
  startBtn.classList.remove('find')
  if (player === 1) {
    player = 'x'
    oponent = 'o'
    turn = true
  }
  else {
    player = 'o'
    oponent = 'x'
  }

  gameWrap.addEventListener('click', handleCellClick)
}

function handleCellClick(e) {
  if (!turn || !game) return false
  let cell = e.target
  if (cell.dataset.player && cell.dataset.player !== '') return false;
  cell.textContent = player;
  cell.dataset.player = player;
  let stepInfo = {x: cell.dataset.x, y: cell.dataset.y, player: player}

  let message = JSON.stringify({type: 'step', data: stepInfo})
  ws.send(message)
  turn = false
  addToBoard(stepInfo)
  // isWin()
}

function drawStep(stepInfo) {
  let activeCell = gameWrap.querySelector(`[data-x="${stepInfo.x}"][data-y="${stepInfo.y}"]`);
  activeCell.dataset.player = stepInfo.player
  activeCell.textContent = stepInfo.player
  addToBoard(stepInfo)
}

function addToBoard(stepInfo) {
  board[stepInfo.x - 1][stepInfo.y - 1] = stepInfo.player
}

function isWin() {
  let i = 0;
  board.forEach(el => {
    if (el.every(elem => elem === player)) win(player, i);
    if (el.every(elem => elem === oponent)) win(oponent, i);
    i++
  })

  if (board[0][0] === player && board[1][1] === player && board[2][2] === player) win(player, 3)
  if (board[0][2] === player && board[1][1] === player && board[2][0] === player) win(player, 4)
  if (board[0][0] === oponent && board[1][1] === oponent && board[2][2] === oponent) win(oponent, 3)
  if (board[0][2] === oponent && board[1][1] === oponent && board[2][0] === oponent) win(oponent, 4)

  for (let i = 0; i <= 2; i++) {
    if (board[0][i] === '' || board[1][i] === '' || board[2][i] === '') continue
    if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) win(board[0][i], i + 5)
  }
  //TODO:ничья
  let rowCount = 0
  board.forEach(el => {
    if (el.every((val) => val !== '')) rowCount++
  })
  if (rowCount === 3) win('Ничья :Р', 99)
}

function win(winner, line) {
  game = false
  let winCells = []
  if (line < 3) {
    winCells = [...gameWrap.querySelectorAll(`[data-x="${line + 1}"]`)]
  } else if (line === 3) {
    let winCell1 = gameWrap.querySelector(`[data-x="1"][data-y="1"]`)
    let winCell2 = gameWrap.querySelector(`[data-x="2"][data-y="2"]`)
    let winCell3 = gameWrap.querySelector(`[data-x="3"][data-y="3"]`)
    winCells.push(winCell1, winCell2, winCell3)
  } else if (line === 4) {  
    let winCell1 = gameWrap.querySelector(`[data-x="1"][data-y="3"]`)
    let winCell2 = gameWrap.querySelector(`[data-x="2"][data-y="2"]`)
    let winCell3 = gameWrap.querySelector(`[data-x="3"][data-y="1"]`)
    winCells.push(winCell1, winCell2, winCell3)
  } else if (line === 5) {
    winCells = [...gameWrap.querySelectorAll(`[data-y="1"]`)]
  } else if (line === 6) {
    winCells = [...gameWrap.querySelectorAll(`[data-y="2"]`)]
  } else if (line === 7) {
    winCells = [...gameWrap.querySelectorAll(`[data-y="3"]`)]
  }
  
  winCells.forEach(el => {
    el.classList.add('win_cell')
  })
  showPopup(`Победил ${winner}`, 3000)
  ws.send(JSON.stringify({type: 'end', data: winner}))
  setTimeout(clearGame, 3000)
}

function clearGame() {
  gameWrap.innerHTML = ''
  board = []
  player = ''
  oponent = ''
  game = true
  turn = false
  start()
  ws.close()
  startBtn.addEventListener('click', findVersus, {once: true})
  modal.classList.remove('hide')
}

function showPopup(message, time = 2000) {
  popup.children[0].textContent = message;
  popup.classList.remove('hide')
  setTimeout(() => {
    popup.classList.add('hide')
  }, 2000)
}
//Запуск функций
start()