import express from 'express'
import { userRouter } from './router'

const app = express()

// json config
app.use(express.json())

// hidden X-Powered-By
app.disable('x-powered-by')

app.use('/user', userRouter)

export default app
