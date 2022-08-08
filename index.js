const express = require('express')
const app = express()
const port = 3000

console.log(app);

app.get('/', (req, res) => {
  res.send('Hello World! ae f8')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})