function threeN(n = 3) {
  let step = 0;
  
  while (n !== 2) {
    if (n % 2 === 0) n = n / 2;
    else n = n * 3 + 1;
  
    console.log(n);
    step++;
  }
  console.log(`END ========== \nSTEPS: ${step}\n`);
}

// threeN(3)

const numberInp = document.querySelector('#number')
const controlToggle = document.querySelector('#controlToggle')
const scalePlus = document.querySelector('#scalePlus')
const scaleMinus = document.querySelector('#scaleMinus')
const startBtn = document.querySelector('#startBtn')
const stopBtn = document.querySelector('#stopBtn')
const showN = document.querySelector('#showN')
const out = document.querySelector('#out')
const out2 = document.querySelector('#out2')
const singleBtn = document.querySelector('#singleBtn')
const canvas = document.querySelector('#canv')
const ctx = canvas.getContext('2d')
const res =[{num: 2, step: 1}];
let fpsInterval, startTime, now, then, difTime;
let fps = 10;

let x = 10, y, N = 1, n = 1, colFactor = 0, heightFactor = 0, single = false, step = 0, xStep = 8, stopAnim = false;

singleBtn.addEventListener('click', () => {
  single = !single;
  singleBtn.classList.toggle('active')
})

startBtn.addEventListener('click', () => {
  stopAnim = false;
  startAnimating();
})
stopBtn.addEventListener('click', () => {
  stopAnim = true;
})
controlToggle.addEventListener('click', () => {
  controlToggle.parentElement.classList.toggle('hide')
})

numberInp.addEventListener('change', () => {
  n = +numberInp.value;
  N = n;
  out.textContent = N;
})

scalePlus.addEventListener('click', () => {
  xStep++
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawNet();
})
scaleMinus.addEventListener('click', () => {
  xStep--
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawNet();
})




function drawNet() {
  for (let i = 0; i < +canvas.height; i += xStep) {
    ctx.beginPath();
    ctx.strokeStyle = 'hsl(199, 0%, 69%)';
    ctx.moveTo(0, i);
    ctx.lineTo(+canvas.width, i);
    ctx.closePath()
    ctx.stroke();
  }
  
  for (let i = 0; i < +canvas.width; i += xStep) {
    ctx.beginPath();
    ctx.strokeStyle = 'hsl(199, 0%, 69%)';
    ctx.moveTo(i, 0);
    ctx.lineTo(i, +canvas.height);
    ctx.closePath()
    ctx.stroke();
  }
  ctx.moveTo(0, canvas.height - heightFactor);
  ctx.closePath()
}


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

    ctx.font = '16px sans-serif';
    if (n !== 2) {
      if (n % 2 === 0) n = n / 2;
      else n = 3 * n + 1;
      out2.textContent = ++step;
    } else {
      res.push({num: N, step: step})
      if (showN.checked) {
        ctx.fillStyle = 'purple'
        ctx.fillText(`${N}(${step})`, x, y);
      }
      n = ++N;
      out.textContent = N;
      x = 0;
      // colFactor += 50;
      heightFactor += 5;
      if (single) heightFactor = 50;
      step = 0;
    }
    
    y = (+canvas.height - heightFactor) - n;
    if (y <= 0) y = 1
    x += xStep;
    
    if (N === n) {
      if (single) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawNet();
      }
      ctx.strokeStyle = `hsl(${n + Math.round(Math.random() * 361)}, 77%, 55%, 0.9)`;
      ctx.closePath()
      ctx.beginPath();
      ctx.moveTo(0, (+canvas.height - heightFactor));
    }
    
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

out.textContent = N;
drawNet();
