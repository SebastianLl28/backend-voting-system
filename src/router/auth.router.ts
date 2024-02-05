import { Router } from 'express'
import { getVerifyToken, postLogin } from '../controller/auth.controller'
import schemaValidator from '../middleware/schemaValidator.middleware '
import { loginSchema } from '../schema/auth.schema'
import { jwtValidator } from '../middleware/jwtValidator.middleware'

const router = Router()

router.post('/login', schemaValidator(loginSchema), postLogin)
router.get('/verify', jwtValidator, getVerifyToken)

export default router
