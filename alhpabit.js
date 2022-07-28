
/**
 * 
 * @param {Number} length - длина строки
 * @param {String | Array.<String>} simbols - Набор символов [en, ru, simbol]
 * @example
 * randString(12, 'en') //ynRjPWmwJoBR
 * randString(10, ['en', 'ru']) //ЩЕaУБшJаQЛ
 * randString() //'qLuj&ru
 * @returns {String} Строка с указанной длиной сгенерированная из указаных наборов символов
 */
function randString(length = 8, simbols = ['en', 'simbol']) {
  let str = '';

  const option = {
    simbol:  Array.from(Array(31), (el,ind) => String.fromCharCode(ind + 33)),
    ru: Array.from(Array(64), (el,ind) => String.fromCharCode(ind + 1040)),
    en: Array.from(Array(52), (el,ind) => {
      let char = ind + 65;
      if (char > 90) char += 6
      return String.fromCharCode(char)
    }),
  }

  let resArr = [];

  if (Array.isArray(simbols)) {
    simbols.forEach(el => {
      resArr.push(...option[el])
    })
  } else if (typeof simbols === 'string') {
    resArr.push(...option[simbols])
  } else {
    console.error('Неправильные параметры');
    return '';
  }

  for (let i = 0; i < length; i++) {
    str += resArr[rand(0, resArr.length - 1)]
  }
  return str

  function rand(min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
  }
}

console.log(randString());
console.log(randString(10, 'en'));
console.log(randString(12, ['ru', 'simbol']));
console.log(randString(20));


// let foo = Array.from(Array(15), () => {
//   return randString(15)
// })

// let bar = Array.from(Array(10))
// bar.push(12)
// console.log(bar[15]);
