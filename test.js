function first(a) {
  return a > 0
}
function second(a) {
  return a >= 0
}
function third(a) {
  return a < 0
}


function main(num, ...handlers) {
  let res = []
  handlers.map(f => res.push(f(num)))
  return res
}


// console.log(main(-5, first, third, (num) => num * 15));


// --------------------------------------------------------------
function f1(...params) {
  console.log(this);
  params.map(str => {
    console.log(str);
  })
}

const f11 = f1.bind('bar')
// f11('somestr', 'foo')

let str = 'minUs';
let [fletter, ...restletters] = str
// console.log(fletter.toUpperCase() + restletters.join('').toLowerCase());

function upperFirstLetter(word, clear = false) {
  let [fletter, ...restletters] = word
  let res = clear ? 
    fletter.toUpperCase() + restletters.join('') :
    fletter.toUpperCase() + restletters.join('').toLowerCase()
  return res
}

let r = upperFirstLetter('someWord cAn be Done')
console.log(r);
