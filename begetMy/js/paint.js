// Обявляем нужные переменные
const cns = document.getElementById('canvas'),
  ctx = cns.getContext('2d'),
  userCoordinate = [
    {x: 0,
     y: 0,
    }
  ];

//Canvas Size
if (window.innerWidth > 1000) ctx.canvas.height = 600;
if (window.innerWidth < 1000) ctx.canvas.height = 500;

let cc = document.querySelector('.canas__container');
ctx.canvas.width = parseInt(getComputedStyle(cc).width)

let lbmDown = false;
let click = false;

//Ресайз окна канваса от размера экрана
//cns.width = document.body.clientWidth;
/* addEventListener('resize', function () {
  cns.width = document.body.clientWidth;
});
 */

//Добавляем функции на события мыши и клавиатуры
cns.addEventListener('click', function (e) { click = true; draw(e) });
cns.addEventListener('mousemove', draw);
cns.addEventListener('mousedown', () => lbmDown = true );
cns.addEventListener('mouseup', () => lbmDown = false );
addEventListener('keypress', function(ev) {
  if (ev.key == 'd') reDraw();
})

//События для тач экрана
cns.addEventListener('touchstart', ev => lbmDown = true);
cns.addEventListener('touchend', ev => lbmDown = false);
cns.addEventListener('touchmove', fingerDraw);

//Функция рисования мышкой
function draw(e) {
  if (lbmDown) {    
    if (e.offsetX == 10 || e.offsetY == 10 || e.offsetX == (cns.width - 10) || e.offsetY == (cns.height - 10) ) lbmDown = false;
    userCoordinate.push({x: e.offsetX, y: e.offsetY});

    ctx.fillStyle = "red";
    ctx.fillRect(e.offsetX - 5, e.offsetY - 5, 10, 10);
  } else if (click) {
    userCoordinate.push({x: e.offsetX, y: e.offsetY});
    ctx.fillStyle = "red";
    ctx.fillRect(e.offsetX - 5, e.offsetY - 5, 10, 10);
    click = false;
  }
}

//Функция рисования пальцем
function fingerDraw (e) {
  if (lbmDown) {
    e.preventDefault();
    rect = cns.getBoundingClientRect();
    userCoordinate.push({x: e.touches[0].clientX - rect.x, y: e.touches[0].clientY - rect.y});

    ctx.fillStyle = "green";
    ctx.fillRect(e.touches[0].clientX - rect.x, e.touches[0].clientY - rect.y, 10, 10);

  }
}

//Функция повтора рисунка
function reDraw () {
  ctx.clearRect(0, 0, window.innerWidth, 600);
  let draw = setInterval(() => {
    if (userCoordinate.length > 1) {
      ctx.fillStyle = "blue";
      ctx.fillRect(userCoordinate[userCoordinate.length - 1].x + 5, userCoordinate[userCoordinate.length - 1].y + 5, 10, 10);
      userCoordinate.pop();
    } else {clearInterval(draw)}
  }, 5);
  
}

document.getElementById('draw').addEventListener('click', reDraw);

