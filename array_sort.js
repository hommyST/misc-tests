console.time();
let a = {a: 12, x: ['a', 'b', 'c'], b: [{foo: 1, x: 2}, {bar: 5, y: 22}]};

let res = copyObj(a);
// res.x[2] = 'something else';

// for (const key in a) {
//     const el = a[key];
//     if (typeof el === 'object') {
//       res[key] = []
//       for (const keyIn in el) {
//           const elInner = el[keyIn];
//           if (typeof elInner === 'object') {
//             console.log('2 lvl');
//           } else {
//             res[key][keyIn] = elInner;
//           }
//       }
//     } else {
//       res[key] = el;
//     };
// }

function copyObj(obj) {
  if (typeof obj !== 'object') return obj;
  let resArr = [];
  let resObj = {};

  for (const key in obj) {
    const el = obj[key];
    
    if (Array.isArray(obj)) {
      resArr[key] = el;
    } else {
      resObj[key] = el;
    }
  }
  if (resArr.length > 0) return resArr;
  return resObj;
}

res.a = 'newVALUE';

console.timeEnd();