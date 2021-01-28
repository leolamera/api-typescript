import 'reflect-metadata'
import express from 'express'

import './database/connectPostgres'
import './database/connectMongo'
import routes from './routes'


const app = express()

app.use(express.json())
app.use(routes)

app.listen(3003, () => console.log('⚡ The server is running in http://localhost:3003'))