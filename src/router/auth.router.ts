import { Router } from 'express'
import { getVerifyToken, postLogin } from '../controller/auth.controller'
import schemaValidator from '../middleware/schemaValidator.middleware '
import { loginSchema } from '../schema/auth.schema'
import { jwtValidator } from '../middleware/jwtValidator.middleware'

const router = Router()

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *            required:
 *              - email
 *              - password
 *            example:
 *              email: "llamucasebas@gmail.com"
 *              password: "123456789"
 *     responses:
 *       200:
 *         description: Login Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Login Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "correo o contraseña incorrecta"
 */
router.post('/login', schemaValidator(loginSchema), postLogin)

/**
 * @swagger
 * /auth/verify:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Verify Token
 *     security:
 *       - headerScurity: []
 *     responses:
 *       200:
 *         description: Verify Token Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "token valido"
 *       401:
 *         description: Verify Token Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "token invalido"
 */
router.get('/verify', jwtValidator, getVerifyToken)

export default router
