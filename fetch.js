import axios from 'axios'

console.log(1);

async function back() {
  axios.get('http://localhost:3000/back.php?some=123&next=yep&yes=true')
  .then(res => {
    console.log(res.data);
  }).catch(err => console.log('error', err))
}


let f1 = async () => {
  await back()
  console.log(2);
}


f1()