import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './router'

const app = express()

app.use(
  cors({
    credentials: true,
  })
)

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080/')
})

const MONGO_URL =
  'mongodb+srv://kshitij27kumar:3FvaLzMWGjof76s2@cluster0.oc93rsb.mongodb.net/?retryWrites=true&w=majority'

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB Atlas')
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err)
  })

app.use('/', router())
