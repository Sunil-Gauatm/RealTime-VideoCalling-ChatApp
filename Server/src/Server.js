import express from 'express'
import 'dotenv/config.js'



const app = express()
const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Project is running at localhost:${port}`)
})
