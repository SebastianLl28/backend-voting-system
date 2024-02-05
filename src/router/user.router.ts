import { Router } from 'express'
import { postUser } from '../controller/user.controller'
import schemaValidator from '../middleware/schemaValidator.middleware '
import { createUserSchema } from '../schema/user.schema'

const router = Router()

router.post('/', schemaValidator(createUserSchema), postUser)

export default router
