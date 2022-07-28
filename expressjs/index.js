import express from "express";
import path from "path";
import { requestTime, logger } from "./middlewares.js";

const __dirname = path.resolve()
const port = process.env.PORT || process.argv[2] || 3000
const app = express()

app.use(express.static(path.resolve(__dirname, 'static')))
app.use(requestTime)
app.use(logger)


// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'static', 'hello.html'))
// })


app.get('/download', (req, res) => {
  // console.log(req.requestTime);
  res.download(path.resolve(__dirname, 'static', 'hello2.html'))
})


app.listen(port, () => {
  console.log(`server start on ${port}...`);
})