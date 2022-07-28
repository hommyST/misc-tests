// console.time('load')
let d1 = Date.now()

// let btn = document.querySelector('button')
let timer;
function stop() {
  clearTimeout(timer);
}


let divs = document.querySelectorAll('.test')
// console.log('LENGTH: ' + divs.length);
for (let i = 0; i < divs.length; i++) {
  divs[i].innerHTML = i;
}
// for (let i = 0; i < document.querySelectorAll('.test').length; i++) {
//     document.querySelectorAll('.test')[i].innerHTML = i;
// }

let d2 = Date.now()
console.log('Время загрузки: ' + (d2 - d1) + 'ms');
let k = d2 - d1;

let logg = JSON.parse(localStorage.getItem('loading_time')) || []
logg.push(k)

timer = setTimeout(() => {
  localStorage.setItem('loading_time', JSON.stringify(logg));
  location.reload(true);
}, 3000)


// console.timeEnd('load')