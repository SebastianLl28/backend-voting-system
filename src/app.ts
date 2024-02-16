import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { authRouter, userRouter, pollRouter } from './router'

const app = express()

app.use(morgan('dev'))

app.use(cors())
// json config
app.use(express.json())

// hidden X-Powered-By
app.disable('x-powered-by')

app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/poll', pollRouter)

export default app
