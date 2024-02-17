import { Router } from 'express'
import { getUser, postUser } from '../controller/user.controller'
import schemaValidator from '../middleware/schemaValidator.middleware '
import { createUserSchema } from '../schema/user.schema'
import { jwtValidator } from '../middleware/jwtValidator.middleware'

const router = Router()

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Create User Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario creado"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   path:
 *                     type: string
 *                   message:
 *                     type: string
 *       500:
 *         description: Internal Server Error
 */
router.post('/', schemaValidator(createUserSchema), postUser)

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get user by token
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get User By Token Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Juan"
 *                 lastName:
 *                   type: string
 *                   example: "Perez"
 *                 email:
 *                   type: string
 *                   example: "juan@gmail.com"
 *       404:
 *         description: Not Found
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
router.get('/', jwtValidator, getUser)

export default router
