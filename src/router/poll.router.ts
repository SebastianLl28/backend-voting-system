import { Router } from 'express'
import { jwtValidator } from '../middleware/jwtValidator.middleware'
import { getPollsByUser, postPoll } from '../controller/poll.controller'
import schemaValidator from '../middleware/schemaValidator.middleware '
import { createPollSchema } from '../schema/poll.schema'

const router = Router()

router.post('/', jwtValidator, schemaValidator(createPollSchema), postPoll)
router.get('/user', jwtValidator, getPollsByUser)

export default router
