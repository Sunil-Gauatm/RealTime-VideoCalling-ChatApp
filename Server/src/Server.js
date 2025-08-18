import express from 'express'
import 'dotenv/config.js'
import { Connection } from './lib/dbConnect.js'
import AuthRouter from '../src/Routes/auth.route.js'
import UserRouter from '../src/Routes/user.route.js'
import cookieParser from 'cookie-parser'



const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', AuthRouter)
app.use('/api/user', UserRouter)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Project is running at localhost:${port}`)
  Connection()
})
