const prob = {
  n: BigInt(200),
  k: BigInt(100),
  numberOfThrows: 200,
  p_half: 0,
  f: [BigInt("1"), BigInt("1")],
  i: 2,

  fact(n) {
    if (typeof this.f[n] != 'undefined') return this.f[n];

    let result = this.f[this.i-1];

    for (; this.i <= n; this.i++) this.f[this.i] = result = result * BigInt(this.i);
    return result;
  },

  getProbability(n, k) {
    // console.log(n, k);
    // console.log(this.fact(n));
    // console.log(  );
    return this.fact(n) /(this.fact(k) * this.fact(n - k) * BigInt((Math.pow(2,Number(n)))) )
  },

  startProb() {
    // console.log('fact', this.fact(4));
    console.log(`Вероятность выпадения ${this.k} орлов из ${this.n} бросков: ${this.getProbability(this.n,this.k)}`);
  },
}

// console.log(prob.fact(100))
prob.startProb()
// prob.getProbability(200,100)


// let f = [BigInt("1"), BigInt("1")];
// let i = 2;
// function factorial(n)
// {
//   if (typeof f[n] != 'undefined')
//     return f[n];
//   let result = f[i-1];
//   for (; i <= n; i++)
//       f[i] = result = result * BigInt(i);
//   return result;
// }
// Due to memoization, following line will cache first 100 elements.
// let res = factorial(200);

// console.log(res);
// console.log(f);

// let d = factorial(200)
// console.log(f);