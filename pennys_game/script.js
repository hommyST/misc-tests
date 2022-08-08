const testBtn = document.querySelector('#testBtn')
const coin = document.querySelector('.coin_container')

testBtn.addEventListener('click', flipCoin)

function flipCoin() {
  coin.classList.remove('animating-1', 'animating-2')
  let rnd = Math.random() > 0.5
  
  setTimeout(() => {
    rnd ? coin.classList.add('animating-1') //head
        : coin.classList.add('animating-2') //tail
  }, 30);

  return rnd ? 'head' : 'tail'
}