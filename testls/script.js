let foo = {};
let a = 53;
console.log('start');
for (let i = 0; i < 181; i++) {
  if (i % 5 === 0) {
    foo[i] = i + 18;
  }
  for (let i = 0; i < 15; i++) {
    if (i % 2) foo[i+2] = i-4;
  }
  if (i % 6 === 0) a = i;
}
debugger
console.log('end');