import { Router } from 'express'
import { getUser, postUser } from '../controller/user.controller'
import schemaValidator from '../middleware/schemaValidator.middleware '
import { createUserSchema } from '../schema/user.schema'
import { jwtValidator } from '../middleware/jwtValidator.middleware'

const router = Router()

router.post('/', schemaValidator(createUserSchema), postUser)
router.get('/', jwtValidator, getUser)

export default router
