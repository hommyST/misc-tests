const testee = [
  {a: 1},
  {a: 2},
  {a: 3},
  {a: 4},
  {a: 5},
]

function test() {
  let tmp = testee[0];
  testee[0] = testee[1];
  testee[1] = tmp;
}

function test2() {
  [testee[0], testee[1]] = [testee[1], testee[0]]
}


for (let i = 0; i < 50; i++) {
  console.time('one')
  for (let i = 0; i < 1000000; i++) {
    test2()
  }
  // console.log(testee);
  console.timeEnd('one')
}