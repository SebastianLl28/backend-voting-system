import { Router } from 'express'
import { postLogin } from '../controller/auth.controller'
import schemaValidator from '../middleware/schemaValidator.middleware '
import { loginSchema } from '../schema/auth.schema'

const router = Router()

router.post('/login', schemaValidator(loginSchema), postLogin)

export default router
