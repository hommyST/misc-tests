// let axios = require('./node_modules/axios/index.js')
// import axios from 'axios'
// import FS from 'fs'
// import moment from 'moment'

const FS = require('fs')

FS.appendFile('./names.log', `${formatDate()}\tname: ${'some2'};\n`, er=>console.log(er || 'done'))

function formatDate(date = new Date) {
  let out = ''
  out += date.getFullYear() + '-'
  out += date.getMonth() + '-'
  out += date.getDate() + '-'
  out += `${leadingZero(date.getHours())}:${leadingZero(date.getMinutes())}:${leadingZero(date.getSeconds())}`

  return out

  function leadingZero(val) {
    if (val < 10) return `0${val}`
    return val
  }
}

// let usersArr 
// axios.get('https://jsonplaceholder.typicode.com/users')
//   .then(response => {
//     usersArr = JSON.parse(JSON.stringify(response.data))
//     FS.writeFile('users.json', JSON.stringify(usersArr), err => console.log(err))
//   })


// async function getUsers () {
//   let raw = await axios.get('https://jsonplaceholder.typicode.com/users')
//   return raw.data
// }

// let users = await getUsers()
// // console.log(users);
// let names = users.map(it => it.name)
// names.forEach(name => {
//   FS.appendFile('./names.log', `${moment().format('DD-MM-YY hh:mm:ss.SSS')}\nname: ${name};\n`, er=>console.log(er || 'done'))
// });
// FS.unlink('users.json', err => console.log(err || 'done'))

// console.log(moment().format('DD-MM-YY hh:mm:ss.SSS'));