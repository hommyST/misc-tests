/**
* Создать по 2 инпута для Х и У для каждой точки+++
* ползунок скорость игры+++++++++
* Кнопку старт+++++++
* 
* Отображение текущего "броска кубика"++++
* 
* отрисовать точки по старту++++
* придумать функцию "бросок кубика"++
* придумать функцию отрисовки точки++
* начать бросать кубик и отрисовывать новую точку точку++
* скорость изменения анимации по ползунку+++
* 
* -придумать что-нибудь с цветами точек
*/
const canvas = document.querySelector('#canv_1')
const ctx = canvas.getContext('2d')

const controlToggle = document.querySelector('#controlToggle')
const startBtn = document.querySelector('#gameStart')
const rndBtn = document.querySelector('#rndCoord')
const speedRng = document.querySelector('#gameSpeed')
const resetBtn = document.querySelector('#gameReset')
const outDisplay = document.querySelector('#display')

let fpsInterval, startTime, now, then, difTime;
let fps = 10;
let stopAnim = false;
let startDots = []; //x1,y1,x2,y2,x3,y3
let currentDot;

startBtn.addEventListener('click', start)
rndBtn.addEventListener('click', randomStartDots)
resetBtn.addEventListener('click', resetGame)
speedRng.addEventListener('change', changeSpeed)


controlToggle.addEventListener('click', () => {
  controlToggle.parentElement.classList.toggle('hide')
})


function startAnimating() {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate();
}

function animate() {
  if (!stopAnim) requestAnimationFrame(animate)
  now = Date.now();
  difTime = now - then;
  if (difTime > fpsInterval) {
    then = now - (difTime % fpsInterval);

    addDot()
    drowStartDots()
  }
}

function start() {
  startDots = [...document.querySelectorAll('.coord-inputs input[type="number"]')]
    .map(el => +el.value)
  if (startDots.every(el => el === 0)) return;
  fps = +speedRng.value;

  drowStartDots()
  changeStartBtn()
  startAnimating()
}

function resetGame() {
  if (!stopAnim) return
  stopAnim = true
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  setTimeout(() => {
    stopAnim = false
    // if (startDots.length > 0) startAnimating()
  }, 50);
}

function drowStartDots() {
  let size = 6;
  let textShift = 10
  
  // ctx.fillStyle = 'hsl(78, 76%, 41%)'
  ctx.fillStyle = '#E8EAED'
  ctx.fillRect(startDots[0], startDots[1], size, size)
  ctx.fillText('A', startDots[0] - textShift, startDots[1])
  // ctx.fillStyle = 'hsl(275, 71%, 35%)'
  ctx.fillRect(startDots[2], startDots[3], size, size)
  ctx.fillText('B', startDots[2] - textShift, startDots[3])
  // ctx.fillStyle = 'hsl(275, 71%, 20%)'
  ctx.fillRect(startDots[4], startDots[5], size, size)
  ctx.fillText('C', startDots[4] + textShift, startDots[5])
}

function randomStartDots() {
  const x1 = document.querySelector('#x1')
  const x2 = document.querySelector('#x2')
  const x3 = document.querySelector('#x3')
  const y1 = document.querySelector('#y1')
  const y2 = document.querySelector('#y2')
  const y3 = document.querySelector('#y3')
  const speed = document.querySelector('#gameSpeed')

  x1.value = rndInt(100, 200)
  x2.value = rndInt(10, 70)
  x3.value = rndInt(200, 290)
  y1.value = rndInt(10, 70)
  y2.value = rndInt(350, 490)
  y3.value = rndInt(350, 490)
  speed.value = rndInt(10, 90)
}

function addDot() {
  let bone = rndInt(1, 3)
  if (!currentDot) currentDot = startDots.slice(2, 4);
  let x1 = currentDot[0]
  let y1 = currentDot[1]
  let x2, y2, x, y;
  let size = 4;
  ctx.fillStyle = getcolor();
  ctx.fillRect(x1, y1, size, size)

  switch (bone) {
    case 1:
      x2 = startDots[0]
      y2 = startDots[1]
      x = mathCoord(x1, x2)
      y = mathCoord(y1, y2)
      currentDot[0] = x
      currentDot[1] = y
      outDisplay.textContent = 'A'
      break;
    case 2:
      x2 = startDots[2]
      y2 = startDots[3]
      x = mathCoord(x1, x2)
      y = mathCoord(y1, y2)
      currentDot[0] = x
      currentDot[1] = y
      outDisplay.textContent = 'B'

      break;
    case 3:
      x2 = startDots[4]
      y2 = startDots[5]
      x = mathCoord(x1, x2)
      y = mathCoord(y1, y2)
      currentDot[0] = x
      currentDot[1] = y
      outDisplay.textContent = 'C'

      break;
  
    default:
      break;
  }

  ctx.fillStyle = 'white'
  ctx.fillRect(x, y, size, size)

  function mathCoord(n1, n2) {
    let n;
    if (n2 >= n1) {
      n = n2 - ((n2 - n1) / 2)
    } else {
      n = n1 - ((n1 - n2) / 2)
    }
    return n
  }
}

function changeStartBtn() {
  if (startBtn.classList.contains('pause')) {
    startBtn.textContent = 'старт'
    stopAnim = true;
  } else {
    startBtn.textContent = 'стоп'
    stopAnim = false;
  }
  startBtn.classList.toggle('pause')
}

function changeSpeed() {
  stopAnim = true
  fps = +speedRng.value

  setTimeout(() => {
    stopAnim = false
    if (startDots.length > 0) startAnimating()
  }, 50);
}

function getcolor() {
  let hue, sat
  if(currentDot[0] < canvas.width) hue = rndInt(30, 60)
  if(currentDot[0] < (canvas.width / 2 + canvas.width / 4) ) hue = rndInt(90,180)
  if(currentDot[0] < (canvas.width / 2) ) hue = rndInt(200, 280)
  if(currentDot[0] < (canvas.width / 4) ) hue = rndInt(300, 340)

  if(currentDot[1] < canvas.height) sat = '30%'
  if(currentDot[1] < (canvas.height / 2 + canvas.height / 4) ) sat = '50%'
  if(currentDot[1] < (canvas.height / 2) )sat = '70%'
  if(currentDot[1] < (canvas.height / 4) )sat = '100%'
  return `hsl(${hue}, ${sat}, 55%)`
}



// UTILS
function rndInt(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

