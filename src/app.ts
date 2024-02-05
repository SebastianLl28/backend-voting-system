import express from 'express'
import { authRouter, userRouter } from './router'

const app = express()

// json config
app.use(express.json())

// hidden X-Powered-By
app.disable('x-powered-by')

app.use('/user', userRouter)
app.use('/auth', authRouter)

export default app
