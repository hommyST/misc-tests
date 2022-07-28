const mysql = require('mysql')

const connOption = {
  host: 'localhost',
  database: 'tests',
  user: 'root',
  password: '1234'
}

let name = 'someName'

let query = 'SELECT * FROM user'
query = `INSERT INTO user (name, phone, comment) VALUES (?, '123132', 'foobarbaz')`
// query = `INSERT INTO user (name, phone, comment) VALUES (?,?,?)`
const conn = mysql.createConnection(connOption)

conn.connect(err => {
  if (err) console.warn(err)
  else console.log('connected to db')
})

let queryInsert = conn.query(query, name, (err, res, field) => {
  if (err) {
    console.warn(err.sqlMessage)
    console.warn(err.errno)
    return false
  }

  // res.forEach(el => {
  //   console.log(el.name);
  //   console.log(el.phone);
  // });

  console.log(res);
  // console.log(field);
})
console.log(queryInsert.sql);
conn.end()

// console.log(conn);