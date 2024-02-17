import { Router } from 'express'
import { jwtValidator } from '../middleware/jwtValidator.middleware'
import { getPollsByUser, postPoll } from '../controller/poll.controller'
import schemaValidator from '../middleware/schemaValidator.middleware '
import { createPollSchema } from '../schema/poll.schema'

const router = Router()

/**
 * @swagger
 * /poll:
 *   post:
 *     tags:
 *       - Poll
 *     summary: Create a poll
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - questions
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - title
 *                     - options
 *                   properties:
 *                     title:
 *                       type: string
 *                     options:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           description:
 *                             type: string
 *     responses:
 *       200:
 *         description: Create Poll Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Encuesta creada correctamente"
 */
router.post('/', jwtValidator, schemaValidator(createPollSchema), postPoll)

/**
 * @swagger
 * /poll/user:
 *   get:
 *     tags:
 *       - Poll
 *     summary: Get polls by user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get Polls By User Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Poll'
 *       401:
 *         description: User unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "token invalido"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "usuario no encontrado"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno del servidor"
 */
router.get('/user', jwtValidator, getPollsByUser)

export default router
